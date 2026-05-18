import { Hono } from "hono";
import type { Env } from "../index";
import {
  callLLMWithGuardrails,
  callYuJournalChat,
  type ChatMessage,
} from "../services/llm";

export const journalRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/journals
 * ジャーナル一覧（プレイヤーのエントリ一覧）
 */
journalRoutes.get("/", async (c) => {
  // TODO: JWT認証からplayer_id取得。現状は空配列返却。
  return c.json({ ok: true, data: [] });
});

/**
 * POST /api/journals
 * ジャーナル保存 + AI問い返しトリガー（PlayPage inline journal向け）
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

  const entryId = crypto.randomUUID();

  // AI応答生成（層1〜3ガードレール適用）
  let aiResponse: string | null = null;
  if (c.env.ANTHROPIC_API_KEY) {
    aiResponse = await callLLMWithGuardrails(
      c.env.ANTHROPIC_API_KEY,
      body.content
    );
  } else {
    console.warn("[journal] ANTHROPIC_API_KEY not set — skipping AI response");
  }

  // D1保存（player_id は未認証フェーズのため anonymous）
  if (c.env.DB) {
    try {
      await c.env.DB.prepare(
        `INSERT INTO journal_entries
          (entry_id, player_id, scene_id, prompt_text, content, word_count, ai_response)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          entryId,
          "anonymous",
          body.scene_id ?? "",
          body.prompt_text ?? "",
          body.content,
          body.content.length,
          aiResponse ?? null
        )
        .run();
    } catch (err) {
      console.error("[journal] D1 insert error:", err);
      // 保存失敗してもAI応答は返す
    }
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
 * POST /api/journals/chat
 * 内省ジャーナル AI対話エンドポイント（JournalPage チャットUI向け）
 *
 * リクエスト:
 *   { message: string, chapter_id?: string, scene_id?: string, history?: ChatMessage[] }
 *
 * レスポンス:
 *   { ok: true, data: { response: string, entry_id: string } }
 */
journalRoutes.post("/chat", async (c) => {
  if (!c.env.ANTHROPIC_API_KEY) {
    return c.json(
      {
        ok: false,
        error:
          "ANTHROPIC_API_KEY is not configured. " +
          "Set it via: wrangler secret put ANTHROPIC_API_KEY  (or add to .dev.vars for local dev)",
      },
      503
    );
  }

  let body: {
    message: string;
    chapter_id?: string;
    scene_id?: string;
    history?: ChatMessage[];
  };

  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  if (!body.message?.trim()) {
    return c.json({ ok: false, error: "message is required" }, 400);
  }

  // 既存履歴 + 今回のメッセージを結合
  const history: ChatMessage[] = [
    ...(body.history ?? []),
    { role: "user", content: body.message.slice(0, 500) },
  ];

  // AI応答生成（層1〜3ガードレール適用）
  const aiResponse = await callYuJournalChat(c.env.ANTHROPIC_API_KEY, history);

  const entryId = crypto.randomUUID();

  // D1保存（チャット1ターン = 1レコード）
  if (c.env.DB) {
    try {
      await c.env.DB.prepare(
        `INSERT INTO journal_entries
          (entry_id, player_id, scene_id, prompt_text, content, word_count, ai_response)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          entryId,
          "anonymous",
          body.scene_id ?? "",
          "chat",
          body.message,
          body.message.length,
          aiResponse
        )
        .run();
    } catch (err) {
      console.error("[journal/chat] D1 insert error:", err);
      // 保存失敗してもレスポンスは返す
    }
  }

  return c.json({
    ok: true,
    data: {
      response: aiResponse,
      entry_id: entryId,
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
