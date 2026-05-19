import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRoutes } from "./routes/auth";
import { progressRoutes } from "./routes/progress";
import { journalRoutes } from "./routes/journal";
import { choiceRoutes } from "./routes/choice";
import { questionCardRoutes } from "./routes/questionCard";
import { statusRoutes } from "./routes/status";
import { teacherRoutes } from "./routes/teacher";
import { playerRoutes } from "./routes/players";
import { sceneRoutes } from "./routes/scenes";

export type Env = {
  DB: D1Database;
  KV: KVNamespace;
  ANTHROPIC_API_KEY: string;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
  FRONTEND_URL: string;
  ENVIRONMENT: string;
};

const app = new Hono<{ Bindings: Env }>();

// ── Middleware ────────────────────────────────────────────────
app.use("*", logger());

app.use(
  "*",
  cors({
    origin: (origin, c) => {
      const allowed = [
        c.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:4173",
      ];
      if (!origin || allowed.includes(origin)) return origin ?? "*";
      return null;
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ── Health check ──────────────────────────────────────────────
app.get("/api/health", (c) =>
  c.json({
    ok: true,
    data: {
      status: "ok",
      version: "0.1.0",
      environment: c.env.ENVIRONMENT,
      timestamp: new Date().toISOString(),
    },
  })
);

// ── Routes ────────────────────────────────────────────────────
app.route("/api/auth", authRoutes);
app.route("/api/progress", progressRoutes);
app.route("/api/journals", journalRoutes);
app.route("/api/choices", choiceRoutes);
app.route("/api/question-cards", questionCardRoutes);
app.route("/api/status", statusRoutes);
app.route("/api/teacher", teacherRoutes);
app.route("/api/players", playerRoutes);
app.route("/api/scenes", sceneRoutes);

// ── 404 ───────────────────────────────────────────────────────
app.notFound((c) =>
  c.json({ ok: false, error: "Not found", code: 404 }, 404)
);

// ── Error handler ─────────────────────────────────────────────
app.onError((err, c) => {
  console.error("[ERROR]", err);
  return c.json(
    {
      ok: false,
      error:
        c.env.ENVIRONMENT === "development"
          ? err.message
          : "Internal server error",
      code: 500,
    },
    500
  );
});

export default app;
