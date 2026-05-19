import { useState } from "react";
import { useEvidenceStore } from "@/stores/evidenceStore";
import { useGameStore } from "@/stores/gameStore";
import type { HighlightDef } from "shared-types";

interface HighlightSpanProps {
  highlightDef: HighlightDef;
  word: string;
}

export function HighlightSpan({ highlightDef, word }: HighlightSpanProps) {
  const { collectedEvidences, addEvidence } = useEvidenceStore();
  const { addCollectedEvidenceId } = useGameStore();
  const [justCollected, setJustCollected] = useState(false);

  const isCollected = collectedEvidences.some((e) => e.id === highlightDef.evidenceId);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (isCollected) return;
    addEvidence(highlightDef.evidenceId);
    addCollectedEvidenceId(highlightDef.evidenceId);
    setJustCollected(true);
    setTimeout(() => setJustCollected(false), 2000);
  }

  if (isCollected) {
    return (
      <span
        className="transition-all duration-300"
        style={{ color: "#8B9DAE", opacity: 0.85 }}
        title={highlightDef.tooltip ?? "取得済み"}
      >
        {word}
        <span className="text-xs ml-0.5" style={{ color: "#6B7C5A" }}>✓</span>
      </span>
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick(e as unknown as React.MouseEvent)}
      title={highlightDef.tooltip}
      className="cursor-pointer transition-all duration-300 hover:opacity-80 active:scale-95 inline-block"
      style={{
        borderBottom: "2px solid #C9805E",
        color: justCollected ? "#C9805E" : "#E8B4A0",
        paddingBottom: "1px",
        opacity: justCollected ? 0.7 : 1,
        transition: "color 0.3s ease, opacity 0.3s ease",
      }}
    >
      {word}
    </span>
  );
}

// ── Helper: split text into nodes using highlight definitions ──────────────
export function renderWithHighlights(
  text: string,
  highlights: HighlightDef[] | undefined,
  displayed: number
): React.ReactNode[] {
  const visibleText = text.slice(0, displayed);

  if (!highlights || highlights.length === 0) {
    return [visibleText];
  }

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const h of highlights) {
    const idx = visibleText.indexOf(h.word, lastIndex);
    if (idx === -1) continue;

    if (idx > lastIndex) {
      nodes.push(visibleText.slice(lastIndex, idx));
    }
    nodes.push(
      <HighlightSpan key={`${h.evidenceId}-${idx}`} highlightDef={h} word={h.word} />
    );
    lastIndex = idx + h.word.length;
  }

  if (lastIndex < visibleText.length) {
    nodes.push(visibleText.slice(lastIndex));
  }

  return nodes;
}
