// Static seed data for the frontend-only experience.
export const AVATARS = {
  maya: "https://images.pexels.com/photos/6338370/pexels-photo-6338370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
  diego:
    "https://images.unsplash.com/photo-1596688787955-72a75ec303b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91bmclMjBhZHVsdHMlMjBwb3J0cmFpdHN8ZW58MHx8fHwxNzgwNjg4Nzg0fDA&ixlib=rb-4.1.0&q=85&w=200",
  aisha:
    "https://images.pexels.com/photos/8764912/pexels-photo-8764912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
};

const BANNER =
  "https://images.unsplash.com/photo-1775933802859-27889463db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc4MDY4ODc4M3ww&ixlib=rb-4.1.0&q=85&w=1200";

// Demo accounts for one-click login (frontend mock).
export const DEMO_ACCOUNTS = [
  {
    role: "student",
    name: "Maya Rodriguez",
    email: "student@usfuturee.com",
    avatar: AVATARS.maya,
    headline: "CS Student • Class of 2027",
    institution: "Stanford University",
  },
  {
    role: "teacher",
    name: "David Okafor",
    email: "teacher@usfuturee.com",
    avatar: AVATARS.diego,
    headline: "Physics Teacher",
    institution: "Riverside High School",
  },
  {
    role: "principal",
    name: "Sarah Bennett",
    email: "principal@usfuturee.com",
    avatar: AVATARS.aisha,
    headline: "Principal",
    institution: "Lincoln Academy",
  },
  {
    role: "parent",
    name: "James Carter",
    email: "parent@usfuturee.com",
    avatar: AVATARS.diego,
    headline: "Parent & Guardian",
    institution: "Lincoln Academy",
  },
];

export const DEFAULT_BANNER = BANNER;

export const STORIES = [
  { id: "s1", name: "Maya R.", avatar: AVATARS.maya, image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MHx8fHwxNzgwNjg4NzgzfDA&ixlib=rb-4.1.0&q=85&w=400" },
  { id: "s2", name: "Diego M.", avatar: AVATARS.diego, image: "https://images.pexels.com/photos/7683899/pexels-photo-7683899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400" },
  { id: "s3", name: "Aisha K.", avatar: AVATARS.aisha, image: "https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400" },
  { id: "s4", name: "Campus Hub", avatar: AVATARS.maya, image: BANNER },
];

export const INITIAL_POSTS = [
  {
    id: "p1",
    author: { name: "Stanford University", headline: "Official • Computer Science Dept", avatar: AVATARS.maya, verified: true },
    time: "2h",
    content:
      "Finally cracked dynamic programming today! 🧠 Sharing our students' notes on memoization vs tabulation — this completely changed how they approach LeetCode mediums. Who else is grinding for placements?",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MHx8fHwxNzgwNjg4NzgzfDA&ixlib=rb-4.1.0&q=85&w=900",
    tag: "Computer Science",
    likes: 342,
    comments: 28,
    shares: 12,
    liked: false,
    following: false,
  },
  {
    id: "p2",
    author: { name: "Riverside High School", headline: "Verified Institution", avatar: AVATARS.diego, verified: true },
    time: "5h",
    content:
      "Study group for Organic Chemistry midterm this Saturday at the library, 10 AM. We'll cover reaction mechanisms and stereochemistry. Bring your toughest problems! 🔬",
    image: null,
    tag: "Study Group",
    likes: 156,
    comments: 41,
    shares: 8,
    liked: true,
    following: true,
  },
  {
    id: "p3",
    author: { name: "Lincoln Academy", headline: "Verified Institution", avatar: AVATARS.aisha, verified: true },
    time: "8h",
    content:
      "Our HCI research lab just published a poster on accessible learning interfaces! So grateful to everyone in the community who gave feedback. Education tech is the future. 💙",
    image: "https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=900",
    tag: "Research",
    likes: 521,
    comments: 63,
    shares: 34,
    liked: false,
    following: false,
  },
];

export const SUGGESTED_PEOPLE = [
  { id: "sp1", name: "Liam Chen", headline: "Data Science • MIT", avatar: AVATARS.diego, mutual: 12 },
  { id: "sp2", name: "Sofia Nguyen", headline: "Robotics Engineer", avatar: AVATARS.aisha, mutual: 8 },
  { id: "sp3", name: "Noah Williams", headline: "Math Olympiad Coach", avatar: AVATARS.maya, mutual: 5 },
];

export const INSTITUTIONS = [
  { id: "i1", name: "Stanford University", type: "Research University", avatar: AVATARS.maya, followers: "1.2M", verified: true },
  { id: "i2", name: "MIT OpenCourseware", type: "Online Learning", avatar: AVATARS.diego, followers: "890k", verified: true },
  { id: "i3", name: "Khan Academy", type: "Non-profit • K-12", avatar: AVATARS.aisha, followers: "2.4M", verified: true },
];

export const UPCOMING_EVENTS = [
  { id: "e1", title: "AI in Education Summit", date: { day: "12", month: "JUN" }, location: "Virtual • Live", host: "EdTech Alliance" },
  { id: "e2", title: "Campus Hackathon 2026", date: { day: "18", month: "JUN" }, location: "Stanford, CA", host: "Stanford University" },
  { id: "e3", title: "MCAT Prep Webinar", date: { day: "24", month: "JUN" }, location: "Virtual", host: "Pre-Med Warriors" },
];

export const TRENDING = [
  { id: "t1", tag: "#FinalsWeek", posts: "12.4k posts" },
  { id: "t2", tag: "#MachineLearning", posts: "8.9k posts" },
  { id: "t3", tag: "#ScholarshipTips", posts: "6.2k posts" },
  { id: "t4", tag: "#StudyWithMe", posts: "21k posts" },
];

export const GROUPS = [
  {
    id: "g1",
    name: "Algorithms & Data Structures",
    members: "24,512",
    banner: BANNER,
    desc: "Master DSA together with daily challenges, mock interviews, and peer reviews.",
    joined: true,
  },
  {
    id: "g2",
    name: "Pre-Med Warriors",
    members: "18,203",
    banner: "https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800",
    desc: "MCAT prep, lab tips, and medical school application support.",
    joined: false,
  },
  {
    id: "g3",
    name: "Design Systems Club",
    members: "9,874",
    banner: "https://images.pexels.com/photos/7683899/pexels-photo-7683899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800",
    desc: "Where future product designers share critique, resources, and inspiration.",
    joined: false,
  },
  {
    id: "g4",
    name: "Math Olympiad Hub",
    members: "31,090",
    banner: "https://images.pexels.com/photos/31656148/pexels-photo-31656148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800",
    desc: "Tackle olympiad-level problems with a global community of problem solvers.",
    joined: true,
  },
];

export const NAV_SHORTCUTS = [
  { name: "Algorithms & DS", avatar: GROUPS[0].banner },
  { name: "Pre-Med Warriors", avatar: GROUPS[1].banner },
  { name: "Design Systems Club", avatar: GROUPS[2].banner },
];

export const FOLLOWERS = [
  { id: "f1", name: "Liam Chen", role: "student", avatar: AVATARS.diego, headline: "Data Science • MIT", following: false },
  { id: "f2", name: "Sofia Nguyen", role: "teacher", avatar: AVATARS.aisha, headline: "Robotics Engineer", following: true },
  { id: "f3", name: "Noah Williams", role: "principal", avatar: AVATARS.maya, headline: "Math Olympiad Coach", following: false },
  { id: "f4", name: "Emma Davis", role: "student", avatar: AVATARS.aisha, headline: "Biology Major", following: false },
  { id: "f5", name: "Carlos Mendez", role: "teacher", avatar: AVATARS.diego, headline: "History Teacher", following: true },
  { id: "f6", name: "Priya Sharma", role: "student", avatar: AVATARS.maya, headline: "Design & HCI", following: false },
];

export const ACHIEVEMENTS = [
  { id: "a1", title: "Dean's List", year: "2025", color: "text-amber-500" },
  { id: "a2", title: "Hackathon Winner", year: "2025", color: "text-primary" },
  { id: "a3", title: "Top Contributor", year: "2024", color: "text-emerald-500" },
  { id: "a4", title: "Perfect Attendance", year: "2024", color: "text-violet-500" },
];

const IMG_STUDENT = "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=800&q=70";
const IMG_RESEARCH = "https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800";
const IMG_DESIGN = "https://images.pexels.com/photos/7683899/pexels-photo-7683899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800";
const IMG_SPORT = "https://images.pexels.com/photos/31656148/pexels-photo-31656148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800";

// ---------- GROUPS ----------
export const GROUP_CATEGORIES = ["Science", "Mathematics", "Arts", "Sports", "Technology", "Literature"];

export const YOUR_GROUPS = [
  { id: "yg1", name: "Algorithms & Data Structures", members: "24,512", privacy: "public", category: "Technology", banner: BANNER },
  { id: "yg2", name: "Pre-Med Warriors", members: "18,203", privacy: "private", category: "Science", banner: IMG_RESEARCH },
  { id: "yg3", name: "Design Systems Club", members: "9,874", privacy: "public", category: "Arts", banner: IMG_DESIGN },
  { id: "yg4", name: "Math Olympiad Hub", members: "31,090", privacy: "private", category: "Mathematics", banner: IMG_SPORT },
];

export const DISCOVER_GROUPS = [
  { id: "dg1", name: "Quantum Physics Society", members: "12,043", category: "Science", banner: IMG_RESEARCH },
  { id: "dg2", name: "Creative Writers Guild", members: "8,221", category: "Literature", banner: IMG_DESIGN },
  { id: "dg3", name: "Varsity Athletics", members: "15,670", category: "Sports", banner: IMG_SPORT },
  { id: "dg4", name: "AI & Machine Learning", members: "42,110", category: "Technology", banner: IMG_STUDENT },
  { id: "dg5", name: "Digital Arts Collective", members: "6,540", category: "Arts", banner: BANNER },
];

export const GROUP_FEED = [
  { id: "gp1", author: { name: "Liam Chen", avatar: AVATARS.diego, verified: false }, group: "Algorithms & Data Structures", time: "1h", content: "Just solved the weekly DP challenge — sharing my approach to the knapsack variant. AMA! 🧩", image: null, tag: "Challenge", likes: 84, comments: 19, shares: 4 },
  { id: "gp2", author: { name: "Sofia Nguyen", avatar: AVATARS.aisha, verified: true }, group: "Design Systems Club", time: "3h", content: "New Figma tokens template for the club — accessible color contrast baked in. Link in comments below! 🎨", image: IMG_DESIGN, tag: "Resource", likes: 152, comments: 33, shares: 21 },
  { id: "gp3", author: { name: "David Okafor", avatar: AVATARS.maya, verified: true }, group: "Pre-Med Warriors", time: "6h", content: "Reminder: MCAT mock test this Sunday 9 AM. Bring your A-game and a water bottle 💪", image: null, tag: "Announcement", likes: 210, comments: 48, shares: 12 },
];

// ---------- EVENTS ----------
export const EVENT_CATEGORIES = ["Academic", "Sports", "Cultural"];
export const EVENT_REGIONS = ["Online", "West", "East", "North", "South"];
export const EVENT_INSTITUTIONS = ["Stanford University", "Lincoln Academy", "Riverside High School", "MIT"];

export const EVENTS_UPCOMING = [
  { id: "ue1", title: "AI in Education Summit 2026", category: "Academic", date: "Jun 12, 2026", time: "10:00 AM", location: "Virtual • Live", organizer: "EdTech Alliance", institution: "Stanford University", region: "Online", cover: IMG_STUDENT },
  { id: "ue2", title: "Inter-School Football Championship", category: "Sports", date: "Jun 18, 2026", time: "2:00 PM", location: "Lincoln Stadium, CA", organizer: "Athletics Department", institution: "Lincoln Academy", region: "West", cover: IMG_SPORT },
  { id: "ue3", title: "Spring Cultural Festival", category: "Cultural", date: "Jun 22, 2026", time: "5:30 PM", location: "Riverside Auditorium", organizer: "Arts & Culture Society", institution: "Riverside High School", region: "East", cover: IMG_DESIGN },
  { id: "ue4", title: "Annual Science Fair", category: "Academic", date: "Jun 28, 2026", time: "9:00 AM", location: "Main Campus Hall", organizer: "Science Department", institution: "Stanford University", region: "West", cover: IMG_RESEARCH },
];

export const EVENTS_PAST = [
  { id: "pe1", title: "Robotics Workshop", category: "Academic", date: "May 14, 2026", time: "11:00 AM", location: "Tech Lab 2", organizer: "Engineering Department", institution: "MIT", region: "East", cover: BANNER },
  { id: "pe2", title: "Annual Debate Tournament", category: "Cultural", date: "Apr 30, 2026", time: "1:00 PM", location: "Lincoln Auditorium", organizer: "Literary Society", institution: "Lincoln Academy", region: "West", cover: IMG_DESIGN },
];

// ---------- EDUBOT ----------
export const EDUBOT_QUESTIONS = [
  "How do I check my grades?",
  "When is the next parent-teacher meeting?",
  "How do I submit an assignment?",
  "What extracurricular activities are available?",
  "How do I contact my teacher?",
  "What resources are available for studying?",
  "How do I apply for a scholarship?",
  "What is the school calendar for this year?",
];

// ===================== STUDENT PORTAL =====================
export const STUDENT_TODAY_SCHEDULE = [
  { id: "ts1", subject: "Calculus II", room: "Room 204", time: "09:00 AM" },
  { id: "ts2", subject: "Physics Lab", room: "Lab 3", time: "11:00 AM" },
  { id: "ts3", subject: "English Literature", room: "Room 112", time: "02:00 PM" },
];
export const STUDENT_ANNOUNCEMENTS = [
  { id: "an1", teacher: "Mr. Okafor", subject: "Physics", message: "Lab report deadline extended to Friday. Submit via the portal.", time: "1h" },
  { id: "an2", teacher: "Ms. Bennett", subject: "Mathematics", message: "Surprise quiz on integration next Monday. Review chapter 7.", time: "4h" },
  { id: "an3", teacher: "Dr. Lee", subject: "Chemistry", message: "Great work on the midterm — class average was 84%! 🎉", time: "1d" },
];
export const STUDENT_ASSIGNMENTS = [
  { id: "as1", subject: "Mathematics", title: "Integration Problem Set 4", due: "Jun 10, 2026", status: "Pending" },
  { id: "as2", subject: "Physics", title: "Projectile Motion Lab Report", due: "Jun 08, 2026", status: "Submitted" },
  { id: "as3", subject: "English", title: "Essay: Modern Poetry Analysis", due: "Jun 05, 2026", status: "Late" },
  { id: "as4", subject: "Chemistry", title: "Organic Reactions Worksheet", due: "Jun 12, 2026", status: "Pending" },
];
export const STUDENT_TESTS = [
  {
    id: "t1", subject: "Mathematics", date: "Jun 14, 2026", duration: "30 min", marks: 20,
    questions: [
      { q: "What is the derivative of x²?", options: ["2x", "x", "2", "x²"], answer: 0 },
      { q: "∫ 2x dx = ?", options: ["x² + C", "2 + C", "x + C", "2x² + C"], answer: 0 },
      { q: "What is the value of π (approx)?", options: ["3.14", "2.71", "1.61", "4.13"], answer: 0 },
      { q: "Solve: 5! = ?", options: ["120", "25", "60", "100"], answer: 0 },
    ],
  },
  {
    id: "t2", subject: "Physics", date: "Jun 18, 2026", duration: "45 min", marks: 30,
    questions: [
      { q: "Unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], answer: 0 },
      { q: "Speed of light (approx)?", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁵ m/s", "3×10¹⁰ m/s"], answer: 0 },
      { q: "Acceleration due to gravity?", options: ["9.8 m/s²", "8.9 m/s²", "10.8 m/s²", "9.0 m/s²"], answer: 0 },
    ],
  },
];
export const STUDENT_FEES = [
  { id: "fe1", item: "Tuition Fee — Semester 2", amount: 1200, due: "Jun 20, 2026", status: "Pending" },
  { id: "fe2", item: "Laboratory Fee", amount: 150, due: "Jun 20, 2026", status: "Pending" },
  { id: "fe3", item: "Library & Resources", amount: 80, due: "Jun 20, 2026", status: "Pending" },
];

// ===================== TEACHER PORTAL =====================
export const TEACHER_CLASSES_TODAY = [
  { id: "tc1", subject: "Physics — Grade 11", room: "Lab 3", time: "09:00 AM" },
  { id: "tc2", subject: "Physics — Grade 12", room: "Room 204", time: "11:30 AM" },
  { id: "tc3", subject: "Science Club", room: "Auditorium", time: "03:00 PM" },
];
export const TEACHER_ASSIGNMENT_STATUS = [
  { id: "ta1", title: "Projectile Motion Lab", subject: "Physics", submitted: 24, total: 32 },
  { id: "ta2", title: "Newton's Laws Worksheet", subject: "Physics", submitted: 30, total: 32 },
  { id: "ta3", title: "Optics Problem Set", subject: "Physics", submitted: 12, total: 28 },
];
export const TEACHER_MESSAGES = [
  { id: "tm1", from: "Principal Bennett", role: "principal", message: "Staff meeting moved to Thursday 4 PM.", time: "2h" },
  { id: "tm2", from: "Parent — J. Carter", role: "parent", message: "Could we schedule a quick call about Liam's progress?", time: "5h" },
  { id: "tm3", from: "Parent — A. Smith", role: "parent", message: "Thank you for the extra help sessions!", time: "1d" },
];
export const TEACHER_GRADING_STUDENTS = [
  { id: "gs1", name: "Liam Chen", file: "liam_lab_report.pdf" },
  { id: "gs2", name: "Emma Davis", file: "emma_lab_report.pdf" },
  { id: "gs3", name: "Carlos Mendez", file: "carlos_lab_report.pdf" },
  { id: "gs4", name: "Priya Sharma", file: "priya_lab_report.pdf" },
  { id: "gs5", name: "Noah Williams", file: "noah_lab_report.pdf" },
];
export const TEACHER_WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const TEACHER_PERIODS = ["09:00", "10:30", "12:00", "02:00"];
export const TEACHER_SCHEDULE = {
  "Mon-09:00": { subject: "Physics G11", room: "Lab 3" },
  "Mon-12:00": { subject: "Physics G12", room: "R204" },
  "Tue-10:30": { subject: "Science Club", room: "Aud." },
  "Wed-09:00": { subject: "Physics G12", room: "R204" },
  "Wed-02:00": { subject: "Physics G11", room: "Lab 3" },
  "Thu-12:00": { subject: "Physics G11", room: "Lab 3" },
  "Fri-10:30": { subject: "Physics G12", room: "R204" },
};

// ===================== PRINCIPAL PORTAL =====================
export const PRINCIPAL_STUDENTS = [
  { id: "ps1", name: "Liam Chen", grade: "Grade 11", feeStatus: "Paid" },
  { id: "ps2", name: "Emma Davis", grade: "Grade 10", feeStatus: "Pending" },
  { id: "ps3", name: "Carlos Mendez", grade: "Grade 12", feeStatus: "Paid" },
  { id: "ps4", name: "Priya Sharma", grade: "Grade 11", feeStatus: "Overdue" },
  { id: "ps5", name: "Noah Williams", grade: "Grade 9", feeStatus: "Pending" },
];
export const PRINCIPAL_TEACHERS = [
  { id: "pt1", name: "David Okafor", subject: "Physics" },
  { id: "pt2", name: "Maria Lopez", subject: "Mathematics" },
  { id: "pt3", name: "Dr. Susan Lee", subject: "Chemistry" },
  { id: "pt4", name: "James Patel", subject: "English Literature" },
];
export const PRINCIPAL_ADMISSIONS = [
  { id: "ad1", name: "Sophie Turner", classApplied: "Grade 9", date: "Jun 02, 2026", status: "Pending" },
  { id: "ad2", name: "Marcus Johnson", classApplied: "Grade 11", date: "Jun 03, 2026", status: "Pending" },
  { id: "ad3", name: "Aisha Rahman", classApplied: "Grade 10", date: "Jun 04, 2026", status: "Pending" },
];
export const PRINCIPAL_FEE_CLASSES = [
  { id: "fc1", grade: "Grade 9", amount: 1000 },
  { id: "fc2", grade: "Grade 10", amount: 1100 },
  { id: "fc3", grade: "Grade 11", amount: 1200 },
  { id: "fc4", grade: "Grade 12", amount: 1300 },
];

// ===================== INSTITUTION PROFILE =====================
export const INSTITUTION = {
  name: "Lincoln Academy",
  verified: true,
  banner: BANNER,
  avatar: AVATARS.aisha,
  followers: "84.2k",
  tagline: "Excellence in Education since 1962",
  message: "Welcome to Lincoln Academy! We nurture curious minds and future leaders. Our doors are open for the 2026–27 admissions. Join a community that values knowledge, character, and creativity.",
  classes: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
  admissionFee: 250,
  books: [
    { id: "bk1", title: "Advanced Calculus", img: IMG_RESEARCH },
    { id: "bk2", title: "Modern Physics", img: IMG_STUDENT },
    { id: "bk3", title: "World Literature", img: IMG_DESIGN },
    { id: "bk4", title: "Organic Chemistry", img: IMG_SPORT },
  ],
  uniforms: [
    { id: "uf1", label: "Formal Uniform", img: IMG_DESIGN },
    { id: "uf2", label: "Sports Kit", img: IMG_SPORT },
  ],
};
