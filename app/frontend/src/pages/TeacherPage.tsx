import { useNavigate } from "react-router-dom";

export default function TeacherPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-yoake-bg paper-texture">
      <header
        className="border-b border-yoake-border px-6 py-4 flex items-center justify-between bg-yoake-bg-card"
      >
        <span className="font-ui text-yoake-warm text-sm tracking-widest">
          ヨアケ探偵社 — 教員ダッシュボード
        </span>
        <button
          onClick={() => navigate("/login")}
          className="text-yoake-text-muted hover:text-yoake-text-secondary text-sm transition-colors font-serif"
        >
          ログアウト
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6 animate-fade-in">
        {/* 工事中バナー */}
        <div
          className="bg-yoake-bg-card p-6 text-center"
          style={{ border: "1px solid rgba(180,140,80,0.5)", borderRadius: 0 }}
        >
          <p className="text-yoake-warm font-ui text-sm">工事中</p>
          <p className="text-yoake-text-secondary text-xs mt-2 font-serif">
            教員ダッシュボードは実装中です。Phase 4 で完成予定。
          </p>
        </div>

        {/* クラス全体 */}
        <div
          className="bg-yoake-bg-card paper-texture p-6"
          style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
        >
          <h2 className="font-ui text-yoake-text-muted text-xs mb-6 tracking-widest">
            クラス全体の探究傾向
          </h2>
          <div
            className="h-48 flex items-center justify-center bg-yoake-bg-surface text-yoake-text-muted text-xs font-serif"
            style={{ border: "1px dashed #C9B99A", borderRadius: 0 }}
          >
            [クラス集計レーダーチャート — 工事中]
          </div>
        </div>

        {/* 生徒一覧 */}
        <div
          className="bg-yoake-bg-card paper-texture p-6"
          style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
        >
          <h2 className="font-ui text-yoake-text-muted text-xs mb-4 tracking-widest">生徒一覧</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-yoake-bg-surface"
                style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 bg-yoake-bg-card flex items-center justify-center text-xs text-yoake-text-muted"
                    style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
                  >
                    {i}
                  </div>
                  <span className="text-yoake-text-secondary text-sm font-serif">
                    生徒{i}（匿名）
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-yoake-text-muted font-serif">第1章 コマ{i}/8</span>
                  <button className="text-xs text-yoake-accent hover:underline font-serif">
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
