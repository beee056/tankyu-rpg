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

  const isCollected = collectedEvidences.some((e) => e.id === highlightDef.evidenceId);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (isCollected) return;
    addEvidence(highlightDef.evidenceId);
    addCollectedEvidenceId(highlightDef.evidenceId);
  }

  if (isCollected) {
    // 取得済み: 色を薄めるのみ。追加要素なし → レイアウト変動ゼロ
    return (
      <span
        style={{ color: "#7a8fa6", opacity: 0.7 }}
        title={highlightDef.tooltip ?? "取得済み"}
      >
        {word}
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
      className="highlight-tap"
      style={{
        borderBottom: "2px solid #C9805E",
        paddingBottom: "1px",
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
