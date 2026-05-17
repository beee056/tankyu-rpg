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

const TOTAL_SCENES = 8; // コマ1〜8

export default function DashboardPage() {
  const navigate = useNavigate();
  const { statusPoints, player, achievements } = usePlayerStore();
  const { currentScene } = useGameStore();

  const radarData = [
    { subject: "問い力", value: statusPoints?.question_power ?? 0, fullMark: 100 },
    { subject: "探索力", value: statusPoints?.explore_power ?? 0, fullMark: 100 },
    { subject: "繋ぐ力", value: statusPoints?.connect_power ?? 0, fullMark: 100 },
    { subject: "伝える力", value: statusPoints?.express_power ?? 0, fullMark: 100 },
  ];

  const progressPct = Math.round(((currentScene - 1) / TOTAL_SCENES) * 100);

  return (
    <main className="min-h-screen bg-lighthouse-bg">
      {/* ── Header ── */}
      <header className="border-b border-lighthouse-border px-6 py-4 flex items-center justify-between">
        <span className="text-lighthouse-gold font-bold tracking-[0.2em] text-sm">
          LIGHTHOUSE
        </span>
        <nav className="flex gap-5">
          <button
            onClick={() => navigate("/journal")}
            className="text-lighthouse-text-secondary hover:text-lighthouse-text-primary text-xs transition-colors"
          >
            ジャーナル
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="text-lighthouse-text-secondary hover:text-lighthouse-text-primary text-xs transition-colors"
          >
            プロフィール
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-lighthouse-text-muted hover:text-lighthouse-text-secondary text-xs transition-colors"
          >
            ログアウト
          </button>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* ── 探偵事務所マップ見出し ── */}
        <div className="mb-10 animate-fade-in">
          <p className="text-lighthouse-text-muted text-xs tracking-wide mb-1">
            LIGHTHOUSE 探偵事務所
          </p>
          <h2 className="text-lighthouse-text-primary text-xl font-semibold">
            {player?.display_name
              ? `${player.display_name}の事務所`
              : "事務所マップ"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          {/* ── 左: 事務所フロアマップ（CSS簡易版） ── */}
          <div className="md:col-span-2 space-y-5">
            {/* 事務所マップ */}
            <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-2xl p-5">
              <p className="text-lighthouse-text-muted text-xs mb-4 tracking-wide">
                LIGHTHOUSE 1F — 見取り図
              </p>
              <div
                className="relative w-full border border-lighthouse-border rounded-lg bg-lighthouse-bg-surface"
                style={{ aspectRatio: "16/7" }}
              >
                {/* 来客スペース */}
                <div className="absolute top-2 left-2 border border-lighthouse-border rounded px-2 py-1 text-lighthouse-text-muted text-xs">
                  来客スペース
                </div>
                {/* 調査室 */}
                <div className="absolute bottom-2 left-2 border border-lighthouse-border rounded px-2 py-1 text-lighthouse-text-muted text-xs">
                  調査室
                </div>
                {/* コルクボード */}
                <div className="absolute bottom-2 right-16 w-12 h-10 border border-lighthouse-gold opacity-40 rounded flex items-center justify-center">
                  <span className="text-lighthouse-gold text-xs">板</span>
                </div>
                {/* 2Fへ */}
                <div className="absolute top-2 right-2 border border-lighthouse-border rounded px-2 py-1 text-lighthouse-text-muted text-xs opacity-50">
                  2F ↑
                </div>
                {/* 入口 */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-px w-px h-8 bg-lighthouse-accent opacity-60" />
                <div className="absolute top-1/2 left-1 -translate-y-1/2 text-lighthouse-text-muted text-xs opacity-50">
                  入口
                </div>
              </div>
            </div>

            {/* ── 章選択カード ── */}
            <div
              onClick={() =>
                navigate("/play/chapter/1/scene/1")
              }
              className="bg-lighthouse-bg-card border border-lighthouse-border rounded-2xl p-5 cursor-pointer hover:border-lighthouse-accent transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lighthouse-bg-surface flex items-center justify-center flex-shrink-0 border border-lighthouse-border group-hover:border-lighthouse-accent transition-colors">
                  <span className="text-lighthouse-gold text-sm font-bold">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-lighthouse-text-muted mb-1">
                    第1章 · 依頼A
                  </div>
                  <h3 className="text-lighthouse-text-primary font-semibold text-sm mb-1">
                    SNSの向こう側
                  </h3>
                  <p className="text-lighthouse-text-secondary text-xs leading-relaxed mb-3">
                    「最近、友達のSNSの投稿が気になって。私のことかな、って思って……」
                  </p>
                  {/* 進捗バー */}
                  <div className="flex items-center gap-2">
                    <div className="h-0.5 flex-1 bg-lighthouse-bg-surface rounded-full overflow-hidden">
                      <div
                        className="h-full bg-lighthouse-accent rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-lighthouse-text-muted flex-shrink-0">
                      コマ {Math.max(1, currentScene - 1)} / {TOTAL_SCENES}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── ジャーナルへのリンク ── */}
            <button
              onClick={() => navigate("/journal")}
              className="w-full text-left bg-lighthouse-bg-card border border-lighthouse-border hover:border-lighthouse-accent rounded-2xl p-4 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lighthouse-text-muted text-xs mb-1">内省ジャーナル</p>
                  <p className="text-lighthouse-text-secondary text-sm group-hover:text-lighthouse-text-primary transition-colors">
                    記録を見返す →
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* ── 右: レーダーチャート + 称号 ── */}
          <div className="space-y-5">
            {/* 探究力レーダーチャート */}
            <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-2xl p-5">
              <p className="text-lighthouse-text-muted text-xs mb-3 tracking-wide">
                探究力
              </p>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="65%">
                    <PolarGrid stroke="#2d3a5a" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#5a6480", fontSize: 10 }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="#4a7cdc"
                      fill="#4a7cdc"
                      fillOpacity={0.15}
                      strokeWidth={1.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
                {radarData.map((d) => (
                  <div key={d.subject} className="flex items-center gap-1.5">
                    <span className="text-lighthouse-text-muted text-xs">{d.subject}</span>
                    <span className="text-lighthouse-accent text-xs font-mono">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 称号エリア */}
            <div className="bg-lighthouse-bg-card border border-lighthouse-border rounded-2xl p-5">
              <p className="text-lighthouse-text-muted text-xs mb-3 tracking-wide">
                称号
              </p>
              {achievements.length === 0 ? (
                <p className="text-lighthouse-text-muted text-xs text-center py-4 opacity-50">
                  — まだ称号はありません —
                </p>
              ) : (
                <div className="space-y-2">
                  {achievements.map((a) => (
                    <div
                      key={a.achievement_id}
                      className="text-lighthouse-gold text-xs border border-lighthouse-gold border-opacity-30 rounded px-2 py-1"
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
