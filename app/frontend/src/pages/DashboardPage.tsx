import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "@/stores/playerStore";
import { useGameStore } from "@/stores/gameStore";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const TOTAL_SCENES = 8;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { statusPoints, player, achievements } = usePlayerStore();
  const { currentScene, currentSceneKey, resetProgress } = useGameStore();
  const hasSavedProgress = Boolean(currentSceneKey);

  const radarData = [
    { subject: "問い力",  value: statusPoints?.question_power ?? 0, fullMark: 100 },
    { subject: "探索力",  value: statusPoints?.explore_power  ?? 0, fullMark: 100 },
    { subject: "繋ぐ力",  value: statusPoints?.connect_power  ?? 0, fullMark: 100 },
    { subject: "伝える力",value: statusPoints?.express_power  ?? 0, fullMark: 100 },
  ];

  const progressPct = Math.round(((currentScene - 1) / TOTAL_SCENES) * 100);

  return (
    <main className="min-h-screen bg-yoake-bg paper-texture">

      {/* ── ヘッダー — 手帳の表紙風 ── */}
      <header
        className="border-b border-yoake-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-yoake-bg-card"
        style={{ boxShadow: "0 1px 0 #C9B99A" }}
      >
        <span className="font-ui text-yoake-ink tracking-[0.2em] sm:tracking-[0.25em] text-sm">
          ヨアケ探偵社
        </span>
        <nav className="flex gap-3 sm:gap-5">
          <button
            onClick={() => navigate("/journal")}
            className="text-yoake-text-secondary hover:text-yoake-ink text-xs transition-colors font-serif"
          >
            ジャーナル
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="text-yoake-text-secondary hover:text-yoake-ink text-xs transition-colors font-serif"
          >
            プロフィール
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-yoake-text-muted hover:text-yoake-text-secondary text-xs transition-colors font-serif"
          >
            ログアウト
          </button>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ── 見出し ── */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <p className="text-yoake-text-muted text-xs tracking-widest mb-1 font-serif">
            ヨアケ探偵社
          </p>
          <h2 className="font-ui text-yoake-ink text-xl sm:text-2xl">
            {player?.display_name
              ? `${player.display_name}の事務所`
              : "事務所マップ"}
          </h2>
        </div>

        {/* ── モバイル: 縦積み / PC: 3カラムグリッド ── */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-5 sm:gap-6 animate-slide-up">

          {/* ── 左: コルクボード風マップ + 章カード ── */}
          <div className="md:col-span-2 space-y-4 sm:space-y-5">

            {/* 事務所マップ — コルクボード風 */}
            <div
              className="bg-yoake-bg-surface paper-texture p-4 sm:p-5"
              style={{
                border: "2px solid #C9B99A",
                boxShadow: "inset 0 0 30px rgba(201,128,94,0.08), 2px 2px 0 #C9B99A",
              }}
            >
              <p className="font-ui text-yoake-text-muted text-xs mb-3 sm:mb-4 tracking-widest">
                1F 見取り図
              </p>
              {/* コルクボード風グリッドマップ — 縦長に変更（スマホで見切れない） */}
              <div
                className="relative w-full"
                style={{
                  aspectRatio: "16/9",
                  background: "#DBC99A",
                  border: "1px solid #C9B99A",
                  backgroundImage: "radial-gradient(circle, rgba(180,140,80,0.15) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              >
                {/* 来客スペース — 付箋風 */}
                <div
                  className="absolute top-2 left-2 bg-yoake-bg px-2 py-1 text-yoake-ink text-xs font-serif"
                  style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.2)", transform: "rotate(-1deg)" }}
                >
                  来客スペース
                </div>
                {/* 調査室 */}
                <div
                  className="absolute bottom-2 left-2 bg-yoake-bg px-2 py-1 text-yoake-ink text-xs font-serif"
                  style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.2)", transform: "rotate(0.5deg)" }}
                >
                  調査室
                </div>
                {/* コルクボード */}
                <div
                  className="absolute bottom-2 right-14 w-14 h-10 flex items-center justify-center text-yoake-ink text-xs font-serif"
                  style={{
                    background: "#E8C97A",
                    border: "1px dashed #B8944A",
                    transform: "rotate(-0.5deg)",
                  }}
                >
                  板
                </div>
                {/* 2F */}
                <div
                  className="absolute top-2 right-2 bg-yoake-bg px-2 py-1 text-yoake-text-muted text-xs font-serif opacity-60"
                  style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.15)" }}
                >
                  2F ↑
                </div>
                {/* 入口マーカー */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-8 bg-yoake-accent opacity-70" />
                <div
                  className="absolute top-1/2 left-2 -translate-y-1/2 text-yoake-text-muted text-xs opacity-50 font-serif"
                  style={{ writingMode: "vertical-rl" }}
                >
                  入口
                </div>
              </div>
            </div>

            {/* ── 章選択カード — 手帳ページ風 ── */}
            <div
              className="bg-yoake-bg-card paper-texture p-4 sm:p-5"
              style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A" }}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                {/* 章番号 — スタンプ風 */}
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 border-2 border-yoake-accent"
                  style={{ borderRadius: 0 }}
                >
                  <span className="font-ui text-yoake-accent text-sm">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-yoake-text-muted mb-1 font-serif tracking-wide">
                    第1章 · 依頼A
                  </div>
                  <h3 className="font-ui text-yoake-ink text-sm mb-1">
                    SNSの向こう側
                  </h3>
                  <p className="text-yoake-text-secondary text-xs leading-relaxed mb-3 font-serif">
                    「最近、友達のSNSの投稿が気になって。私のことかな、って思って……」
                  </p>
                  {/* 進捗バー */}
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-yoake-bg-surface overflow-hidden" style={{ borderRadius: 0 }}>
                      <div
                        className="h-full bg-yoake-accent transition-all"
                        style={{ width: `${progressPct}%`, borderRadius: 0 }}
                      />
                    </div>
                    <span className="text-xs text-yoake-text-muted flex-shrink-0 font-serif">
                      コマ {Math.max(1, currentScene - 1)} / {TOTAL_SCENES}
                    </span>
                  </div>
                </div>
              </div>
              {/* ── ナビゲーションボタン ── */}
              <div className="flex flex-col gap-2">
                {hasSavedProgress && (
                  <button
                    onClick={() => navigate("/play", { state: { resume: true } })}
                    className="w-full bg-yoake-accent hover:bg-yoake-accent-hover text-yoake-bg text-sm px-4 py-2.5 transition-colors font-ui tracking-widest"
                    style={{ borderRadius: 0 }}
                  >
                    前回の続きから →
                  </button>
                )}
                <button
                  onClick={() => navigate("/play/chapter/1/scene/1")}
                  className="w-full text-yoake-text-secondary hover:text-yoake-ink text-xs px-4 py-2 transition-colors font-serif"
                  style={{ border: "1px solid rgba(201,185,154,0.4)", borderRadius: 0 }}
                >
                  最初から始める
                </button>
              </div>
            </div>

            {/* ── ジャーナル + 開発者リセット ── */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/journal")}
                className="w-full text-left bg-yoake-bg-card paper-texture p-4 transition-all group"
                style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9805E";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9B99A";
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yoake-text-muted text-xs mb-1 font-serif">内省ジャーナル</p>
                    <p className="text-yoake-text-secondary text-sm group-hover:text-yoake-ink transition-colors font-serif">
                      内省ジャーナルを修正する →
                    </p>
                  </div>
                </div>
              </button>
              {/* 開発者用リセット */}
              <button
                onClick={() => {
                  if (window.confirm("進捗をリセットしますか？（開発者用）")) {
                    resetProgress();
                  }
                }}
                className="w-full text-yoake-text-muted hover:text-rose-400 text-xs px-4 py-2 transition-colors font-serif text-right opacity-40 hover:opacity-100"
                style={{ borderRadius: 0 }}
              >
                [dev] 進捗をリセット
              </button>
            </div>
          </div>

          {/* ── 右: レーダーチャート + 称号 ── */}
          <div className="space-y-4 sm:space-y-5">

            {/* 探究力レーダーチャート */}
            <div
              className="bg-yoake-bg-card paper-texture p-4 sm:p-5"
              style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
            >
              <p className="font-ui text-yoake-text-muted text-xs mb-3 tracking-widest">
                探究力
              </p>
              {/* レーダーチャート: スマホでは画面幅100%で高さを調整 */}
              <div className="w-full" style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="65%">
                    <PolarGrid stroke="#C9B99A" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#8B9DAE", fontSize: 10, fontFamily: "'Noto Serif JP'" }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="#C9805E"
                      fill="#C9805E"
                      fillOpacity={0.2}
                      strokeWidth={1.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
                {radarData.map((d) => (
                  <div key={d.subject} className="flex items-center gap-1.5">
                    <span className="text-yoake-text-muted text-xs font-serif">{d.subject}</span>
                    <span className="text-yoake-accent text-xs font-mono">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 称号エリア */}
            <div
              className="bg-yoake-bg-card paper-texture p-4 sm:p-5"
              style={{ border: "2px solid #C9B99A", boxShadow: "2px 2px 0 #C9B99A", borderRadius: 0 }}
            >
              <p className="font-ui text-yoake-text-muted text-xs mb-3 tracking-widest">
                称号
              </p>
              {achievements.length === 0 ? (
                <p className="text-yoake-text-muted text-xs text-center py-4 opacity-50 font-serif">
                  — まだ称号はありません —
                </p>
              ) : (
                <div className="space-y-2">
                  {achievements.map((a) => (
                    <div
                      key={a.achievement_id}
                      className="text-yoake-accent text-xs px-2 py-1 font-serif"
                      style={{ border: "1px solid rgba(201,128,94,0.4)", borderRadius: 0 }}
                    >
                      {a.title_key}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
