import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  role: "user" | "yu";
  text: string;
  isStreaming?: boolean;
}

interface ChatApiResponse {
  response: string;
  entry_id: string;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// YuAvatar — 灰島遊のアイコン（テキストプレースホルダー）
// ─────────────────────────────────────────────────────────────────────────────
function YuAvatar({ small = false }: { small?: boolean }) {
  const size = small ? "w-7 h-7 text-xs" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${size} rounded-none flex-shrink-0 flex items-center justify-center text-sky-400 font-ui font-bold`}
      style={{
        background: "#1a2233",
        border: "1px solid #38bdf8",
        borderRadius: 0,
        letterSpacing: "0.05em",
      }}
    >
      遊
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ストリーミング風タイプライター表示
// ─────────────────────────────────────────────────────────────────────────────
function StreamingText({
  text,
  onDone,
}: {
  text: string;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed(0);
    timerRef.current = setInterval(() => {
      setDisplayed((prev) => {
        if (prev >= text.length) {
          clearInterval(timerRef.current!);
          onDone?.();
          return prev;
        }
        return prev + 1;
      });
    }, 28);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, onDone]);

  return (
    <span className="whitespace-pre-wrap">
      {text.slice(0, displayed)}
      {displayed < text.length && (
        <span className="inline-block w-0.5 h-3.5 bg-sky-400 animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ChatBubble
// ─────────────────────────────────────────────────────────────────────────────
function ChatBubble({
  msg,
  isLatestYu,
}: {
  msg: ChatMessage;
  isLatestYu: boolean;
}) {
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end"
      >
        <div
          className="max-w-[80%] px-4 py-3 text-sm font-serif text-yoake-ink leading-relaxed"
          style={{
            background: "#2C2218",
            border: "1px solid #C9B99A",
            borderRadius: 0,
          }}
        >
          {msg.text}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3"
    >
      <YuAvatar small />
      <div className="flex flex-col gap-1">
        <span className="text-sky-400 text-xs font-ui tracking-wide">灰島 遊</span>
        <div
          className="max-w-[80%] px-4 py-3 text-sm font-serif text-yoake-bg leading-relaxed"
          style={{
            background: "#1a2233",
            border: "1px solid #38bdf8",
            borderRadius: 0,
          }}
        >
          {isLatestYu && msg.isStreaming ? (
            <StreamingText text={msg.text} />
          ) : (
            <span className="whitespace-pre-wrap">{msg.text}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JournalPage
// ─────────────────────────────────────────────────────────────────────────────
export default function JournalPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // PlayPageから渡される初期コンテキスト
  const state = location.state as
    | { initialMessage?: string; sceneId?: string; chapterId?: string }
    | null;

  const [activeTab, setActiveTab] = useState<"chat" | "log" | "chart">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(state?.initialMessage ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // API履歴（LLMに渡すためのロールベース配列）
  const apiHistoryRef = useRef<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 初回の導入メッセージ
  useEffect(() => {
    setMessages([
      {
        id: "intro",
        role: "yu",
        text: "何か書いてみて。どんな言葉でもいい。",
        isStreaming: false,
      },
    ]);
  }, []);

  // 自動スクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setError(null);

    const userMsgId = crypto.randomUUID();
    const yuMsgId = crypto.randomUUID();

    // ユーザーメッセージを表示
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", text },
    ]);

    // API履歴に追加
    apiHistoryRef.current = [
      ...apiHistoryRef.current,
      { role: "user", content: text },
    ];

    setIsLoading(true);

    // ローディングプレースホルダー
    setMessages((prev) => [
      ...prev,
      { id: yuMsgId, role: "yu", text: "　", isStreaming: true },
    ]);

    try {
      const res = await api.post<ChatApiResponse>("/api/journals/chat", {
        message: text,
        chapter_id: state?.chapterId ?? "1",
        scene_id: state?.sceneId ?? "",
        history: apiHistoryRef.current.slice(0, -1), // 末尾のuserは除く（サーバー側で追加）
      });

      if (!res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== yuMsgId));
        setError(
          res.error.includes("ANTHROPIC_API_KEY")
            ? "APIキーが設定されていません。README の手順で設定してください。"
            : `エラー: ${res.error}`
        );
        return;
      }

      const aiText = res.data.response;

      // API履歴にAI応答を追加
      apiHistoryRef.current = [
        ...apiHistoryRef.current,
        { role: "assistant", content: aiText },
      ];

      // プレースホルダーを実際の応答で差し替え（ストリーミング風演出）
      setMessages((prev) =>
        prev.map((m) =>
          m.id === yuMsgId ? { ...m, text: aiText, isStreaming: true } : m
        )
      );
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== yuMsgId));
      setError("通信エラーが発生しました。");
      console.error("[JournalPage] sendMessage error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, state]);

  // Enter送信 (Shift+Enterで改行)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  // 最後のYuメッセージのID
  const latestYuId = [...messages].reverse().find((m) => m.role === "yu")?.id;

  const tabs = [
    { key: "chat", label: "灰島遊と話す" },
    { key: "log", label: "ジャーナル全文" },
    { key: "chart", label: "問いの進化ログ" },
  ] as const;

  return (
    <main className="min-h-screen bg-yoake-bg paper-texture flex flex-col">
      {/* ── ヘッダー ── */}
      <header
        className="border-b border-yoake-border px-6 py-4 flex items-center justify-between bg-yoake-bg-card flex-shrink-0"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="text-yoake-text-muted hover:text-yoake-text-secondary text-sm transition-colors font-serif"
        >
          ← 事務所に戻る
        </button>
        <div className="flex items-center gap-2">
          <YuAvatar small />
          <h1 className="font-ui text-yoake-ink text-sm tracking-widest">探偵手帳</h1>
        </div>
        <div className="w-20" />
      </header>

      {/* ── タブ ── */}
      <div
        className="flex gap-1 bg-yoake-bg-card px-4 pt-3 pb-0 text-xs border-b border-yoake-border flex-shrink-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-serif transition-colors border-b-2 ${
              activeTab === tab.key
                ? "border-sky-400 text-sky-400"
                : "border-transparent text-yoake-text-secondary hover:text-yoake-ink"
            }`}
            style={{ borderRadius: 0 }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── チャットタブ ── */}
      {activeTab === "chat" && (
        <div className="flex flex-col flex-1 overflow-hidden max-w-2xl mx-auto w-full">
          {/* メッセージ一覧 */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  msg={msg}
                  isLatestYu={msg.id === latestYuId}
                />
              ))}
            </AnimatePresence>

            {/* エラー表示 */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-rose-400 text-xs font-serif text-center py-2 px-4"
                style={{ border: "1px solid #f43f5e", borderRadius: 0, background: "rgba(244,63,94,0.05)" }}
              >
                {error}
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* 入力フォーム */}
          <div
            className="flex-shrink-0 px-4 pb-5 pt-3 bg-yoake-bg"
            style={{ borderTop: "1px solid #C9B99A" }}
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="自分の考えや感じたことを書いてみよう（Enter で送信）"
                disabled={isLoading}
                className="flex-1 bg-yoake-bg-card border border-yoake-border px-3 py-2 text-yoake-ink placeholder-yoake-text-muted focus:outline-none focus:border-sky-400 resize-none text-sm transition-colors font-serif disabled:opacity-50"
                style={{ borderRadius: 0 }}
              />
              <button
                onClick={() => void sendMessage()}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 bg-sky-600 hover:bg-sky-500 text-white text-xs px-4 py-3 transition-colors disabled:opacity-40 font-ui tracking-widest h-full"
                style={{ borderRadius: 0 }}
              >
                {isLoading ? (
                  <span className="animate-pulse">…</span>
                ) : (
                  "送信"
                )}
              </button>
            </div>
            <p className="text-yoake-text-muted text-xs mt-2 font-serif">
              Shift+Enter で改行 · 灰島遊は答えを教えてくれない
            </p>
          </div>
        </div>
      )}

      {/* ── ジャーナル全文タブ（将来実装） ── */}
      {activeTab === "log" && (
        <div className="max-w-3xl mx-auto px-6 py-10 w-full">
          <p className="text-center text-yoake-text-muted py-16 font-serif text-sm">
            ゲームを進めると記録が残ります。
          </p>
        </div>
      )}

      {/* ── 問いの進化ログタブ（将来実装） ── */}
      {activeTab === "chart" && (
        <div className="max-w-3xl mx-auto px-6 py-10 w-full">
          <p className="text-center text-yoake-text-muted py-16 font-serif text-sm">
            問いカードが作られると、ここに進化の記録が残ります。
          </p>
        </div>
      )}
    </main>
  );
}
