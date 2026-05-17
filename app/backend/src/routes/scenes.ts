import { Hono } from "hono";
import type { Env } from "../index";

export const sceneRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/scenes/:chapterId/:sceneId
 * シーン情報を返却（静的データ — 後にDB化可能）
 */
sceneRoutes.get("/:chapterId/:sceneId", async (c) => {
  const { chapterId, sceneId } = c.req.param();

  // ch1 / s01 のみ実装（コマ1）
  if (chapterId === "1" && sceneId === "1") {
    return c.json({
      ok: true,
      data: {
        chapter_id: 1,
        scene_id: 1,
        title: "灯台に来た日",
        start_scene_key: "ch1_s01_narration",
      },
    });
  }

  return c.json({ ok: false, error: "Scene not found", code: 404 }, 404);
});
