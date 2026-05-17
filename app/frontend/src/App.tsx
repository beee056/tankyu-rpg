import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import PlayPage from "@/pages/PlayPage";
import JournalPage from "@/pages/JournalPage";
import ProfilePage from "@/pages/ProfilePage";
import TeacherPage from "@/pages/TeacherPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
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
      </Routes>
    </BrowserRouter>
  );
}
