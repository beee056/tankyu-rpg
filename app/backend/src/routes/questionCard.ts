import { Hono } from "hono";
import type { Env } from "../index";

export const questionCardRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/question-cards
 * 問いカード一覧（変遷ログ）
 */
questionCardRoutes.get("/", async (c) => {
  // TODO: query question_cards for authenticated player
  return c.json({ ok: true, data: [] });
});

/**
 * POST /api/question-cards
 * 問いカード新規作成 / 書き換え
 */
questionCardRoutes.post("/", async (c) => {
  const body = await c.req.json<{
    scene_id: string;
    question_text: string;
    play_count: number;
  }>();

  if (!body.question_text || body.question_text.length < 10) {
    return c.json(
      { ok: false, error: "question_text must be at least 10 characters" },
      400
    );
  }

  const cardId = crypto.randomUUID();
  // TODO:
  // 1. Mark existing is_current=true cards as false
  // 2. Insert new card with is_current=true
  // 3. Increment version number
  return c.json({
    ok: true,
    data: {
      card_id: cardId,
      version: 1,
      is_current: true,
      created_at: new Date().toISOString(),
    },
  });
});
