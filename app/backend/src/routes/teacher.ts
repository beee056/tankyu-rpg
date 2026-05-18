import { Hono } from "hono";
import type { Env } from "../index";

export const teacherRoutes = new Hono<{ Bindings: Env }>();

// ── Mock data ────────────────────────────────────────────────
// モックデータ — D1スキーマ未実装のため、APIフローの完全動作を担保する
const MOCK_STUDENTS = [
  {
    player_id: "student-001",
    display_name: "みどり",
    last_login_at: "2026-05-17T14:30:00Z",
    current_chapter: 1,
    current_scene: 4,
    total_scenes: 8,
    playtime_seconds: 2700,
  },
  {
    player_id: "student-002",
    display_name: "あおい",
    last_login_at: "2026-05-18T09:15:00Z",
    current_chapter: 1,
    current_scene: 7,
    total_scenes: 8,
    playtime_seconds: 4800,
  },
  {
    player_id: "student-003",
    display_name: "はると",
    last_login_at: "2026-05-16T16:00:00Z",
    current_chapter: 1,
    current_scene: 2,
    total_scenes: 8,
    playtime_seconds: 900,
  },
  {
    player_id: "student-004",
    display_name: "ゆき",
    last_login_at: "2026-05-18T11:45:00Z",
    current_chapter: 1,
    current_scene: 6,
    total_scenes: 8,
    playtime_seconds: 3600,
  },
  {
    player_id: "student-005",
    display_name: "たいが",
    last_login_at: "2026-05-15T13:20:00Z",
    current_chapter: 1,
    current_scene: 1,
    total_scenes: 8,
    playtime_seconds: 300,
  },
];

// 公開ジャーナル（is_public: true のもののみ教員に返却）
// IMPORTANT: is_public === false のエントリは絶対にこのAPIから返さない
const MOCK_JOURNALS: Record<
  string,
  Array<{
    entry_id: string;
    scene_id: string;
    scene_label: string;
    content: string;
    word_count: number;
    is_public: boolean;
    created_at: string;
  }>
> = {
  "student-001": [
    {
      entry_id: "j-001-01",
      scene_id: "ch1_scene_01",
      scene_label: "コマ1：灯台に来た日",
      content:
        "みのりの本当の問いは、友達に嫌われているかどうかではなく、自分が誰かに大切にされているかどうかを確かめたいのだと思う。SNSの投稿が本当に自分のことかより、その裏にある関係性への不安が問いの核心だと感じた。",
      word_count: 82,
      is_public: true,
      created_at: "2026-05-14T14:35:00Z",
    },
    {
      entry_id: "j-001-02",
      scene_id: "ch1_scene_02",
      scene_label: "コマ2：情報を集める",
      content: "（非公開）",
      word_count: 0,
      is_public: false,
      created_at: "2026-05-15T15:10:00Z",
    },
    {
      entry_id: "j-001-03",
      scene_id: "ch1_scene_03",
      scene_label: "コマ3：問いを立てる",
      content:
        "問いカードに書いた問いを読み返すと、最初より少しだけ自分の言葉に近づいた気がした。「友達は私のことが嫌いなの？」じゃなくて「私はこの友達関係に何を求めていたの？」の方が、もっとみのりの核心に近い気がする。",
      word_count: 73,
      is_public: true,
      created_at: "2026-05-16T14:55:00Z",
    },
  ],
  "student-002": [
    {
      entry_id: "j-002-01",
      scene_id: "ch1_scene_01",
      scene_label: "コマ1：灯台に来た日",
      content:
        "みのりが傷ついたのは友達が悪いからだと最初は思った。でもSNSの投稿を見たとき、投稿した側にも何か事情があるんじゃないかと感じた。一方向から見るのは探偵として甘いかもしれない。",
      word_count: 65,
      is_public: true,
      created_at: "2026-05-14T09:20:00Z",
    },
    {
      entry_id: "j-002-02",
      scene_id: "ch1_scene_02",
      scene_label: "コマ2：情報を集める",
      content:
        "親友の側に話を聞いてみて、みのりの話とは全然違う景色が見えた。「最近疲れてる」という言葉が引っかかった。傷ついている人は一人じゃないかもしれない。",
      word_count: 52,
      is_public: true,
      created_at: "2026-05-15T09:45:00Z",
    },
    {
      entry_id: "j-002-03",
      scene_id: "ch1_scene_03",
      scene_label: "コマ3：問いを立てる",
      content: "（非公開）",
      word_count: 0,
      is_public: false,
      created_at: "2026-05-16T10:00:00Z",
    },
  ],
  "student-003": [
    {
      entry_id: "j-003-01",
      scene_id: "ch1_scene_01",
      scene_label: "コマ1：灯台に来た日",
      content: "（非公開）",
      word_count: 0,
      is_public: false,
      created_at: "2026-05-16T16:05:00Z",
    },
  ],
  "student-004": [
    {
      entry_id: "j-004-01",
      scene_id: "ch1_scene_01",
      scene_label: "コマ1：灯台に来た日",
      content:
        "みのりの問いは表面上「友達に嫌われているか」だけど、本当の問いは「自分は孤独ではないか」だと思う。誰かに必要とされているかどうかを確かめたくて、SNSを気にしているんじゃないかな。",
      word_count: 63,
      is_public: true,
      created_at: "2026-05-14T11:50:00Z",
    },
    {
      entry_id: "j-004-02",
      scene_id: "ch1_scene_02",
      scene_label: "コマ2：情報を集める",
      content:
        "SNSの投稿を調べてみたら、投稿の文章が曖昧だということがわかった。みのりが決めつけていた部分が実は確認できていなかった。情報を集める前に結論を出すのは危険だと思った。",
      word_count: 60,
      is_public: true,
      created_at: "2026-05-15T12:15:00Z",
    },
  ],
  "student-005": [],
};

// ── Auth helper ──────────────────────────────────────────────
/**
 * 教員ロールチェック — Authorizationヘッダーの簡易検証
 * 本番ではJWT検証 + DBのrole確認を行う
 * 開発モードでは "Bearer teacher-*" トークンを教員として扱う
 */
function verifyTeacherRole(authHeader: string | undefined): boolean {
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "").trim();
  // 開発用: teacher- プレフィックスのトークンを教員として扱う
  if (token.startsWith("teacher-")) return true;
  // 本番ではここでJWT検証 → role === 'teacher' をチェック
  return false;
}

// ── Routes ───────────────────────────────────────────────────

/**
 * GET /api/teacher/students
 * 担当クラスの生徒一覧 + 進捗
 * 教員ロール必須
 */
teacherRoutes.get("/students", async (c) => {
  const auth = c.req.header("Authorization");
  if (!verifyTeacherRole(auth)) {
    return c.json({ ok: false, error: "Forbidden: teacher role required" }, 403);
  }

  const avgPlaytime = Math.round(
    MOCK_STUDENTS.reduce((sum, s) => sum + s.playtime_seconds, 0) /
      MOCK_STUDENTS.length
  );

  const clearCount = MOCK_STUDENTS.filter(
    (s) => s.current_scene >= s.total_scenes
  ).length;

  return c.json({
    ok: true,
    data: {
      students: MOCK_STUDENTS,
      summary: {
        total_count: MOCK_STUDENTS.length,
        avg_playtime_seconds: avgPlaytime,
        chapter_clear_rate: Math.round((clearCount / MOCK_STUDENTS.length) * 100),
      },
    },
  });
});

/**
 * GET /api/teacher/student/:id/journals
 * 特定生徒の【公開】ジャーナルのみ返却
 * IMPORTANT: is_public === false のエントリは絶対に返さない
 * 教員ロール必須
 */
teacherRoutes.get("/student/:id/journals", async (c) => {
  const auth = c.req.header("Authorization");
  if (!verifyTeacherRole(auth)) {
    return c.json({ ok: false, error: "Forbidden: teacher role required" }, 403);
  }

  const studentId = c.req.param("id");

  if (!MOCK_STUDENTS.find((s) => s.player_id === studentId)) {
    return c.json({ ok: false, error: "Student not found" }, 404);
  }

  const allEntries = MOCK_JOURNALS[studentId] ?? [];

  // 非公開ジャーナルを絶対に教員に見せない
  // is_public === false のエントリは content をマスクした上でメタ情報のみ返す
  const result = allEntries.map((entry) => {
    if (!entry.is_public) {
      return {
        entry_id: entry.entry_id,
        scene_id: entry.scene_id,
        scene_label: entry.scene_label,
        content: null, // 非公開: contentはnull
        word_count: null, // 非公開: 文字数も見せない
        is_public: false,
        created_at: entry.created_at,
      };
    }
    return {
      entry_id: entry.entry_id,
      scene_id: entry.scene_id,
      scene_label: entry.scene_label,
      content: entry.content,
      word_count: entry.word_count,
      is_public: true,
      created_at: entry.created_at,
    };
  });

  return c.json({
    ok: true,
    data: {
      student_id: studentId,
      journals: result,
      public_count: result.filter((j) => j.is_public).length,
      private_count: result.filter((j) => !j.is_public).length,
    },
  });
});

/**
 * GET /api/teacher/class/:classId
 * クラス集計
 */
teacherRoutes.get("/class/:classId", async (c) => {
  const auth = c.req.header("Authorization");
  if (!verifyTeacherRole(auth)) {
    return c.json({ ok: false, error: "Forbidden: teacher role required" }, 403);
  }

  const classId = c.req.param("classId");

  return c.json({
    ok: true,
    data: {
      class_id: classId,
      student_count: MOCK_STUDENTS.length,
      avg_status: {
        question_power: 18,
        explore_power: 22,
        connect_power: 14,
        express_power: 11,
      },
      choice_distribution: {
        scene_04: { A: 40, B: 35, C: 25 },
      },
      journal_stats: {
        submitted_count: MOCK_STUDENTS.filter((s) => s.current_scene >= 2).length,
        avg_word_count: 64,
      },
    },
  });
});

/**
 * GET /api/teacher/student/:playerId
 * 個人データ（教員認証必須）
 */
teacherRoutes.get("/student/:playerId", async (c) => {
  const auth = c.req.header("Authorization");
  if (!verifyTeacherRole(auth)) {
    return c.json({ ok: false, error: "Forbidden: teacher role required" }, 403);
  }

  const playerId = c.req.param("playerId");
  const student = MOCK_STUDENTS.find((s) => s.player_id === playerId);

  if (!student) {
    return c.json({ ok: false, error: "Student not found" }, 404);
  }

  return c.json({
    ok: true,
    data: {
      player_id: playerId,
      display_name: student.display_name,
      progress: {
        current_chapter: student.current_chapter,
        current_scene: student.current_scene,
        total_scenes: student.total_scenes,
        playtime_seconds: student.playtime_seconds,
      },
      status_points: {
        question_power: Math.floor(Math.random() * 30) + 5,
        explore_power: Math.floor(Math.random() * 30) + 5,
        connect_power: Math.floor(Math.random() * 25) + 3,
        express_power: Math.floor(Math.random() * 20) + 2,
      },
      achievements: [],
      question_cards: [],
    },
  });
});

/**
 * POST /api/teacher/note
 * 教員メモ保存
 */
teacherRoutes.post("/note", async (c) => {
  const auth = c.req.header("Authorization");
  if (!verifyTeacherRole(auth)) {
    return c.json({ ok: false, error: "Forbidden: teacher role required" }, 403);
  }

  const body = await c.req.json<{
    player_id: string;
    content: string;
  }>();

  if (!body.player_id || !body.content) {
    return c.json({ ok: false, error: "player_id and content are required" }, 400);
  }

  const noteId = crypto.randomUUID();
  return c.json({
    ok: true,
    data: { note_id: noteId, created_at: new Date().toISOString() },
  });
});
