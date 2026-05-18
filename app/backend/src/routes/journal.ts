import { Hono } from "hono";
import type { Env } from "../index";
import { callLLMWithGuardrails } from "../services/llm";

export const journalRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/journals
 * ジャーナル一覧
 */
journalRoutes.get("/", async (c) => {
  // TODO: list journals for authenticated player
  return c.json({ ok: true, data: [] });
});

/**
 * POST /api/journals
 * ジャーナル保存 + AI問い返しトリガー
 */
journalRoutes.post("/", async (c) => {
  const body = await c.req.json<{
    scene_id: string;
    prompt_text: string;
    content: string;
  }>();

  if (!body.content?.trim()) {
    return c.json({ ok: false, error: "content is required" }, 400);
  }

  // TODO: save to DB, generate entry_id
  const entryId = crypto.randomUUID();

  // Trigger AI response
  let aiResponse: string | null = null;
  if (c.env.ANTHROPIC_API_KEY) {
    aiResponse = await callLLMWithGuardrails(c.env.ANTHROPIC_API_KEY, body.content);
  }

  return c.json({
    ok: true,
    data: {
      entry_id: entryId,
      ai_response: aiResponse,
      created_at: new Date().toISOString(),
    },
  });
});

/**
 * PUT /api/journals/:entry_id
 * ジャーナル更新
 */
journalRoutes.put("/:entry_id", async (c) => {
  c.req.param("entry_id");
  await c.req.json();
  // TODO: validate, update in DB
  return c.json({ ok: true, data: { updated_at: new Date().toISOString() } });
});
