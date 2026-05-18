import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/stores/playerStore";

const TITLE_LABELS: Record<string, string> = {
  QUESTION_SCULPTOR: "問いの彫刻家",
  MAP_MAKER: "地図を作る者",
  THREAD_PULLER: "糸を手繰る者",
  WORD_PICKER: "言葉を選ぶ者",
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { player, statusPoints, achievements } = usePlayerStore();

  const axes = [
    { label: "問い力",  key: "question_power", color: "bg-yoake-accent" },
    { label: "探索力",  key: "explore_power",  color: "bg-yoake-warm" },
    { label: "繋ぐ力",  key: "connect_power",  color: "bg-yoake-moss" },
    { label: "伝える力",key: "express_power",  color: "bg-yoake-text-muted" },
  ] as const;

  return (
    <main className="min-h-screen bg-yoake-bg paper-texture">
      <header
        className="border-b border-yoake-border px-6 py-4 flex items-center justify-between bg-yoake-bg-card"
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="text-yoake-text-muted hover:text-yoake-text-secondary text-sm transition-colors font-serif"
        >
          ← 事務所に戻る
        </button>
        <h1 className="font-ui text-yoake-ink text-sm tracking-widest">探偵プロフィール</h1>
        <div />
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6 animate-fade-in">
        {/* プレイヤー情報 */}
        <div
          className="bg-yoake-bg-card paper-texture p-6"
          style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 bg-yoake-bg-surface border-2 border-yoake-warm flex items-center justify-center text-2xl"
              style={{ borderRadius: 0 }}
            >
              🕵
            </div>
            <div>
              <h2 className="font-ui text-yoake-ink text-lg">
                {player?.display_name ?? "見習い探偵"}
              </h2>
              <p className="text-yoake-text-secondary text-xs mt-1 font-serif">
                ヨアケ探偵社 · 見習い
              </p>
            </div>
          </div>
        </div>

        {/* 探究スタイル */}
        <div
          className="bg-yoake-bg-card paper-texture p-6"
          style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
        >
          <h3 className="font-ui text-yoake-text-muted text-xs mb-4 tracking-widest">探究スタイル</h3>
          <div
            className="h-40 flex items-center justify-center bg-yoake-bg-surface text-yoake-text-muted text-xs mb-6 font-serif"
            style={{ border: "1px dashed #C9B99A", borderRadius: 0 }}
          >
            [レーダーチャート — Recharts で実装予定]
          </div>

          <div className="space-y-3">
            {axes.map(({ label, key, color }) => {
              const val = statusPoints?.[key] ?? 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-yoake-text-secondary font-serif">{label}</span>
                    <span className="text-yoake-text-muted font-mono">{val}/100</span>
                  </div>
                  <div className="h-1.5 bg-yoake-bg-surface overflow-hidden" style={{ borderRadius: 0 }}>
                    <div
                      className={`h-full ${color} transition-all duration-700`}
                      style={{ width: `${val}%`, borderRadius: 0 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 獲得称号 */}
        <div
          className="bg-yoake-bg-card paper-texture p-6"
          style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
        >
          <h3 className="font-ui text-yoake-text-muted text-xs mb-4 tracking-widest">獲得称号</h3>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.achievement_id}
                  className="bg-yoake-bg-surface px-4 py-3"
                  style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
                >
                  <p className="text-yoake-warm text-sm font-ui">
                    {TITLE_LABELS[a.title_key] ?? a.title_key}
                  </p>
                  <p className="text-yoake-text-muted text-xs mt-1 font-serif">
                    {new Date(a.achieved_at).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-yoake-text-muted text-sm text-center py-6 font-serif opacity-60">
              ゲームを進めると称号が解放されます
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
