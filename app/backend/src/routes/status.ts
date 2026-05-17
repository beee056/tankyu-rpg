import { Hono } from "hono";
import type { Env } from "../index";

export const statusRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/status
 * ステータスポイント取得
 */
statusRoutes.get("/", async (c) => {
  // TODO: query status_points for authenticated player
  return c.json({
    ok: true,
    data: {
      status_id: "TODO",
      player_id: "TODO",
      question_power: 0,
      explore_power: 0,
      connect_power: 0,
      express_power: 0,
      updated_at: new Date().toISOString(),
    },
  });
});

/**
 * GET /api/status/achievements
 * 称号一覧
 */
statusRoutes.get("/achievements", async (c) => {
  // TODO: query title_achievements for authenticated player
  return c.json({ ok: true, data: [] });
});
