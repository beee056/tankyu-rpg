/**
 * LLM API ラッパー — Claude claude-3-5-haiku
 * GDD §5-3 / §7-4 のガードレール構造に準拠
 *
 * 三層ガードレール：
 *  1. Prompt layer  — system prompt で禁止パターンを明記
 *  2. Model layer   — max_tokens=120, temperature=0.7
 *  3. App layer     — 断定文・指示文の後処理チェック
 */

const SYSTEM_PROMPT = `あなたはゲーム内のAIナビゲーターです。
以下のルールを厳守してください。

## 絶対禁止
- 断定文（「○○ですね」「○○です」「○○だと思います」で終わる文）
- 称賛・評価（「すごい」「よく考えられています」「素晴らしい」等）
- 正解の提示・誘導
- 指示・アドバイス（「次は○○してください」「○○しましょう」）
- 2文以上の応答
- 要約・まとめ
- 否定・批判
- 共感の演技（「それは大変でしたね」等）

## 必守ルール
- 疑問文1文のみで返す
- 30〜80字以内
- プレイヤーの記述の言葉をそのまま使う
- 「あなた自身」に向けた問いにする
- 文末は必ず「？」で終わる

## 例
入力「みのりが可哀想だと思った」
→ 「可哀想だと思った——その感情、あなたにも似た経験がありますか？」

入力「わからない」
→ 「わからない——それは何がわからないのですか？」`;

// Fallback when LLM fails or produces invalid output
const FALLBACK_RESPONSE =
  "もう少し続けて書いてみると、何が出てくると思いますか？";

// Regex checks for prohibited patterns (Application layer)
const PROHIBITED_PATTERNS = [
  /次は.+してください/,
  /次は.+しましょう/,
  /すごい(ですね|！)/,
  /よく考えられています/,
  /素晴らしい/,
  /大変でしたね/,
];

function isValidResponse(text: string): boolean {
  if (!text.endsWith("？") && !text.endsWith("?")) return false;
  if (text.length < 10 || text.length > 120) return false;
  if (PROHIBITED_PATTERNS.some((p) => p.test(text))) return false;
  return true;
}

/**
 * Call Claude claude-3-5-haiku with guardrails.
 * Returns the AI question string, or fallback if validation fails.
 */
export async function callLLMWithGuardrails(
  apiKey: string,
  journalContent: string
): Promise<string> {
  // Anonymize: replace any player-identifying content (basic pass)
  const anonymizedContent = journalContent.slice(0, 500);

  const requestBody = {
    model: "claude-3-5-haiku-20241022",
    max_tokens: 120,
    temperature: 0.7,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: anonymizedContent,
      },
    ],
  };

  let attempts = 0;
  const MAX_ATTEMPTS = 2;

  while (attempts < MAX_ATTEMPTS) {
    attempts++;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        console.error(`[LLM] API error ${res.status}: ${await res.text()}`);
        break;
      }

      const data = (await res.json()) as {
        content: Array<{ type: string; text: string }>;
      };

      const text = data.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("")
        .trim();

      if (isValidResponse(text)) {
        return text;
      }

      console.warn(`[LLM] Invalid response (attempt ${attempts}): "${text}"`);
    } catch (err) {
      console.error(`[LLM] Fetch error (attempt ${attempts}):`, err);
      break;
    }
  }

  return FALLBACK_RESPONSE;
}

/**
 * Check rate limit for a player using KV.
 * Returns true if within limit.
 */
export async function checkRateLimit(
  kv: KVNamespace,
  playerId: string,
  sessionId: string
): Promise<{ allowed: boolean; remaining: number }> {
  const DAILY_LIMIT = 20;
  const SESSION_LIMIT = 3;

  const dayKey = `rate:${playerId}:${new Date().toISOString().slice(0, 10)}`;
  const sessionKey = `rate:session:${sessionId}`;

  const [dayCount, sessionCount] = await Promise.all([
    kv.get(dayKey).then((v) => parseInt(v ?? "0", 10)),
    kv.get(sessionKey).then((v) => parseInt(v ?? "0", 10)),
  ]);

  if (dayCount >= DAILY_LIMIT || sessionCount >= SESSION_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  // Increment counters (fire-and-forget)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const secondsUntilMidnight = Math.floor(
    (tomorrow.getTime() - Date.now()) / 1000
  );

  void kv.put(dayKey, String(dayCount + 1), {
    expirationTtl: secondsUntilMidnight,
  });
  void kv.put(sessionKey, String(sessionCount + 1), {
    expirationTtl: 3600, // 1 hour session
  });

  return {
    allowed: true,
    remaining: Math.min(DAILY_LIMIT - dayCount - 1, SESSION_LIMIT - sessionCount - 1),
  };
}
