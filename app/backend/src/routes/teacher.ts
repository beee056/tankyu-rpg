import { Hono } from "hono";
import type { Env } from "../index";

export const teacherRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/teacher/class/:classId
 * クラス集計
 */
teacherRoutes.get("/class/:classId", async (c) => {
  const classId = c.req.param("classId");
  // TODO: verify teacher auth, query class aggregate data
  return c.json({
    ok: true,
    data: {
      class_id: classId,
      student_count: 0,
      avg_status: {
        question_power: 0,
        explore_power: 0,
        connect_power: 0,
        express_power: 0,
      },
      choice_distribution: {},
      journal_stats: {
        submitted_count: 0,
        avg_word_count: 0,
      },
    },
  });
});

/**
 * GET /api/teacher/student/:playerId
 * 個人データ（教員認証必須）
 */
teacherRoutes.get("/student/:playerId", async (c) => {
  const playerId = c.req.param("playerId");
  // TODO: verify teacher auth + same class check
  return c.json({
    ok: true,
    data: {
      player_id: playerId,
      progress: null,
      status_points: null,
      journals: [],
      question_cards: [],
      choice_logs: [],
      achievements: [],
    },
  });
});

/**
 * POST /api/teacher/note
 * 教員メモ保存
 */
teacherRoutes.post("/note", async (c) => {
  const body = await c.req.json<{
    player_id: string;
    content: string;
  }>();

  if (!body.player_id || !body.content) {
    return c.json({ ok: false, error: "player_id and content are required" }, 400);
  }

  const noteId = crypto.randomUUID();
  // TODO: insert teacher_notes
  return c.json({
    ok: true,
    data: { note_id: noteId, created_at: new Date().toISOString() },
  });
});
