import { Hono } from "hono";
import type { Env } from "../index";

export const choiceRoutes = new Hono<{ Bindings: Env }>();

/**
 * POST /api/choices
 * 選択肢ログ保存 — D1 choice_logs へ書き込み
 */
choiceRoutes.post("/", async (c) => {
  const body = await c.req.json<{
    scene_id: string;
    choice_key: "A" | "B" | "C" | "D" | "free";
    choice_reason?: string;
    play_count?: number;
  }>();

  if (!body.scene_id || !body.choice_key) {
    return c.json({ ok: false, error: "scene_id and choice_key are required" }, 400);
  }

  const logId = crypto.randomUUID();
  const now = new Date().toISOString();

  try {
    await c.env.DB.prepare(
      `INSERT INTO choice_logs (log_id, player_id, scene_id, choice_key, choice_reason, play_count, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      logId,
      "dev-player-001", // TODO: JWTから取得
      body.scene_id,
      body.choice_key,
      body.choice_reason ?? null,
      body.play_count ?? 1,
      now
    ).run();
  } catch (e) {
    // ローカル開発時はDBなしでも動く
    console.warn("[choices] DB write skipped:", (e as Error).message);
  }

  return c.json({
    ok: true,
    data: { log_id: logId, created_at: now },
  });
});

/**
 * GET /api/choices
 * 自プレイヤーの選択ログ一覧
 */
choiceRoutes.get("/", async (c) => {
  try {
    const rows = await c.env.DB.prepare(
      `SELECT * FROM choice_logs WHERE player_id = ? ORDER BY created_at DESC LIMIT 100`
    ).bind("dev-player-001").all();
    return c.json({ ok: true, data: rows.results ?? [] });
  } catch {
    return c.json({ ok: true, data: [] });
  }
});
