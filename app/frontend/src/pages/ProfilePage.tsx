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
    { label: "問い力", key: "question_power", color: "bg-lighthouse-accent" },
    { label: "探索力", key: "explore_power", color: "bg-lighthouse-gold" },
    { label: "繋ぐ力", key: "connect_power", color: "bg-green-600" },
    { label: "伝える力", key: "express_power", color: "bg-purple-600" },
  ] as const;

  return (
    <main className="min-h-screen bg-lighthouse-bg">
      <header className="border-b border-lighthouse-border px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-lighthouse-text-muted hover:text-lighthouse-text-secondary text-sm transition-colors"
        >
          ← 事務所に戻る
        </button>
        <h1 className="text-lighthouse-text-primary font-semibold">
          探偵プロフィール
        </h1>
        <div />
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8 animate-fade-in">
        {/* Player info */}
        <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-lighthouse-bg-surface border-2 border-lighthouse-gold flex items-center justify-center text-2xl">
              🕵
            </div>
            <div>
              <h2 className="text-lighthouse-text-primary font-bold text-xl">
                {player?.display_name ?? "見習い探偵"}
              </h2>
              <p className="text-lighthouse-text-secondary text-sm mt-1">
                灯台探偵事務所 · 見習い
              </p>
            </div>
          </div>
        </div>

        {/* Radar chart placeholder */}
        <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-6">
          <h3 className="text-lighthouse-text-primary font-semibold mb-4">
            探究スタイル
          </h3>
          <div className="h-48 flex items-center justify-center border border-lighthouse-border rounded-lg bg-lighthouse-bg-surface text-lighthouse-text-muted text-sm mb-6">
            [レーダーチャート — Recharts で実装予定]
          </div>

          {/* Bar charts */}
          <div className="space-y-3">
            {axes.map(({ label, key, color }) => {
              const val = statusPoints?.[key] ?? 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-lighthouse-text-secondary">{label}</span>
                    <span className="text-lighthouse-text-muted">{val}/100</span>
                  </div>
                  <div className="h-2 bg-lighthouse-bg-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-700`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-6">
          <h3 className="text-lighthouse-text-primary font-semibold mb-4">
            獲得称号
          </h3>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.achievement_id}
                  className="bg-lighthouse-bg-surface border border-lighthouse-border rounded-lg px-4 py-3"
                >
                  <p className="text-lighthouse-gold text-sm font-semibold">
                    {TITLE_LABELS[a.title_key] ?? a.title_key}
                  </p>
                  <p className="text-lighthouse-text-muted text-xs mt-1">
                    {new Date(a.achieved_at).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lighthouse-text-muted text-sm text-center py-6">
              ゲームを進めると称号が解放されます
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
