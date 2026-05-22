import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/stores/gameStore";
import { useState } from "react";
import OfficeMapHotspot from "@/components/OfficeMapHotspot";
import EvidenceBoardModal from "@/components/EvidenceBoardModal";

const TOTAL_SCENES = 8;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentScene, currentSceneKey, resetProgress } = useGameStore();
  const hasSavedProgress = Boolean(currentSceneKey);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const progressPct = Math.round(((currentScene - 1) / TOTAL_SCENES) * 100);

  const handleEntranceClick = () => {
    if (hasSavedProgress) {
      navigate("/play", { state: { resume: true } });
    } else {
      navigate("/play");
    }
  };

  const handleResearchClick = () => {
    setEvidenceOpen(true);
  };

  return (
    <main className="min-h-screen bg-yoake-bg paper-texture">

      {/* ── ヘッダー ── */}
      <header
        className="border-b border-yoake-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-yoake-bg-card"
        style={{ boxShadow: "0 1px 0 #C9B99A" }}
      >
        <span className="font-ui text-yoake-ink tracking-[0.2em] sm:tracking-[0.25em] text-sm">
          ヨアケ探偵社
        </span>
        <nav className="flex gap-3 sm:gap-5">
          <button
            onClick={() => navigate("/login")}
            className="text-yoake-text-muted hover:text-yoake-text-secondary text-xs transition-colors font-serif"
          >
            ログアウト
          </button>
        </nav>
      </header>

      {/* ── メインコンテンツ ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* 見出し（小さく） */}
        <div className="mb-4 animate-fade-in">
          <p className="text-yoake-text-muted text-xs tracking-widest font-serif">
            ヨアケ探偵社
          </p>
        </div>

        {/* ── 9:3 グリッド（PC） / 縦積み（モバイル） ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6">

          {/* ── 左：事務所マップ（9カラム） ── */}
          <div className="lg:col-span-9 animate-fade-in">

            {/* マップビジュアル */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                border: "2px solid #C9B99A",
                boxShadow: "2px 2px 0 #C9B99A",
              }}
            >
              {/* 16:9 アスペクト比コンテナ */}
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                {/* 背景画像 */}
                <img
                  src="/assets/dashboard/bg_office_map.png"
                  alt="ヨアケ探偵社 事務所マップ"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* 画像フォールバック背景（画像なし時に見える） */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: "#DBC99A",
                    backgroundImage: "radial-gradient(circle, rgba(180,140,80,0.18) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-yoake-text-muted text-sm font-serif opacity-60">
                      事務所マップ
                    </span>
                  </div>
                </div>

                {/* ── ホットスポット2つ ── */}
                {/* 入口: 左下 (12%, 78%) */}
                <OfficeMapHotspot
                  left="12%"
                  top="78%"
                  label="入口"
                  ariaLabel="入口（プレイ開始）"
                  onClick={handleEntranceClick}
                />
                {/* 調査室: 右下 (80%, 80%) */}
                <OfficeMapHotspot
                  left="80%"
                  top="80%"
                  label="調査室"
                  ariaLabel="調査室（証拠ボード）"
                  onClick={handleResearchClick}
                />
              </div>
            </div>

            {/* ── 「前回の続きから」大ボタン ── */}
            <div className="mt-4 flex flex-col gap-2 animate-slide-up">
              <button
                onClick={handleEntranceClick}
                className="w-full text-yoake-bg text-base px-6 font-ui tracking-widest transition-all duration-200 hover:bg-yoake-accent-hover"
                style={{
                  height: 64,
                  background: "var(--color-yoake-accent, #C9805E)",
                  borderRadius: 0,
                  boxShadow: "2px 2px 0 #B56B49",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateX(4px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #B56B49";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #B56B49";
                }}
              >
                {hasSavedProgress ? "前回の続きから →" : "物語をはじめる →"}
              </button>
              {hasSavedProgress && (
                <button
                  onClick={() => navigate("/play")}
                  className="w-full text-yoake-text-secondary hover:text-yoake-ink text-xs px-4 py-2 transition-colors font-serif"
                  style={{ border: "1px solid rgba(201,185,154,0.4)", borderRadius: 0 }}
                >
                  最初から始める
                </button>
              )}
            </div>

            {/* [dev] 進捗リセット */}
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm("進捗をリセットしますか？（開発者用）")) {
                    resetProgress();
                  }
                }}
                className="text-yoake-text-muted hover:text-rose-400 text-xs px-2 py-1 transition-colors font-serif opacity-40 hover:opacity-100"
              >
                [dev] 進捗をリセット
              </button>
            </div>
          </div>

          {/* ── 右：進捗ミニカード（3カラム） ── */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-4 animate-slide-up">

            {/* 進捗ミニカード */}
            <div
              className="flex-1 lg:flex-none bg-yoake-bg-card paper-texture p-3 sm:p-4"
              style={{ border: "1px solid #C9B99A", borderRadius: 0 }}
            >
              <p className="font-ui text-yoake-text-muted text-xs tracking-widest mb-2">
                進捗
              </p>
              <p className="text-yoake-ink text-xs font-serif mb-1">第1章 SNSの向こう側</p>
              <div className="h-px bg-yoake-border mb-2" />
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-1.5 flex-1 bg-yoake-bg-surface overflow-hidden">
                  <div
                    className="h-full bg-yoake-accent transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-yoake-text-muted text-xs font-mono shrink-0">
                  {Math.max(1, currentScene - 1)}/{TOTAL_SCENES}
                </span>
              </div>
              <p className="text-yoake-text-muted text-xs font-serif text-right">
                {progressPct}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 証拠ボードモーダル */}
      <EvidenceBoardModal isOpen={evidenceOpen} onClose={() => setEvidenceOpen(false)} />
    </main>
  );
}
