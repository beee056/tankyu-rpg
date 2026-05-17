import { useNavigate } from "react-router-dom";

export default function TeacherPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-lighthouse-bg">
      <header className="border-b border-lighthouse-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-lighthouse-gold font-bold tracking-widest">
          LIGHTHOUSE — 教員ダッシュボード
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="text-lighthouse-text-muted hover:text-lighthouse-text-secondary text-sm transition-colors"
        >
          ログアウト
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 animate-fade-in">
        {/* Under construction banner */}
        <div className="bg-lighthouse-bg-card border border-yellow-700/40 rounded-xl p-6 text-center">
          <p className="text-yellow-400 font-semibold">工事中</p>
          <p className="text-lighthouse-text-secondary text-sm mt-2">
            教員ダッシュボードは実装中です。Phase 4 で完成予定。
          </p>
        </div>

        {/* Class summary placeholder */}
        <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-6">
          <h2 className="text-lighthouse-text-primary font-semibold mb-6">
            クラス全体の探究傾向
          </h2>
          <div className="h-48 flex items-center justify-center border border-lighthouse-border rounded-lg bg-lighthouse-bg-surface text-lighthouse-text-muted text-sm">
            [クラス集計レーダーチャート — 工事中]
          </div>
        </div>

        {/* Student list placeholder */}
        <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-6">
          <h2 className="text-lighthouse-text-primary font-semibold mb-4">
            生徒一覧
          </h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-lighthouse-bg-surface border border-lighthouse-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-lighthouse-bg-card border border-lighthouse-border flex items-center justify-center text-xs text-lighthouse-text-muted">
                    {i}
                  </div>
                  <span className="text-lighthouse-text-secondary text-sm">
                    生徒{i}（匿名）
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-lighthouse-text-muted">第1章 コマ{i}/8</span>
                  <button className="text-xs text-lighthouse-accent hover:underline">
                    詳細
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
