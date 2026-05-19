import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CH1_ENDINGS } from "../scenarios/ch1/endings";
import { useEvidenceStore } from "../stores/evidenceStore";

// ─── Character display names ───────────────────────────────────────────────
const CHARACTER_NAMES: Record<string, string> = {
  akira: "御堂 煌",
  yu: "灰島 遊",
  minori: "桐嶋みのり",
  ren: "蓮",
  chifuka: "千風花",
  inner_voice: "（主人公）",
};

// ─── Simple typewriter hook ───────────────────────────────────────────────
function useTypewriter(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;
    if (!text) {
      setDone(true);
      return;
    }
    const id = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

export default function EndingPage() {
  const navigate = useNavigate();
  const { endingId } = useParams<{ endingId: string }>();
  const collectedEvidences = useEvidenceStore((s) => s.collectedEvidences);

  const ending = endingId ? CH1_ENDINGS[endingId] : undefined;

  // Track which dialogue line we're showing
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showInnerVoice, setShowInnerVoice] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const dialogues = ending?.dialogues ?? [];
  const currentDialogue = dialogues[dialogueIndex];

  const { displayed: twText, done: twDone } = useTypewriter(
    currentDialogue?.text ?? "",
    25
  );

  const handleAdvance = () => {
    if (!twDone) {
      // Skip typewriter — handled by clicking the box
      return;
    }
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex((i) => i + 1);
    } else if (!showInnerVoice) {
      setShowInnerVoice(true);
      setTimeout(() => setShowCard(true), 800);
    }
  };

  if (!ending) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#F5EDE0" }}
      >
        <div className="text-center space-y-4">
          <p className="font-ui text-lg" style={{ color: "#2C2926" }}>
            エンディングが見つかりません
          </p>
          <button
            type="button"
            className="font-ui text-sm underline"
            style={{ color: "#5A4540" }}
            onClick={() => navigate("/dashboard")}
          >
            事務所に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #2C2926 0%, #1E1814 40%, #3D2B1F 100%)",
      }}
    >
      {/* Chapter label */}
      <div className="pt-8 pb-2 text-center animate-fade-in">
        <p
          className="font-ui text-xs tracking-widest uppercase"
          style={{ color: "#8B9DAE" }}
        >
          第1章
        </p>
        <p
          className="font-ui text-sm"
          style={{ color: "#C9B99A" }}
        >
          SNSの向こう側
        </p>
      </div>

      {/* Ending title */}
      <div className="text-center py-4 animate-fade-in">
        <h1
          className="font-ui text-2xl sm:text-3xl tracking-wide"
          style={{ color: "#E8B4A0" }}
        >
          {ending.title}
        </h1>
      </div>

      {/* Dialogue area */}
      <div className="flex-1 flex flex-col justify-end pb-4 px-4 max-w-2xl mx-auto w-full">
        {/* Dialogue box */}
        {!showInnerVoice && currentDialogue && (
          <button
            type="button"
            className="w-full text-left border-2 p-4 mb-4 animate-slide-up focus:outline-none"
            style={{
              background: "#1E1814",
              borderColor: "#C9B99A",
              boxShadow: "2px 2px 0 #C9B99A",
            }}
            onClick={handleAdvance}
          >
            <p
              className="font-ui text-xs mb-2"
              style={{ color: "#8B9DAE" }}
            >
              {CHARACTER_NAMES[currentDialogue.character ?? ""] ??
                currentDialogue.character ??
                ""}
            </p>
            <p
              className="font-dialog text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "#F5EDE0" }}
            >
              {twText}
              {!twDone && (
                <span className="animate-pulse-soft" style={{ color: "#C9805E" }}>
                  ▋
                </span>
              )}
            </p>
            {twDone && dialogueIndex < dialogues.length - 1 && (
              <div className="text-right mt-2">
                <span
                  className="font-ui text-xs animate-pulse-soft"
                  style={{ color: "#C9805E" }}
                >
                  ▶
                </span>
              </div>
            )}
            {twDone && dialogueIndex === dialogues.length - 1 && (
              <div className="text-right mt-2">
                <span
                  className="font-ui text-xs animate-pulse-soft"
                  style={{ color: "#C9805E" }}
                >
                  続き →
                </span>
              </div>
            )}
            {/* Progress indicator */}
            <div className="flex gap-1 mt-3">
              {dialogues.map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 flex-1"
                  style={{
                    background:
                      i <= dialogueIndex ? "#C9805E" : "#5A4540",
                  }}
                />
              ))}
            </div>
          </button>
        )}

        {/* Inner voice */}
        {showInnerVoice && (
          <div
            className="border-l-2 pl-4 py-2 mb-4 animate-fade-in"
            style={{ borderColor: "#C9805E" }}
          >
            <p
              className="font-ui text-xs mb-1"
              style={{ color: "#C9805E" }}
            >
              （主人公の内語）
            </p>
            <p
              className="font-serif text-sm leading-relaxed whitespace-pre-line italic"
              style={{ color: "#E8B4A0" }}
            >
              {ending.innerVoice}
            </p>
          </div>
        )}

        {/* Ending card */}
        {showCard && (
          <div
            className="border-2 p-5 animate-slide-up space-y-4"
            style={{
              background: "#1E1814",
              borderColor: "#C9B99A",
              boxShadow: "3px 3px 0 #C9B99A",
            }}
          >
            {/* Ending card title */}
            <div className="text-center border-b pb-3" style={{ borderColor: "#5A4540" }}>
              <p
                className="font-ui text-lg"
                style={{ color: "#F5EDE0" }}
              >
                {ending.endingCard}
              </p>
            </div>

            {/* Evidence count */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-xs" style={{ color: "#8B9DAE" }}>
                取得証拠
              </span>
              <span className="font-mono text-sm" style={{ color: "#C9B99A" }}>
                {collectedEvidences.length}枚
              </span>
            </div>

            {/* Achievement badge */}
            {ending.achievement && (
              <div
                className="flex items-center gap-2 border px-3 py-2"
                style={{
                  borderColor: "#6B7C5A",
                  background: "rgba(107,124,90,0.1)",
                }}
              >
                <span style={{ fontSize: 16 }}>🏅</span>
                <div>
                  <p
                    className="font-ui text-xs"
                    style={{ color: "#6B7C5A" }}
                  >
                    称号を獲得
                  </p>
                  <p
                    className="font-serif text-sm"
                    style={{ color: "#C9B99A" }}
                  >
                    「{ending.achievement}」
                  </p>
                </div>
              </div>
            )}

            {/* Hint for wrong/partial */}
            {ending.hint && (
              <p
                className="font-serif text-xs italic"
                style={{ color: "#8B9DAE" }}
              >
                {ending.hint}
              </p>
            )}

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              {/* Retry deduction — only for wrong/partial */}
              {ending.retryEnabled && (
                <button
                  type="button"
                  className="w-full py-3 font-ui text-sm border-2 transition-colors"
                  style={{
                    borderColor: "#C9805E",
                    color: "#C9805E",
                    background: "transparent",
                  }}
                  onClick={() => navigate("/deduction/ch1")}
                >
                  もう一度推理する
                </button>
              )}

              {/* Next chapter / back to dashboard */}
              <button
                type="button"
                className="w-full py-3 font-ui text-sm border-2 transition-colors"
                style={{
                  borderColor: "#C9B99A",
                  color: "#F5EDE0",
                  background: "#C9805E",
                }}
                onClick={() => navigate("/dashboard")}
              >
                {ending.retryEnabled ? "ダッシュボードに戻る" : "次の章へ →"}
              </button>

              {/* Restart */}
              <button
                type="button"
                className="w-full py-2 font-ui text-xs border transition-colors"
                style={{
                  borderColor: "#5A4540",
                  color: "#8B9DAE",
                  background: "transparent",
                }}
                onClick={() => navigate("/play")}
              >
                最初からプレイ
              </button>

              {/* Journal */}
              <button
                type="button"
                className="w-full py-2 font-ui text-xs transition-colors"
                style={{ color: "#8B9DAE" }}
                onClick={() => navigate("/journal")}
              >
                ジャーナルを見る →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
