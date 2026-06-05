// Static seed data for the frontend-only experience.
export const AVATARS = {
  maya: "https://images.pexels.com/photos/6338370/pexels-photo-6338370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
  diego:
    "https://images.unsplash.com/photo-1596688787955-72a75ec303b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91bmclMjBhZHVsdHMlMjBwb3J0cmFpdHN8ZW58MHx8fHwxNzgwNjg4Nzg0fDA&ixlib=rb-4.1.0&q=85&w=200",
  aisha:
    "https://images.pexels.com/photos/8764912/pexels-photo-8764912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200",
};

export const STORIES = [
  { id: "s1", name: "Maya R.", avatar: AVATARS.maya, image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MHx8fHwxNzgwNjg4NzgzfDA&ixlib=rb-4.1.0&q=85&w=400" },
  { id: "s2", name: "Diego M.", avatar: AVATARS.diego, image: "https://images.pexels.com/photos/7683899/pexels-photo-7683899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400" },
  { id: "s3", name: "Aisha K.", avatar: AVATARS.aisha, image: "https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400" },
  { id: "s4", name: "Campus Hub", avatar: AVATARS.maya, image: "https://images.unsplash.com/photo-1775933802859-27889463db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc4MDY4ODc4M3ww&ixlib=rb-4.1.0&q=85&w=400" },
];

export const INITIAL_POSTS = [
  {
    id: "p1",
    author: { name: "Maya Rodriguez", headline: "CS Major @ Stanford", avatar: AVATARS.maya },
    time: "2h",
    content:
      "Finally cracked dynamic programming today! 🧠 Sharing my notes on memoization vs tabulation — this completely changed how I approach LeetCode mediums. Who else is grinding for placements?",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MHx8fHwxNzgwNjg4NzgzfDA&ixlib=rb-4.1.0&q=85&w=900",
    tag: "Computer Science",
    likes: 342,
    comments: 28,
    shares: 12,
    liked: false,
  },
  {
    id: "p2",
    author: { name: "Diego Martinez", headline: "Pre-Med • Biology", avatar: AVATARS.diego },
    time: "5h",
    content:
      "Study group for Organic Chemistry midterm this Saturday at the library, 10 AM. We'll cover reaction mechanisms and stereochemistry. Bring your toughest problems! 🔬",
    image: null,
    tag: "Study Group",
    likes: 156,
    comments: 41,
    shares: 8,
    liked: true,
  },
  {
    id: "p3",
    author: { name: "Aisha Khan", headline: "Design & HCI Researcher", avatar: AVATARS.aisha },
    time: "8h",
    content:
      "Just published my research poster on accessible learning interfaces! So grateful to everyone in the UX community here who gave feedback. Education tech is the future. 💙",
    image: "https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=900",
    tag: "Research",
    likes: 521,
    comments: 63,
    shares: 34,
    liked: false,
  },
];

export const SUGGESTED_PEOPLE = [
  { id: "sp1", name: "Liam Chen", headline: "Data Science • MIT", avatar: AVATARS.diego, mutual: 12 },
  { id: "sp2", name: "Sofia Nguyen", headline: "Robotics Engineer", avatar: AVATARS.aisha, mutual: 8 },
  { id: "sp3", name: "Noah Williams", headline: "Math Olympiad Coach", avatar: AVATARS.maya, mutual: 5 },
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
    banner: "https://images.unsplash.com/photo-1775933802859-27889463db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc4MDY4ODc4M3ww&ixlib=rb-4.1.0&q=85&w=800",
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
