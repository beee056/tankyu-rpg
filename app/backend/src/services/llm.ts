/**
 * LLM API ラッパー — Claude Haiku 4.5
 * GDD §5-3 / §7-4 のガードレール構造に準拠
 *
 * 三層ガードレール：
 *  1. Prompt layer  — system prompt で禁止パターンを明記（灰島遊キャラクター設定込み）
 *  2. Model layer   — max_tokens=80, temperature=0.7, stop_sequences
 *  3. App layer     — 断定文・指示文の後処理チェック → フォールバック
 */

const MODEL = "claude-haiku-4-5";

// ─────────────────────────────────────────────────────────────────────────────
// System Prompt（プロンプトキャッシュ対象 — 変更時はキャッシュ無効化に注意）
// 灰島遊(25歳)キャラクター設定: 探偵事務所のバイトスタッフ。
// 軽口だけど芯がある。感情の言語化が鋭い。教師にならない先輩ポジション。
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `あなたは「灰島遊（はいしま ゆう）」25歳。探偵事務所でバイトしている先輩。
口は軽いけど、感情を言語化する力が鋭い。相手を評価しない。答えを教えない。一緒に考えてくれる人。

## 絶対禁止
- 断定・評価・称賛（「そうですね」「すごい」「よくわかってる」「素晴らしい」「大変でしたね」など）
- 正解・解説・アドバイスの提示（「〜すべき」「〜しなさい」「正解は」「つまり〜ということ」）
- 指示・誘導（「次は〜してください」「〜しましょう」「〜してみて」）
- 共感の演技（「それは辛かったね」「わかるよ」など）
- 2文以上の応答
- 要約・まとめ・解説

## 必守ルール
- 疑問文1文のみで返す（文末は必ず「？」）
- 30〜80字以内
- プレイヤーが書いた言葉をそのまま1つ引用して問いに使う
- 「あなた自身」へ向けた問いにする
- 口語・砕けた日本語でOK（でも粗くない）

## 会話スタイル例
入力「みのりが可哀想だと思った」
→ 「可哀想って思った瞬間、自分の中で何かがうごいた感じ、あった？」

入力「わからない」
→ 「わからない——その"わからない"、何年くらい抱えてる感じ？」

入力「普通のことだと思う」
→ 「"普通"ってあなたにとって、誰が決めた基準？」

入力「考えたことなかった」
→ 「考えたことなかった——それ、今日はじめて気づいた感じ？」`;

// Fallback — LLM失敗時 or ガードレール違反時に返す定型応答
const FALLBACK_RESPONSE =
  "もう少し続けて書いてみると、何が出てくると思う？";

// ─────────────────────────────────────────────────────────────────────────────
// 層3: アプリ層 — 断定文・指示文チェック正規表現
// ─────────────────────────────────────────────────────────────────────────────
const PROHIBITED_PATTERNS = [
  // 断定終止形
  /[。」]?です($|ね|よ|か？)/,
  /[。」]?ます($|ね|よ|か？)/,
  /だと思います/,
  /でしょう($|ね|か)/,
  // 称賛・評価
  /すごい(ですね|！|ね)/,
  /よく考えられています/,
  /素晴らしい/,
  /大変でしたね/,
  /よくわかってる/,
  // 指示・アドバイス
  /すべき/,
  /しなさい/,
  /正解は/,
  /次は.+してください/,
  /次は.+しましょう/,
  /してみて($|ください)/,
  /つまり.+ということ/,
];

function isValidResponse(text: string): boolean {
  // 疑問文で終わること
  if (!text.endsWith("？") && !text.endsWith("?")) return false;
  // 文字数制限（アプリ層での再確認）
  if (text.length < 10 || text.length > 120) return false;
  // 禁止パターンチェック
  if (PROHIBITED_PATTERNS.some((p) => p.test(text))) return false;
  return true;
}

/**
 * 単一ジャーナル応答（既存互換）— PlayPage の inline journal から呼ぶ
 */
export async function callLLMWithGuardrails(
  apiKey: string,
  journalContent: string
): Promise<string> {
  return callYuJournalChat(apiKey, [
    { role: "user", content: journalContent.slice(0, 500) },
  ]);
}

// ─────────────────────────────────────────────────────────────────────────────
// マルチターン対話 — JournalPage チャットUI向け
// history は最新のものを末尾に積んだ {role, content}[] 配列
// ─────────────────────────────────────────────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function callYuJournalChat(
  apiKey: string,
  history: ChatMessage[]
): Promise<string> {
  // 最大5ターン分のみ渡す（コスト・コンテキスト管理）
  const trimmedHistory = history.slice(-10);

  const requestBody = {
    model: MODEL,
    max_tokens: 80,
    temperature: 0.7,
    stop_sequences: ["。\n"],
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        // プロンプトキャッシュ: system prompt をキャッシュして入力コスト削減
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: trimmedHistory.map((m) => ({
      role: m.role,
      content: m.content.slice(0, 500),
    })),
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
          // プロンプトキャッシュを有効化するためのベータヘッダー
          "anthropic-beta": "prompt-caching-2024-07-31",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error(`[LLM] API error ${res.status}: ${errText}`);
        break;
      }

      const data = (await res.json()) as {
        content: Array<{ type: string; text: string }>;
        usage?: { cache_read_input_tokens?: number; cache_creation_input_tokens?: number };
      };

      // キャッシュ利用ログ（デバッグ用）
      if (data.usage) {
        const cacheRead = data.usage.cache_read_input_tokens ?? 0;
        const cacheWrite = data.usage.cache_creation_input_tokens ?? 0;
        if (cacheRead > 0 || cacheWrite > 0) {
          console.log(`[LLM] Cache: read=${cacheRead}, write=${cacheWrite}`);
        }
      }

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
  const SESSION_LIMIT = 5;

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
    remaining: Math.min(
      DAILY_LIMIT - dayCount - 1,
      SESSION_LIMIT - sessionCount - 1
    ),
  };
}
