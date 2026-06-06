import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AVATARS } from "@/utils/mockData";

const todayISO = () => new Date().toISOString().slice(0, 10);

const SEED = {
  profile: {
    name: "Lincoln Academy",
    logo: "https://images.unsplash.com/photo-1604933834413-4bbeb40c6f9c?auto=format&fit=crop&w=300&q=70",
    cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=70",
    description: "A future-focused K-12 institution preparing curious minds for tomorrow's challenges.",
    location: "San Francisco, CA",
    email: "office@lincoln.edu",
    phone: "+1 415 555 0188",
    website: "lincoln.edu",
    isVerified: true,
    welcomeMessage:
      "Welcome to Lincoln Academy! Your classroom number, uniform, and book list are below. We can't wait to see what you'll achieve.",
  },
  books: [
    { id: "b1", title: "Algebra Foundations", subject: "Math", price: 24, img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=60" },
    { id: "b2", title: "Modern Biology", subject: "Biology", price: 28, img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=60" },
    { id: "b3", title: "English Voices", subject: "Literature", price: 19, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=60" },
  ],
  uniforms: [
    { id: "u1", label: "Weekday Uniform", img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=60", buyAt: "Lincoln Campus Store" },
    { id: "u2", label: "Sports Kit", img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=60", buyAt: "Lincoln Campus Store" },
  ],
  feeStructure: [
    { id: "fs1", grade: "Grade 9", tuition: 800, exam: 100, other: 50 },
    { id: "fs2", grade: "Grade 10", tuition: 900, exam: 120, other: 60 },
    { id: "fs3", grade: "Grade 11", tuition: 1000, exam: 130, other: 70 },
    { id: "fs4", grade: "Grade 12", tuition: 1100, exam: 150, other: 80 },
  ],
  fineSettings: { perDay: 5, gracePeriodDays: 5 },
  students: [
    { id: "s1", name: "Maya Rodriguez", email: "maya@lincoln.edu", grade: "Grade 11", parent: "Elena Rodriguez", parentContact: "+1 415 555 0144", joined: "Apr 12, 2026", feeStatus: "Pending", dueDate: "2026-06-10", receipt: null, avatar: AVATARS.maya, courses: ["c1","c3"] },
    { id: "s2", name: "Liam Chen", email: "liam@lincoln.edu", grade: "Grade 12", parent: "Wei Chen", parentContact: "+1 415 555 0188", joined: "Mar 22, 2026", feeStatus: "Paid", dueDate: "2026-06-10", receipt: null, avatar: AVATARS.diego, courses: ["c1","c2"] },
    { id: "s3", name: "Sofia Nguyen", email: "sofia@lincoln.edu", grade: "Grade 10", parent: "Tran Nguyen", parentContact: "+1 415 555 0150", joined: "Mar 30, 2026", feeStatus: "Under Review", dueDate: "2026-06-10", receipt: null, avatar: AVATARS.aisha, courses: ["c2"] },
    { id: "s4", name: "Noah Williams", email: "noah@lincoln.edu", grade: "Grade 11", parent: "Anna Williams", parentContact: "+1 415 555 0166", joined: "May 02, 2026", feeStatus: "Overdue", dueDate: "2026-05-25", receipt: null, avatar: AVATARS.maya, courses: ["c3"] },
  ],
  teachers: [
    { id: "t1", name: "David Okafor", email: "david@lincoln.edu", subject: "Physics", qualification: "M.Sc. Physics, Stanford", joined: "Feb 02, 2026", avatar: AVATARS.diego, courses: ["c1"] },
    { id: "t2", name: "Maria Lopez", email: "maria@lincoln.edu", subject: "Mathematics", qualification: "M.Ed Mathematics", joined: "Jan 18, 2026", avatar: AVATARS.aisha, courses: ["c2"] },
    { id: "t3", name: "Susan Lee", email: "susan@lincoln.edu", subject: "Chemistry", qualification: "PhD Chemistry, MIT", joined: "Mar 03, 2026", avatar: AVATARS.maya, courses: ["c3"] },
  ],
  courses: [
    { id: "c1", name: "Modern Physics", teacherId: "t1", grade: "Grade 11", description: "Mechanics, optics, electricity & magnetism, and modern physics.", materials: [{ id: "m1", title: "Newton's Laws — Slides", url: "#" }, { id: "m2", title: "Optics — Worksheet", url: "#" }] },
    { id: "c2", name: "Calculus II", teacherId: "t2", grade: "Grade 12", description: "Integral calculus, series, and applications.", materials: [{ id: "m3", title: "Integration Techniques", url: "#" }] },
    { id: "c3", name: "Organic Chemistry", teacherId: "t3", grade: "Grade 11", description: "Hydrocarbons, reactions, and lab work.", materials: [] },
  ],
  assignments: [
    { id: "a1", title: "Newton's Laws Worksheet", courseId: "c1", description: "Solve all 12 problems on Newton's three laws with free-body diagrams.", dueDate: "2026-06-15", totalMarks: 50, attachments: [], submissions: [{ studentId: "s1", file: "newton-maya.pdf", submittedAt: "2026-06-10", marks: null, feedback: "" }] },
    { id: "a2", title: "Integration Practice Set", courseId: "c2", description: "Complete chapters 3 & 4 exercises.", dueDate: "2026-06-12", totalMarks: 40, attachments: [], submissions: [] },
    { id: "a3", title: "Hydrocarbons Lab Report", courseId: "c3", description: "Write up the lab on alkane preparation.", dueDate: "2026-06-20", totalMarks: 60, attachments: [], submissions: [] },
  ],
  tests: [
    {
      id: "tt1", title: "Physics MCQ — Mid-Term", courseId: "c1", date: "2026-06-18", time: "10:00", durationMinutes: 30, totalMarks: 20,
      instructions: "Read all questions carefully. No copy-paste allowed.",
      security: { disableCopy: true, tabWarn: true, autoSubmitOnTab: true },
      questions: [
        { id: "q1", text: "Acceleration due to gravity on Earth is approximately?", options: ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "11.2 m/s²"], correct: 1 },
        { id: "q2", text: "Newton's 1st law is also called the law of?", options: ["Force", "Inertia", "Action", "Momentum"], correct: 1 },
        { id: "q3", text: "SI unit of work is?", options: ["Newton", "Pascal", "Joule", "Watt"], correct: 2 },
      ],
      results: [],
    },
  ],
  admissions: [
    { id: "ad1", name: "Priya Sharma", classApplied: "Grade 10", parent: "Anjali Sharma", parentContact: "priya@gmail.com", date: "Jun 02, 2026", status: "Pending", essay: "I love science and want to pursue medicine." },
    { id: "ad2", name: "James Carter", classApplied: "Grade 9", parent: "Robert Carter", parentContact: "+1 415 555 0192", date: "Jun 03, 2026", status: "Pending", essay: "I'm passionate about robotics and coding." },
    { id: "ad3", name: "Aisha Khan", classApplied: "Grade 12", parent: "Sara Khan", parentContact: "aisha@yahoo.com", date: "May 28, 2026", status: "Approved", essay: "Future engineer ready to learn." },
  ],
  events: [
    { id: "ie1", title: "Annual Science Fair", description: "Showcase your best projects. Prizes for top 3.", category: "Academic", date: "2026-06-21", time: "10:00", location: "Auditorium", cover: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=60", audience: "All" },
    { id: "ie2", title: "Inter-school Sports Day", description: "Track & field competition with three nearby schools.", category: "Sports", date: "2026-07-04", time: "08:00", location: "Sports Ground", cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=60", audience: "All" },
  ],
  announcements: [
    { id: "an1", title: "School reopens Monday", message: "Reminder: school reopens after the long weekend. Be punctual!", target: "All Students", sender: "Principal Office", date: "Jun 06, 2026" },
    { id: "an2", title: "Teachers meeting Friday 4 PM", message: "Weekly sync — bring quarterly progress reports.", target: "All Teachers", sender: "Principal Office", date: "Jun 05, 2026" },
  ],
};

export const useInstitutionStore = create(
  persist(
    (set, get) => ({
      ...SEED,

      // --- Profile ---
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),

      // --- Books / Uniforms ---
      addBook: (b) => set((s) => ({ books: [...s.books, { ...b, id: "b_" + Date.now() }] })),
      removeBook: (id) => set((s) => ({ books: s.books.filter((b) => b.id !== id) })),
      addUniform: (u) => set((s) => ({ uniforms: [...s.uniforms, { ...u, id: "u_" + Date.now() }] })),
      removeUniform: (id) => set((s) => ({ uniforms: s.uniforms.filter((u) => u.id !== id) })),

      // --- Fee structure & fines ---
      addFeeRow: (row) => set((s) => ({ feeStructure: [...s.feeStructure, { ...row, id: "fs_" + Date.now() }] })),
      updateFeeRow: (id, patch) => set((s) => ({ feeStructure: s.feeStructure.map((f) => (f.id === id ? { ...f, ...patch } : f)) })),
      deleteFeeRow: (id) => set((s) => ({ feeStructure: s.feeStructure.filter((f) => f.id !== id) })),
      updateFineSettings: (patch) => set((s) => ({ fineSettings: { ...s.fineSettings, ...patch } })),

      // --- Students ---
      addStudent: (st) => set((s) => ({ students: [...s.students, { ...st, id: "s_" + Date.now(), joined: todayISO(), feeStatus: "Pending", dueDate: todayISO(), receipt: null, avatar: AVATARS.aisha, courses: [] }] })),
      updateStudent: (id, patch) => set((s) => ({ students: s.students.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      removeStudent: (id) => set((s) => ({ students: s.students.filter((x) => x.id !== id) })),
      markFeePaid: (id) => set((s) => ({ students: s.students.map((x) => (x.id === id ? { ...x, feeStatus: "Paid" } : x)) })),
      uploadReceipt: (id, name) => set((s) => ({ students: s.students.map((x) => (x.id === id ? { ...x, feeStatus: "Under Review", receipt: name } : x)) })),

      // --- Teachers ---
      addTeacher: (t) => set((s) => ({ teachers: [...s.teachers, { ...t, id: "t_" + Date.now(), joined: todayISO(), avatar: AVATARS.diego, courses: [] }] })),
      updateTeacher: (id, patch) => set((s) => ({ teachers: s.teachers.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      removeTeacher: (id) => set((s) => ({ teachers: s.teachers.filter((x) => x.id !== id) })),

      // --- Admissions ---
      decideAdmission: (id, status) => set((s) => ({ admissions: s.admissions.map((a) => (a.id === id ? { ...a, status } : a)) })),

      // --- Events ---
      addEvent: (e) => set((s) => ({ events: [...s.events, { ...e, id: "ie_" + Date.now() }] })),
      updateEvent: (id, patch) => set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)) })),
      deleteEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      // --- Announcements ---
      addAnnouncement: (a) => set((s) => ({ announcements: [{ ...a, id: "an_" + Date.now(), sender: "Principal Office", date: new Date().toLocaleDateString() }, ...s.announcements] })),
      deleteAnnouncement: (id) => set((s) => ({ announcements: s.announcements.filter((a) => a.id !== id) })),

      // --- Courses / Materials ---
      addMaterial: (courseId, m) =>
        set((s) => ({
          courses: s.courses.map((c) => (c.id === courseId ? { ...c, materials: [...c.materials, { ...m, id: "m_" + Date.now() }] } : c)),
        })),
      deleteMaterial: (courseId, materialId) =>
        set((s) => ({ courses: s.courses.map((c) => (c.id === courseId ? { ...c, materials: c.materials.filter((m) => m.id !== materialId) } : c)) })),

      // --- Assignments ---
      addAssignment: (a) => set((s) => ({ assignments: [...s.assignments, { ...a, id: "a_" + Date.now(), submissions: [] }] })),
      submitAssignment: (assignmentId, studentId, file, text) =>
        set((s) => ({
          assignments: s.assignments.map((a) =>
            a.id !== assignmentId
              ? a
              : { ...a, submissions: [...a.submissions.filter((sub) => sub.studentId !== studentId), { studentId, file, text, submittedAt: todayISO(), marks: null, feedback: "" }] }
          ),
        })),
      gradeSubmission: (assignmentId, studentId, marks, feedback) =>
        set((s) => ({
          assignments: s.assignments.map((a) =>
            a.id !== assignmentId
              ? a
              : { ...a, submissions: a.submissions.map((sub) => (sub.studentId === studentId ? { ...sub, marks, feedback } : sub)) }
          ),
        })),

      // --- Tests ---
      addTest: (t) => set((s) => ({ tests: [...s.tests, { ...t, id: "tt_" + Date.now(), results: [] }] })),
      submitTestResult: (testId, studentId, score, timeTakenSec) =>
        set((s) => ({
          tests: s.tests.map((t) =>
            t.id !== testId ? t : { ...t, results: [...t.results.filter((r) => r.studentId !== studentId), { studentId, score, timeTakenSec, submittedAt: todayISO() }] }
          ),
        })),

      // Helpers
      getCourse: (id) => get().courses.find((c) => c.id === id),
      getStudent: (id) => get().students.find((s) => s.id === id),
      getTeacher: (id) => get().teachers.find((t) => t.id === id),
    }),
    { name: "usfuturee-institution" }
  )
);

export const useInstitution = () => useInstitutionStore((s) => s);
