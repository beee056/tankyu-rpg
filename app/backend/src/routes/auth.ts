import { Hono } from "hono";
import type { Env } from "../index";

export const authRoutes = new Hono<{ Bindings: Env }>();

/**
 * POST /api/auth/magic-link
 * Magic Link メール送信
 */
authRoutes.post("/magic-link", async (c) => {
  const body = await c.req.json<{ email: string }>();
  if (!body.email) {
    return c.json({ ok: false, error: "email is required" }, 400);
  }
  // TODO: generate OTP, store in KV, send via Resend
  return c.json({ ok: true, data: { message: "Magic link sent" } });
});

/**
 * POST /api/auth/verify
 * OTP 検証 → JWT セッション発行
 */
authRoutes.post("/verify", async (c) => {
  const _body = await c.req.json<{ email: string; token: string }>();
  // TODO: verify OTP from KV, issue JWT
  return c.json({ ok: true, data: { token: "TODO_JWT_TOKEN" } });
});

/**
 * GET /api/auth/session
 * セッション確認
 */
authRoutes.get("/session", async (c) => {
  const auth = c.req.header("Authorization");
  if (!auth) return c.json({ ok: false, error: "Unauthorized" }, 401);
  // TODO: verify JWT, return player info
  return c.json({ ok: true, data: { player_id: "TODO", email: "TODO" } });
});

/**
 * POST /api/auth/google
 * Google OAuth コールバック（スタブ）
 */
authRoutes.post("/google", async (c) => {
  const _body = await c.req.json<{ id_token: string }>();
  // TODO: verify Google ID token, create or find player
  return c.json({ ok: true, data: { token: "TODO_JWT_TOKEN" } });
});
