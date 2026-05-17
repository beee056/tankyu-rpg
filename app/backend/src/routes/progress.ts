import { Hono } from "hono";
import type { Env } from "../index";

export const progressRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/progress
 * 現在の進行状態取得
 */
progressRoutes.get("/", async (c) => {
  // TODO: extract player_id from JWT, query DB
  return c.json({
    ok: true,
    data: {
      progress_id: "TODO",
      player_id: "TODO",
      current_part: 0,
      current_chapter: 1,
      current_scene: 1,
      play_count: 1,
      playtime_seconds: 0,
      empathy_count: 0,
      deep_dig_count: 0,
      question_flag_deep_talk: false,
      updated_at: new Date().toISOString(),
    },
  });
});

/**
 * PUT /api/progress
 * 進行状態更新（オートセーブ）
 */
progressRoutes.put("/", async (c) => {
  const _body = await c.req.json();
  // TODO: validate body, upsert to DB
  return c.json({ ok: true, data: { updated_at: new Date().toISOString() } });
});
