import { Hono } from "hono";
import type { Env } from "../index";

export const playerRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/players/me
 * ダミープレイヤー返却（認証は後フェーズで実装）
 */
playerRoutes.get("/me", async (c) => {
  return c.json({
    ok: true,
    data: {
      player_id: "dev-player-001",
      display_name: null,
      grade: "high2",
      join_motivation: "fun",
      character_type: "default",
      class_id: null,
      created_at: new Date().toISOString(),
    },
  });
});
