import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/stores/playerStore";

const DUMMY_PLAYER = {
  player_id: "dev-player-001",
  display_name: null,
  grade: "high2" as const,
  join_motivation: "fun" as const,
  character_type: "default" as const,
  class_id: null,
  created_at: new Date().toISOString(),
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setPlayer } = usePlayerStore();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function loginAsDummy() {
    setPlayer(DUMMY_PLAYER);
    navigate("/dashboard");
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock: 実際のAPI呼び出しは後フェーズで接続
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-lighthouse-bg px-4">
      <div className="w-full max-w-sm">
        {/* Logo area */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {/* Lighthouse icon – CSS only, no emoji */}
            <div className="inline-flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-lighthouse-gold opacity-70" />
              <div className="w-4 h-4 rounded-full border border-lighthouse-gold opacity-80" />
              <div className="w-6 h-1 bg-lighthouse-gold opacity-40" />
              <div className="w-8 h-6 border border-lighthouse-border bg-lighthouse-bg-card" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-lighthouse-text-primary tracking-[0.2em]">
            LIGHTHOUSE
          </h1>
          <p className="text-lighthouse-text-muted mt-3 text-xs tracking-wide">
            問いを持った者だけが、灯台を見つけられる
          </p>
        </div>

        {/* Login form */}
        <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-2xl p-8 animate-fade-in">
          {!sent ? (
            <>
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-lighthouse-text-secondary text-xs mb-2 tracking-wide">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@school.jp"
                    className="w-full bg-lighthouse-bg-surface border border-lighthouse-border rounded-lg px-4 py-3 text-lighthouse-text-primary placeholder-lighthouse-text-muted focus:outline-none focus:border-lighthouse-accent transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-lighthouse-accent hover:bg-lighthouse-accent-hover text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-40 text-sm tracking-wide"
                >
                  {loading ? "送信中…" : "Magic Link を送る"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-lighthouse-border" />
                <span className="text-lighthouse-text-muted text-xs">または</span>
                <div className="flex-1 h-px bg-lighthouse-border" />
              </div>

              <button
                disabled
                className="w-full border border-lighthouse-border text-lighthouse-text-muted py-3 rounded-lg text-sm cursor-not-allowed opacity-50"
              >
                Google アカウントでログイン
                <span className="ml-2 text-xs opacity-60">（工事中）</span>
              </button>

              <div className="mt-6 pt-5 border-t border-lighthouse-border">
                <p className="text-lighthouse-text-muted text-xs text-center mb-3">
                  開発用バイパス
                </p>
                <button
                  type="button"
                  onClick={loginAsDummy}
                  className="w-full border border-lighthouse-border text-lighthouse-text-secondary hover:border-lighthouse-accent hover:text-lighthouse-text-primary py-2 rounded-lg transition-colors text-xs"
                >
                  → ダッシュボードへ直接入る
                </button>
              </div>
            </>
          ) : (
            <div className="text-center animate-fade-in py-4">
              <div className="w-12 h-12 rounded-full border border-lighthouse-gold flex items-center justify-center mx-auto mb-5">
                <div className="w-6 h-px bg-lighthouse-gold" />
              </div>
              <h2 className="text-lighthouse-text-primary font-semibold mb-2 text-sm">
                メールを確認してください
              </h2>
              <p className="text-lighthouse-text-secondary text-xs leading-relaxed">
                <span className="text-lighthouse-accent">{email}</span>
                {" "}にログインリンクを送りました。
              </p>
              <button
                onClick={loginAsDummy}
                className="mt-8 text-lighthouse-text-muted text-xs underline hover:text-lighthouse-text-secondary transition-colors"
              >
                開発用：ダッシュボードへ直接移動
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
