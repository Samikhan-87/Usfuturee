from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
EDUBOT_SYSTEM_MESSAGE = (
    "You are EduBot, a friendly and knowledgeable educational assistant for Usfuturee, "
    "an educational social platform that connects students, teachers, principals, and parents. "
    "Help users with questions about checking grades, submitting assignments, parent-teacher meetings, "
    "extracurricular activities, contacting teachers, study resources, scholarships, and the school calendar. "
    "Keep answers concise, warm, encouraging, and practical. Use simple language and short paragraphs or bullet "
    "points. If a question is outside education, gently guide the user back to how you can support their learning journey. "
    "Always respond in plain conversational text. Do NOT use markdown formatting such as **bold**, # headings, "
    "or --- dividers. When listing steps, use simple hyphen bullets and keep the whole reply brief."
)


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str


@api_router.post("/chat/edubot", response_model=ChatResponse)
async def chat_edubot(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=req.session_id,
            system_message=EDUBOT_SYSTEM_MESSAGE,
        ).with_model("anthropic", "claude-sonnet-4-6")
        reply = await chat.send_message(UserMessage(text=req.message))
        reply_text = reply if isinstance(reply, str) else str(reply)
    except Exception as e:
        logger.error(f"EduBot error: {e}")
        raise HTTPException(status_code=502, detail="EduBot is unavailable right now. Please try again.")

    now = datetime.now(timezone.utc).isoformat()
    await db.edubot_messages.insert_many([
        {"session_id": req.session_id, "role": "user", "content": req.message, "ts": now},
        {"session_id": req.session_id, "role": "assistant", "content": reply_text, "ts": now},
    ])
    return ChatResponse(reply=reply_text)


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()