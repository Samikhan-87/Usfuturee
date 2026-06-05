import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SuperAdminGuard } from "@/components/SuperAdminGuard";
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
import Messages from "@/pages/Messages";
import Courses from "@/pages/Courses";
import Saved from "@/pages/Saved";
import Trending from "@/pages/Trending";
import EventDetail from "@/pages/EventDetail";
import SuperAdminLogin from "@/pages/superadmin/Login";
import SuperAdminDashboard from "@/pages/superadmin/Dashboard";
import SuperAdminUsers from "@/pages/superadmin/Users";
import SuperAdminInstitutions from "@/pages/superadmin/Institutions";
import SuperAdminAds from "@/pages/superadmin/Ads";
import SuperAdminReports from "@/pages/superadmin/Reports";
import SuperAdminRevenue from "@/pages/superadmin/Revenue";

const guarded = (el) => <ProtectedRoute>{el}</ProtectedRoute>;
const sa = (el) => <SuperAdminGuard>{el}</SuperAdminGuard>;

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
            <Route path="/events" element={guarded(<Events />)} />
            <Route path="/ai-chat" element={guarded(<AIChat />)} />
            <Route path="/portal" element={guarded(<Portal />)} />
            <Route path="/settings" element={guarded(<Settings />)} />
            <Route path="/institution" element={guarded(<Institution />)} />
            <Route path="/messages" element={guarded(<Messages />)} />
            <Route path="/courses" element={guarded(<Courses />)} />
            <Route path="/saved" element={guarded(<Saved />)} />
            <Route path="/trending" element={guarded(<Trending />)} />
            <Route path="/events/:id" element={guarded(<EventDetail />)} />

            {/* Super Admin — hidden console */}
            <Route path="/superadmin" element={<SuperAdminLogin />} />
            <Route path="/superadmin/dashboard" element={sa(<SuperAdminDashboard />)} />
            <Route path="/superadmin/users" element={sa(<SuperAdminUsers />)} />
            <Route path="/superadmin/institutions" element={sa(<SuperAdminInstitutions />)} />
            <Route path="/superadmin/ads" element={sa(<SuperAdminAds />)} />
            <Route path="/superadmin/reports" element={sa(<SuperAdminReports />)} />
            <Route path="/superadmin/revenue" element={sa(<SuperAdminRevenue />)} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;
