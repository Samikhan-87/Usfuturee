import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Groups from "@/pages/Groups";
import Events from "@/pages/Events";
import AIChat from "@/pages/AIChat";
import Portal from "@/pages/Portal";
import Settings from "@/pages/Settings";
import Institution from "@/pages/Institution";
// Detail pages
import EventDetail from "@/pages/EventDetail";
import GroupDetail from "@/pages/GroupDetail";
import PostDetail from "@/pages/PostDetail";
// Student detail pages
import CourseDetail from "@/pages/student/CourseDetail";
import AssignmentDetail from "@/pages/student/AssignmentDetail";
import TestDetail from "@/pages/student/TestDetail";
// Teacher detail pages
import TeacherCourseDetail from "@/pages/teacher/TeacherCourseDetail";
import TeacherAssignmentDetail from "@/pages/teacher/TeacherAssignmentDetail";
import TeacherTestDetail from "@/pages/teacher/TeacherTestDetail";
// Principal detail pages
import StudentDetail from "@/pages/principal/StudentDetail";
import TeacherDetail from "@/pages/principal/TeacherDetail";

const guarded = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

function App() {
  return (
    <ThemeProvider>
      <div className="App font-body">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={guarded(<Home />)} />
            <Route path="/profile" element={guarded(<Profile />)} />
            <Route path="/groups" element={guarded(<Groups />)} />
            <Route path="/groups/:id" element={guarded(<GroupDetail />)} />
            <Route path="/events" element={guarded(<Events />)} />
            <Route path="/events/:id" element={guarded(<EventDetail />)} />
            <Route path="/posts/:id" element={guarded(<PostDetail />)} />
            <Route path="/ai-chat" element={guarded(<AIChat />)} />
            <Route path="/portal" element={guarded(<Portal />)} />
            <Route path="/settings" element={guarded(<Settings />)} />
            <Route path="/institution" element={guarded(<Institution />)} />
            {/* Student portal detail pages */}
            <Route path="/portal/courses/:id" element={guarded(<CourseDetail />)} />
            <Route path="/portal/assignments/:id" element={guarded(<AssignmentDetail />)} />
            <Route path="/portal/tests/:id" element={guarded(<TestDetail />)} />
            {/* Teacher portal detail pages */}
            <Route path="/portal/teacher/courses/:id" element={guarded(<TeacherCourseDetail />)} />
            <Route path="/portal/teacher/assignments/:id" element={guarded(<TeacherAssignmentDetail />)} />
            <Route path="/portal/teacher/tests/:id" element={guarded(<TeacherTestDetail />)} />
            {/* Principal portal detail pages */}
            <Route path="/portal/students/:id" element={guarded(<StudentDetail />)} />
            <Route path="/portal/teachers/:id" element={guarded(<TeacherDetail />)} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;
