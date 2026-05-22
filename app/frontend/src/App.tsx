import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import PlayPage from "@/pages/PlayPage";
import JournalPage from "@/pages/JournalPage";
import ProfilePage from "@/pages/ProfilePage";
import TeacherPage from "@/pages/TeacherPage";
import DeductionPage from "@/pages/DeductionPage";
import EndingPage from "@/pages/EndingPage";

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "";
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/play/chapter/:chapterId/scene/:sceneId" element={<PlayPage />} />
        <Route path="/play/:chapterId/:sceneId" element={<PlayPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/teacher/class/:classId" element={<TeacherPage />} />
        <Route path="/teacher/student/:studentId" element={<TeacherPage />} />
        <Route path="/deduction/ch1" element={<DeductionPage />} />
        <Route path="/ending/ch1/:endingId" element={<EndingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
