import { create } from "zustand";
import { api } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────

export interface StudentSummary {
  player_id: string;
  display_name: string | null;
  last_login_at: string;
  current_chapter: number;
  current_scene: number;
  total_scenes: number;
  playtime_seconds: number;
}

export interface ClassSummary {
  total_count: number;
  avg_playtime_seconds: number;
  chapter_clear_rate: number;
}

export interface JournalEntry {
  entry_id: string;
  scene_id: string;
  scene_label: string;
  content: string | null; // null = 非公開（教員には見えない）
  word_count: number | null;
  is_public: boolean;
  created_at: string;
}

export interface StudentJournalData {
  student_id: string;
  journals: JournalEntry[];
  public_count: number;
  private_count: number;
}

// ── Store state ──────────────────────────────────────────────

interface TeacherState {
  // Auth
  isTeacher: boolean;
  teacherToken: string | null;

  // Class data
  students: StudentSummary[];
  classSummary: ClassSummary | null;
  loadingStudents: boolean;
  studentsError: string | null;

  // Selected student journals
  selectedStudentId: string | null;
  journalData: StudentJournalData | null;
  loadingJournals: boolean;
  journalsError: string | null;

  // Actions
  setTeacherAuth: (token: string) => void;
  clearTeacherAuth: () => void;
  fetchStudents: () => Promise<void>;
  fetchStudentJournals: (studentId: string) => Promise<void>;
  selectStudent: (studentId: string | null) => void;
}

// ── Store ─────────────────────────────────────────────────────

export const useTeacherStore = create<TeacherState>()((set, get) => ({
  isTeacher: false,
  teacherToken: null,

  students: [],
  classSummary: null,
  loadingStudents: false,
  studentsError: null,

  selectedStudentId: null,
  journalData: null,
  loadingJournals: false,
  journalsError: null,

  setTeacherAuth: (token) => {
    // Persist token for API calls
    localStorage.setItem("yoake_token", token);
    set({ isTeacher: true, teacherToken: token });
  },

  clearTeacherAuth: () => {
    localStorage.removeItem("yoake_token");
    set({
      isTeacher: false,
      teacherToken: null,
      students: [],
      classSummary: null,
      selectedStudentId: null,
      journalData: null,
    });
  },

  fetchStudents: async () => {
    set({ loadingStudents: true, studentsError: null });
    try {
      const res = await api.get<{
        students: StudentSummary[];
        summary: ClassSummary;
      }>("/api/teacher/students");

      if (res.ok) {
        set({
          students: res.data.students,
          classSummary: res.data.summary,
          loadingStudents: false,
        });
      } else {
        set({
          studentsError: res.error ?? "生徒一覧の取得に失敗しました",
          loadingStudents: false,
        });
      }
    } catch (err) {
      set({
        studentsError: err instanceof Error ? err.message : "Network error",
        loadingStudents: false,
      });
    }
  },

  fetchStudentJournals: async (studentId: string) => {
    set({ loadingJournals: true, journalsError: null, selectedStudentId: studentId });
    try {
      const res = await api.get<StudentJournalData>(
        `/api/teacher/student/${studentId}/journals`
      );

      if (res.ok) {
        set({ journalData: res.data, loadingJournals: false });
      } else {
        set({
          journalsError: res.error ?? "ジャーナルの取得に失敗しました",
          loadingJournals: false,
        });
      }
    } catch (err) {
      set({
        journalsError: err instanceof Error ? err.message : "Network error",
        loadingJournals: false,
      });
    }
  },

  selectStudent: (studentId) => {
    const { selectedStudentId } = get();
    if (studentId === selectedStudentId) {
      // Toggle off
      set({ selectedStudentId: null, journalData: null });
    } else {
      set({ selectedStudentId: studentId, journalData: null });
      if (studentId) {
        get().fetchStudentJournals(studentId);
      }
    }
  },
}));
