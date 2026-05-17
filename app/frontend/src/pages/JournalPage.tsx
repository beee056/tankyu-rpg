import { useNavigate } from "react-router-dom";

const mockEntries = [
  {
    scene_id: "ch1_s01",
    prompt: "みのりの本当の問いは何だと思うか？",
    content: "（工事中 — ジャーナル記録がここに表示されます）",
    created_at: "2026-05-18",
    question_card: "友達は私のことを嫌いなの？",
    question_version: 1,
  },
];

export default function JournalPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-lighthouse-bg">
      <header className="border-b border-lighthouse-border px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-lighthouse-text-muted hover:text-lighthouse-text-secondary text-sm transition-colors"
        >
          ← 事務所に戻る
        </button>
        <h1 className="text-lighthouse-text-primary font-semibold">探偵手帳</h1>
        <div />
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-1 bg-lighthouse-bg-card border border-lighthouse-border rounded-lg p-1 mb-8 text-sm">
          {["問いの進化ログ", "ジャーナル全文", "称号・チャート変遷"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-3 rounded-md transition-colors ${
                  i === 0
                    ? "bg-lighthouse-accent text-white"
                    : "text-lighthouse-text-secondary hover:text-lighthouse-text-primary"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Question evolution log */}
        <div className="space-y-4 animate-fade-in">
          {mockEntries.map((entry) => (
            <div
              key={entry.scene_id}
              className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-lighthouse-text-muted">
                  {entry.scene_id}
                </span>
                <span className="text-xs text-lighthouse-text-muted">·</span>
                <span className="text-xs text-lighthouse-text-muted">
                  {entry.created_at}
                </span>
              </div>

              {/* Question card */}
              <div className="bg-lighthouse-question-dim rounded-lg px-4 py-3 mb-4 border border-lighthouse-border">
                <div className="text-xs text-lighthouse-text-muted mb-1">
                  問いカード v{entry.question_version}
                </div>
                <p className="text-lighthouse-text-primary text-sm">
                  {entry.question_card}
                </p>
              </div>

              {/* Journal content */}
              <div>
                <div className="text-xs text-lighthouse-text-muted mb-2">
                  問い：{entry.prompt}
                </div>
                <p className="text-lighthouse-text-secondary text-sm leading-relaxed">
                  {entry.content}
                </p>
              </div>
            </div>
          ))}

          {mockEntries.length === 0 && (
            <p className="text-center text-lighthouse-text-muted py-16">
              まだ記録がありません。ゲームを進めると記録が残ります。
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
