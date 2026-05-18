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
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-yoake-bg paper-texture px-4 py-12">
      <div className="w-full max-w-sm">

        {/* ── 探偵手帳風ロゴエリア ── */}
        <div className="text-center mb-10 animate-fade-in">
          {/* 押印風スタンプ */}
          <div className="inline-block mb-6">
            <div
              className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-yoake-accent"
              style={{ boxShadow: "inset 0 0 0 4px #F5EDE0, inset 0 0 0 6px #C9805E" }}
            >
              {/* 灯台シンボル — CSS only */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-px h-5 bg-yoake-accent opacity-90" />
                <div className="w-3 h-3 rounded-full border border-yoake-accent opacity-80" />
                <div className="w-5 h-0.5 bg-yoake-accent opacity-60" />
                <div className="w-7 h-4 border border-yoake-accent bg-transparent" />
              </div>
            </div>
          </div>
          <h1 className="font-ui text-2xl text-yoake-ink tracking-[0.25em]">
            ヨアケ探偵社
          </h1>
          <p className="text-yoake-text-muted mt-2 text-xs tracking-wide font-serif">
            問いを持った者だけが、夜明けを見つけられる
          </p>
        </div>

        {/* ── ポラロイド風カード ── */}
        <div
          className="bg-yoake-bg-card paper-texture animate-fade-in p-8 pb-10"
          style={{
            boxShadow: "3px 3px 0 #C9B99A, 6px 6px 0 rgba(201,185,154,0.3)",
            border: "1px solid #C9B99A",
          }}
        >
          {!sent ? (
            <>
              {/* 手帳の罫線風装飾 */}
              <div className="border-b border-yoake-border mb-5 pb-1">
                <p className="font-ui text-xs text-yoake-text-muted tracking-widest">
                  — 事務所に入所する —
                </p>
              </div>

              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label className="block text-yoake-text-secondary text-xs mb-2 font-serif tracking-wide">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@school.jp"
                    className="w-full bg-yoake-bg border-0 border-b-2 border-yoake-border px-2 py-2 text-yoake-ink placeholder-yoake-text-muted focus:outline-none focus:border-yoake-accent transition-colors text-sm font-serif"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yoake-accent hover:bg-yoake-accent-hover text-yoake-bg font-ui py-3 transition-colors disabled:opacity-40 text-sm tracking-widest"
                  style={{ borderRadius: 0 }}
                >
                  {loading ? "送信中…" : "Magic Link を送る"}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-yoake-border" />
                <span className="text-yoake-text-muted text-xs font-serif">または</span>
                <div className="flex-1 h-px bg-yoake-border" />
              </div>

              <button
                disabled
                className="w-full border border-yoake-border text-yoake-text-muted py-2 text-sm cursor-not-allowed opacity-50 font-serif"
                style={{ borderRadius: 0 }}
              >
                Google アカウントでログイン
                <span className="ml-2 text-xs opacity-60">（工事中）</span>
              </button>

              <div className="mt-6 pt-4 border-t border-yoake-border">
                <p className="text-yoake-text-muted text-xs text-center mb-2 font-serif">
                  開発用バイパス
                </p>
                <button
                  type="button"
                  onClick={loginAsDummy}
                  className="w-full border border-yoake-border text-yoake-text-secondary hover:border-yoake-accent hover:text-yoake-ink py-2 transition-colors text-xs font-serif"
                  style={{ borderRadius: 0 }}
                >
                  → ダッシュボードへ直接入る
                </button>
              </div>
            </>
          ) : (
            <div className="text-center animate-fade-in py-6">
              {/* 封筒風アイコン */}
              <div
                className="w-14 h-10 border-2 border-yoake-accent flex items-center justify-center mx-auto mb-5"
                style={{ borderRadius: 0 }}
              >
                <div className="w-10 h-px bg-yoake-accent" />
              </div>
              <h2 className="font-ui text-yoake-ink text-sm tracking-wider mb-3">
                メールを確認してください
              </h2>
              <p className="text-yoake-text-secondary text-xs leading-relaxed font-serif">
                <span className="text-yoake-accent">{email}</span>
                {" "}にログインリンクを送りました。
              </p>
              <button
                onClick={loginAsDummy}
                className="mt-8 text-yoake-text-muted text-xs underline hover:text-yoake-text-secondary transition-colors font-serif"
              >
                開発用：ダッシュボードへ直接移動
              </button>
            </div>
          )}
        </div>

        {/* クレジット */}
        <p className="text-center text-yoake-text-muted text-xs mt-6 font-serif opacity-50">
          Original concept: LIGHTHOUSE
        </p>
      </div>
    </main>
  );
}
