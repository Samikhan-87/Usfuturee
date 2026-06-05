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
