import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeacherStore, type StudentSummary } from "@/stores/teacherStore";

// ── Helpers ──────────────────────────────────────────────────

function formatLastLogin(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "今日";
  if (diffDays === 1) return "昨日";
  return `${diffDays}日前`;
}

function formatPlaytime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}時間${m}分`;
  return `${m}分`;
}

// ── Progress Bar ──────────────────────────────────────────────

interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.round(((current - 1) / total) * 100));
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-1.5 bg-yoake-bg-surface overflow-hidden"
        style={{ borderRadius: 0 }}
      >
        <div
          className="h-full bg-yoake-accent transition-all"
          style={{ width: `${pct}%`, borderRadius: 0 }}
        />
      </div>
      <span className="text-xs text-yoake-text-muted font-serif flex-shrink-0">
        コマ {Math.max(1, current - 1)}/{total}
      </span>
    </div>
  );
}

// ── Student Row ───────────────────────────────────────────────

interface StudentRowProps {
  student: StudentSummary;
  isSelected: boolean;
  onSelect: () => void;
}

function StudentRow({ student, isSelected, onSelect }: StudentRowProps) {
  return (
    <div
      className="p-3 cursor-pointer transition-all"
      style={{
        border: isSelected ? "1px solid #C9805E" : "1px solid #C9B99A",
        background: isSelected ? "#EDE3CF" : "#E6D9C2",
        borderRadius: 0,
      }}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-3">
        {/* 左: ID + 名前 */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs text-yoake-text-muted font-serif"
            style={{ border: "1px solid #C9B99A", borderRadius: 0, background: "#EDE3CF" }}
          >
            {student.display_name?.[0] ?? "？"}
          </div>
          <div className="min-w-0">
            <p className="text-yoake-text-primary text-sm font-serif truncate">
              {student.display_name ?? "（名前なし）"}
            </p>
            <p className="text-yoake-text-muted text-xs font-serif">
              最終ログイン: {formatLastLogin(student.last_login_at)}
            </p>
          </div>
        </div>

        {/* 右: 進捗 */}
        <div className="flex-shrink-0 w-40">
          <ProgressBar current={student.current_scene} total={student.total_scenes} />
        </div>

        {/* 展開アイコン */}
        <span
          className="text-yoake-accent text-xs font-serif flex-shrink-0 transition-transform"
          style={{ transform: isSelected ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▼
        </span>
      </div>
    </div>
  );
}

// ── Journal Panel ─────────────────────────────────────────────

interface JournalPanelProps {
  studentId: string;
  studentName: string | null;
}

function JournalPanel({ studentId, studentName }: JournalPanelProps) {
  const { journalData, loadingJournals, journalsError } = useTeacherStore();

  if (loadingJournals) {
    return (
      <div
        className="p-4 text-center text-yoake-text-muted text-xs font-serif"
        style={{ border: "1px dashed #C9B99A", borderTop: "none", background: "#F5EDE0" }}
      >
        読み込み中…
      </div>
    );
  }

  if (journalsError) {
    return (
      <div
        className="p-4 text-center text-xs font-serif"
        style={{
          border: "1px dashed #C9B99A",
          borderTop: "none",
          background: "#F5EDE0",
          color: "#C9805E",
        }}
      >
        {journalsError}
      </div>
    );
  }

  if (!journalData || journalData.student_id !== studentId) return null;

  const { journals, public_count, private_count } = journalData;

  return (
    <div
      className="p-4 space-y-3"
      style={{ border: "1px solid #C9805E", borderTop: "none", background: "#F5EDE0" }}
    >
      {/* 注意書き（GDD §6-2 準拠） */}
      <div
        className="px-3 py-2 text-xs text-yoake-text-muted font-serif leading-relaxed"
        style={{ border: "1px dashed #C9B99A", background: "#EDE3CF" }}
      >
        このジャーナルは生徒が探究の過程で書いた記録です。正解・不正解で評価せず、問いの変化・深まりに着目してください。
      </div>

      {/* 統計バッジ */}
      <div className="flex gap-3 text-xs font-serif">
        <span className="text-yoake-accent">公開: {public_count}件</span>
        <span className="text-yoake-text-muted">非公開（本人のみ）: {private_count}件</span>
      </div>

      {journals.length === 0 ? (
        <p className="text-yoake-text-muted text-xs text-center py-3 font-serif">
          {studentName ?? "この生徒"}はまだジャーナルを書いていません
        </p>
      ) : (
        <div className="space-y-2">
          {journals.map((entry) => (
            <div
              key={entry.entry_id}
              className="p-3"
              style={{
                border: entry.is_public ? "1px solid #C9B99A" : "1px dashed #C9B99A",
                background: entry.is_public ? "#EDE3CF" : "#E6D9C2",
                opacity: entry.is_public ? 1 : 0.6,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-yoake-text-muted text-xs font-serif">
                  {entry.scene_label}
                </span>
                {entry.is_public ? (
                  <span
                    className="text-xs font-serif px-1.5 py-0.5"
                    style={{ border: "1px solid #9BAE8C", color: "#6B7C5A", background: "#F5EDE0" }}
                  >
                    公開
                  </span>
                ) : (
                  <span
                    className="text-xs font-serif px-1.5 py-0.5"
                    style={{ border: "1px solid #C9B99A", color: "#8B9DAE", background: "#E6D9C2" }}
                  >
                    非公開
                  </span>
                )}
              </div>

              {entry.is_public && entry.content ? (
                <p className="text-yoake-text-secondary text-sm leading-relaxed font-serif">
                  {entry.content}
                </p>
              ) : (
                // 非公開ジャーナルはマスク表示 — 内容は絶対に見せない
                <p className="text-yoake-text-muted text-xs italic font-serif">
                  — 生徒が非公開に設定したため、内容は表示されません —
                </p>
              )}

              {entry.is_public && entry.word_count !== null && (
                <p className="text-yoake-text-muted text-xs mt-1 font-serif text-right">
                  {entry.word_count}字
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Activity Summary Card ─────────────────────────────────────

interface SummaryCardProps {
  totalCount: number;
  avgPlaytime: number;
  clearRate: number;
}

function SummaryCard({ totalCount, avgPlaytime, clearRate }: SummaryCardProps) {
  return (
    <div
      className="bg-yoake-bg-card paper-texture p-5"
      style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
    >
      <h2 className="font-ui text-yoake-text-muted text-xs mb-5 tracking-widest">
        クラス全体の活動サマリー
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="font-ui text-yoake-accent text-2xl">{totalCount}</p>
          <p className="text-yoake-text-muted text-xs font-serif mt-1">生徒数</p>
        </div>
        <div className="text-center">
          <p className="font-ui text-yoake-accent text-2xl">{formatPlaytime(avgPlaytime)}</p>
          <p className="text-yoake-text-muted text-xs font-serif mt-1">平均プレイ時間</p>
        </div>
        <div className="text-center">
          <p className="font-ui text-yoake-accent text-2xl">{clearRate}%</p>
          <p className="text-yoake-text-muted text-xs font-serif mt-1">第1章クリア率</p>
        </div>
      </div>

      {/* 注意：個人スコアランキングは表示しない（GDD §6-1 準拠） */}
      <p className="text-yoake-text-muted text-xs text-center mt-4 font-serif opacity-60">
        ※ 個人間の比較・ランキングは表示していません
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────

export default function TeacherPage() {
  const navigate = useNavigate();
  const {
    isTeacher,
    students,
    classSummary,
    loadingStudents,
    studentsError,
    selectedStudentId,
    setTeacherAuth,
    clearTeacherAuth,
    fetchStudents,
    selectStudent,
  } = useTeacherStore();

  const [teacherLoginVisible, setTeacherLoginVisible] = useState(false);

  // バックエンドが未起動でもUIを確認できるようにフォールバック
  useEffect(() => {
    if (isTeacher) {
      fetchStudents();
    }
  }, [isTeacher, fetchStudents]);

  function handleTeacherLogin() {
    // 開発用: teacher-dev-001 トークンで教員としてログイン
    setTeacherAuth("teacher-dev-001");
    setTeacherLoginVisible(false);
  }

  function handleLogout() {
    clearTeacherAuth();
    navigate("/login");
  }

  // ── 未認証ビュー ──────────────────────────────────────────
  if (!isTeacher) {
    return (
      <main className="min-h-screen bg-yoake-bg paper-texture flex items-center justify-center px-4">
        <div
          className="bg-yoake-bg-card paper-texture p-8 w-full max-w-sm animate-fade-in"
          style={{
            border: "2px solid #C9B99A",
            boxShadow: "3px 3px 0 #C9B99A",
            borderRadius: 0,
          }}
        >
          <div className="text-center mb-8">
            <div
              className="inline-flex w-14 h-14 items-center justify-center mb-4"
              style={{ border: "2px solid #C9805E", borderRadius: 0 }}
            >
              <span className="font-ui text-yoake-accent text-lg">師</span>
            </div>
            <h1 className="font-ui text-yoake-ink text-base tracking-widest">
              ヨアケ探偵社
            </h1>
            <p className="text-yoake-text-muted text-xs mt-1 font-serif">
              教員ダッシュボード
            </p>
          </div>

          <div className="border-t border-yoake-border pt-6">
            <p className="text-yoake-text-muted text-xs text-center mb-4 font-serif">
              開発用バイパス
            </p>

            {!teacherLoginVisible ? (
              <button
                type="button"
                onClick={() => setTeacherLoginVisible(true)}
                className="w-full border border-yoake-border text-yoake-text-secondary hover:border-yoake-accent hover:text-yoake-ink py-2 transition-colors text-xs font-serif"
                style={{ borderRadius: 0 }}
              >
                → 教員としてログイン（ダミー）
              </button>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div
                  className="p-3 text-xs font-serif text-yoake-text-secondary leading-relaxed"
                  style={{ border: "1px dashed #C9B99A", background: "#E6D9C2" }}
                >
                  開発用トークン <code className="text-yoake-accent">teacher-dev-001</code>{" "}
                  でログインします。バックエンドが起動していない場合はモックデータが表示されます。
                </div>
                <button
                  type="button"
                  onClick={handleTeacherLogin}
                  className="w-full bg-yoake-accent hover:bg-yoake-accent-hover text-yoake-bg font-ui py-2 transition-colors text-xs tracking-widest"
                  style={{ borderRadius: 0 }}
                >
                  教員ダッシュボードへ入る
                </button>
                <button
                  type="button"
                  onClick={() => setTeacherLoginVisible(false)}
                  className="w-full text-yoake-text-muted hover:text-yoake-text-secondary py-1 transition-colors text-xs font-serif"
                >
                  キャンセル
                </button>
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-yoake-text-muted text-xs hover:text-yoake-text-secondary transition-colors font-serif underline"
              >
                生徒ログイン画面へ
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── 認証済みビュー ────────────────────────────────────────
  return (
    <main className="min-h-screen bg-yoake-bg paper-texture">

      {/* ヘッダー */}
      <header
        className="border-b border-yoake-border px-6 py-4 flex items-center justify-between bg-yoake-bg-card"
        style={{ boxShadow: "0 1px 0 #C9B99A" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-ui text-yoake-warm text-sm tracking-widest">
            ヨアケ探偵社
          </span>
          <span className="text-yoake-text-muted text-xs font-serif">
            / 教員ダッシュボード
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-yoake-text-muted hover:text-yoake-text-secondary text-sm transition-colors font-serif"
        >
          ログアウト
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6 animate-fade-in">

        {/* クラス全体サマリー */}
        {classSummary ? (
          <SummaryCard
            totalCount={classSummary.total_count}
            avgPlaytime={classSummary.avg_playtime_seconds}
            clearRate={classSummary.chapter_clear_rate}
          />
        ) : loadingStudents ? (
          <div
            className="bg-yoake-bg-card p-6 text-center"
            style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
          >
            <p className="text-yoake-text-muted text-xs font-serif">読み込み中…</p>
          </div>
        ) : studentsError ? (
          <FallbackSummary />
        ) : null}

        {/* 生徒一覧 */}
        <div
          className="bg-yoake-bg-card paper-texture p-6"
          style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-ui text-yoake-text-muted text-xs tracking-widest">
              担当クラスの生徒一覧
            </h2>
            <p className="text-yoake-text-muted text-xs font-serif">
              クリックでジャーナルを展開
            </p>
          </div>

          {/* ヘッダー行 */}
          <div className="grid grid-cols-[1fr_160px_80px] gap-3 px-3 mb-2">
            <span className="text-yoake-text-muted text-xs font-serif">氏名 / 最終ログイン</span>
            <span className="text-yoake-text-muted text-xs font-serif">進捗（章単位）</span>
            <span />
          </div>

          {loadingStudents ? (
            <div className="text-center py-8 text-yoake-text-muted text-xs font-serif">
              生徒データを読み込み中…
            </div>
          ) : studentsError ? (
            <StudentListFallback onSelect={selectStudent} selectedId={selectedStudentId} />
          ) : students.length === 0 ? (
            <div className="text-center py-8 text-yoake-text-muted text-xs font-serif">
              生徒が登録されていません
            </div>
          ) : (
            <div className="space-y-2">
              {students.map((student) => (
                <div key={student.player_id}>
                  <StudentRow
                    student={student}
                    isSelected={selectedStudentId === student.player_id}
                    onSelect={() => selectStudent(student.player_id)}
                  />
                  {selectedStudentId === student.player_id && (
                    <JournalPanel
                      studentId={student.player_id}
                      studentName={student.display_name}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 個人情報保護ノート */}
        <div
          className="p-4 text-center"
          style={{ border: "1px dashed #C9B99A", borderRadius: 0 }}
        >
          <p className="text-yoake-text-muted text-xs font-serif leading-relaxed">
            生徒が「非公開」に設定したジャーナルは教員には表示されません。
            閲覧できるのは生徒が「公開」を選択した記録のみです。
          </p>
        </div>
      </div>
    </main>
  );
}

// ── Fallback components (when backend is unreachable) ─────────

/**
 * バックエンドが起動していない場合のフォールバック表示
 * モックデータを直接フロントで持つことでUIフローを確認可能
 */
const FALLBACK_STUDENTS: StudentSummary[] = [
  {
    player_id: "student-001",
    display_name: "みどり",
    last_login_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    current_chapter: 1,
    current_scene: 4,
    total_scenes: 8,
    playtime_seconds: 2700,
  },
  {
    player_id: "student-002",
    display_name: "あおい",
    last_login_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    current_chapter: 1,
    current_scene: 7,
    total_scenes: 8,
    playtime_seconds: 4800,
  },
  {
    player_id: "student-003",
    display_name: "はると",
    last_login_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    current_chapter: 1,
    current_scene: 2,
    total_scenes: 8,
    playtime_seconds: 900,
  },
];

function FallbackSummary() {
  return (
    <div
      className="bg-yoake-bg-card paper-texture p-5"
      style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
    >
      <h2 className="font-ui text-yoake-text-muted text-xs mb-5 tracking-widest">
        クラス全体の活動サマリー
        <span className="ml-2 text-yoake-text-muted opacity-60 normal-case">（オフラインモード）</span>
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="font-ui text-yoake-accent text-2xl">5</p>
          <p className="text-yoake-text-muted text-xs font-serif mt-1">生徒数</p>
        </div>
        <div className="text-center">
          <p className="font-ui text-yoake-accent text-2xl">40分</p>
          <p className="text-yoake-text-muted text-xs font-serif mt-1">平均プレイ時間</p>
        </div>
        <div className="text-center">
          <p className="font-ui text-yoake-accent text-2xl">0%</p>
          <p className="text-yoake-text-muted text-xs font-serif mt-1">第1章クリア率</p>
        </div>
      </div>
    </div>
  );
}

interface StudentListFallbackProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
}

function StudentListFallback({ onSelect, selectedId }: StudentListFallbackProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  function handleSelect(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
    onSelect(id);
  }

  return (
    <div className="space-y-2">
      <div
        className="px-3 py-2 text-xs text-yoake-text-muted font-serif text-center"
        style={{ border: "1px dashed #C9B99A", background: "#E6D9C2" }}
      >
        バックエンドが起動していないため、フロントのモックデータを表示しています
      </div>
      {FALLBACK_STUDENTS.map((student) => (
        <div key={student.player_id}>
          <StudentRow
            student={student}
            isSelected={selectedId === student.player_id || openId === student.player_id}
            onSelect={() => handleSelect(student.player_id)}
          />
          {(selectedId === student.player_id || openId === student.player_id) && (
            <FallbackJournalPanel studentId={student.player_id} studentName={student.display_name} />
          )}
        </div>
      ))}
    </div>
  );
}

// フォールバック用ジャーナル（バックエンド未起動時）
const FALLBACK_JOURNALS: Record<string, Array<{ label: string; content: string | null; isPublic: boolean }>> = {
  "student-001": [
    { label: "コマ1：灯台に来た日", content: "みのりの本当の問いは、友達に嫌われているかどうかではなく、自分が誰かに大切にされているかどうかを確かめたいのだと思う。", isPublic: true },
    { label: "コマ2：情報を集める", content: null, isPublic: false },
  ],
  "student-002": [
    { label: "コマ1：灯台に来た日", content: "みのりが傷ついたのは友達が悪いからだと最初は思った。でも一方向から見るのは探偵として甘いかもしれない。", isPublic: true },
  ],
  "student-003": [
    { label: "コマ1：灯台に来た日", content: null, isPublic: false },
  ],
};

function FallbackJournalPanel({ studentId, studentName }: { studentId: string; studentName: string | null }) {
  const journals = FALLBACK_JOURNALS[studentId] ?? [];
  const publicCount = journals.filter((j) => j.isPublic).length;
  const privateCount = journals.filter((j) => !j.isPublic).length;

  return (
    <div
      className="p-4 space-y-3"
      style={{ border: "1px solid #C9805E", borderTop: "none", background: "#F5EDE0" }}
    >
      <div
        className="px-3 py-2 text-xs text-yoake-text-muted font-serif leading-relaxed"
        style={{ border: "1px dashed #C9B99A", background: "#EDE3CF" }}
      >
        このジャーナルは生徒が探究の過程で書いた記録です。正解・不正解で評価せず、問いの変化・深まりに着目してください。
      </div>
      <div className="flex gap-3 text-xs font-serif">
        <span className="text-yoake-accent">公開: {publicCount}件</span>
        <span className="text-yoake-text-muted">非公開（本人のみ）: {privateCount}件</span>
      </div>
      {journals.length === 0 ? (
        <p className="text-yoake-text-muted text-xs text-center py-3 font-serif">
          {studentName ?? "この生徒"}はまだジャーナルを書いていません
        </p>
      ) : (
        <div className="space-y-2">
          {journals.map((j, idx) => (
            <div
              key={idx}
              className="p-3"
              style={{
                border: j.isPublic ? "1px solid #C9B99A" : "1px dashed #C9B99A",
                background: j.isPublic ? "#EDE3CF" : "#E6D9C2",
                opacity: j.isPublic ? 1 : 0.6,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-yoake-text-muted text-xs font-serif">{j.label}</span>
                {j.isPublic ? (
                  <span className="text-xs font-serif px-1.5 py-0.5" style={{ border: "1px solid #9BAE8C", color: "#6B7C5A", background: "#F5EDE0" }}>公開</span>
                ) : (
                  <span className="text-xs font-serif px-1.5 py-0.5" style={{ border: "1px solid #C9B99A", color: "#8B9DAE", background: "#E6D9C2" }}>非公開</span>
                )}
              </div>
              {j.isPublic && j.content ? (
                <p className="text-yoake-text-secondary text-sm leading-relaxed font-serif">{j.content}</p>
              ) : (
                <p className="text-yoake-text-muted text-xs italic font-serif">— 生徒が非公開に設定したため、内容は表示されません —</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
