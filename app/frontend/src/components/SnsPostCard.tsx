import type { SnsPostData } from "shared-types";
import { renderWithHighlights } from "@/components/HighlightSpan";

interface SnsPostCardProps {
  data: SnsPostData;
}

export function SnsPostCard({ data }: SnsPostCardProps) {
  const { username, timestamp, body, highlights } = data;

  // SNS投稿は全文即時表示（タイプライター不要）
  const nodes = renderWithHighlights(body, highlights, body.length);

  return (
    // 半透明暗色オーバーレイで本編と区別
    <div
      className="fixed inset-0 z-30 flex items-center justify-center"
      style={{ background: "rgba(8, 8, 20, 0.72)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* カード本体 */}
      <div
        className="relative w-full max-w-[360px] mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          border: "1.5px solid transparent",
          backgroundClip: "padding-box",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(193,130,94,0.35)",
        }}
      >
        {/* グラデ枠線エフェクト（疑似ボーダー） */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(193,130,94,0.4) 0%, rgba(100,120,180,0.2) 50%, rgba(193,130,94,0.15) 100%)",
            zIndex: 0,
            opacity: 0.6,
          }}
        />

        <div className="relative z-10 px-5 pt-4 pb-5">
          {/* ヘッダー */}
          <div className="flex items-center gap-3 mb-3">
            {/* ダミーアバター */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {username.charAt(0)}
            </div>

            <div className="flex flex-col">
              <span
                className="font-bold text-sm leading-tight"
                style={{ color: "#e8d5c4" }}
              >
                {username}
              </span>
              <span
                className="text-xs mt-0.5"
                style={{ color: "#7a8fa6" }}
              >
                {timestamp}
              </span>
            </div>

            {/* 右上の「…」メニュー（装飾のみ） */}
            <div className="ml-auto" style={{ color: "#7a8fa6", fontSize: "20px", lineHeight: 1 }}>
              ···
            </div>
          </div>

          {/* 本文 */}
          <div
            className="text-base leading-relaxed whitespace-pre-wrap mb-4"
            style={{ color: "#d4c5b8", letterSpacing: "0.01em" }}
          >
            {nodes}
          </div>

          {/* 区切り線 */}
          <div
            className="mb-3"
            style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
          />

          {/* フッター: 偽SNS UI */}
          <div
            className="flex items-center gap-5 text-sm"
            style={{ color: "#5a6e80" }}
          >
            <span className="flex items-center gap-1.5">
              <span style={{ fontSize: "15px" }}>♥</span>
              <span>0</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span style={{ fontSize: "15px" }}>💬</span>
              <span>0</span>
            </span>
            <span className="flex items-center gap-1.5 ml-auto">
              <span style={{ fontSize: "14px" }}>↗</span>
            </span>
          </div>

          {/* ハイライト収集ヒント */}
          {highlights && highlights.length > 0 && (
            <div
              className="mt-3 text-xs text-center"
              style={{ color: "#C9805E", opacity: 0.8 }}
            >
              気になる言葉をタップしよう
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
