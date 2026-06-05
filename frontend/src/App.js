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
import ComingSoon from "@/pages/ComingSoon";

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
            <Route path="/events" element={guarded(<ComingSoon />)} />
            <Route path="/ai-chat" element={guarded(<ComingSoon />)} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}

export default App;
