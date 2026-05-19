import { useEvidenceStore } from "@/stores/evidenceStore";

interface EvidenceBadgeProps {
  onOpen: () => void;
}

export function EvidenceBadge({ onOpen }: EvidenceBadgeProps) {
  const { collectedEvidences, hasNewEvidence } = useEvidenceStore();
  const count = collectedEvidences.length;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      className="relative flex items-center gap-1.5 transition-all hover:opacity-80 active:scale-95"
      style={{ minHeight: "44px", padding: "0 8px" }}
      title="証拠ボードを開く"
    >
      <span
        className="text-xs font-ui tracking-wide"
        style={{ color: "#C9805E" }}
      >
        証拠
      </span>
      <span
        className="text-sm font-ui font-bold"
        style={{ color: "#C9805E" }}
      >
        {count}
      </span>
      <span
        className="text-xs font-serif"
        style={{ color: "#C9805E" }}
      >
        枚
      </span>
      <span
        className="text-base leading-none"
        style={{ color: "#C9805E", opacity: 0.85 }}
      >
        📋
      </span>
      {hasNewEvidence && (
        <span
          className="absolute top-1 right-1 w-2 h-2 animate-pulse-soft"
          style={{ background: "#E8B4A0", borderRadius: "50%" }}
        />
      )}
    </button>
  );
}
