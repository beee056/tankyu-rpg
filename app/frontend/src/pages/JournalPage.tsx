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
        <h1 className="font-ui text-yoake-ink text-sm tracking-widest">探偵手帳</h1>
        <div />
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* タブ */}
        <div
          className="flex gap-1 bg-yoake-bg-card p-1 mb-8 text-sm"
          style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
        >
          {["問いの進化ログ", "ジャーナル全文", "称号・チャート変遷"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-3 transition-colors font-serif text-xs ${
                  i === 0
                    ? "bg-yoake-accent text-yoake-bg"
                    : "text-yoake-text-secondary hover:text-yoake-ink"
                }`}
                style={{ borderRadius: 0 }}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* 問いの進化ログ */}
        <div className="space-y-4 animate-fade-in">
          {mockEntries.map((entry) => (
            <div
              key={entry.scene_id}
              className="bg-yoake-bg-card paper-texture p-5"
              style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-yoake-text-muted font-serif">{entry.scene_id}</span>
                <span className="text-xs text-yoake-text-muted">·</span>
                <span className="text-xs text-yoake-text-muted font-serif">{entry.created_at}</span>
              </div>

              {/* 問いカード */}
              <div
                className="bg-yoake-bg px-4 py-3 mb-4"
                style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
              >
                <div className="text-xs text-yoake-text-muted mb-1 font-serif">
                  問いカード v{entry.question_version}
                </div>
                <p className="text-yoake-ink text-sm font-serif">{entry.question_card}</p>
              </div>

              {/* ジャーナル内容 */}
              <div>
                <div className="text-xs text-yoake-text-muted mb-2 font-serif">
                  問い：{entry.prompt}
                </div>
                <p className="text-yoake-text-secondary text-sm leading-relaxed font-serif">
                  {entry.content}
                </p>
              </div>
            </div>
          ))}

          {mockEntries.length === 0 && (
            <p className="text-center text-yoake-text-muted py-16 font-serif text-sm">
              まだ記録がありません。ゲームを進めると記録が残ります。
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
