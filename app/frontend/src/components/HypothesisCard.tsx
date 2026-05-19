import type { Hypothesis } from "shared-types";

interface HypothesisCardProps {
  hypothesis: Hypothesis;
  collectedIds: string[];
  isSelected: boolean;
  onSelect: (hyp: Hypothesis) => void;
}

function isUnlocked(hyp: Hypothesis, collectedIds: string[]): boolean {
  if (hyp.requiredEvidence.length === 0) return true;
  return hyp.requiredEvidence.every((id) => collectedIds.includes(id));
}

/** How many required evidence pieces are still missing */
function missingCount(hyp: Hypothesis, collectedIds: string[]): number {
  return hyp.requiredEvidence.filter((id) => !collectedIds.includes(id)).length;
}

export default function HypothesisCard({
  hypothesis,
  collectedIds,
  isSelected,
  onSelect,
}: HypothesisCardProps) {
  const unlocked = isUnlocked(hypothesis, collectedIds);
  const missing = missingCount(hypothesis, collectedIds);

  if (!unlocked) {
    // Locked state — show blurred placeholder + hint
    return (
      <div
        className="w-full rounded-none border-2 p-4"
        style={{
          borderColor: "#C9B99A",
          background: "#E6D9C2",
          opacity: 0.65,
        }}
      >
        <div className="flex items-start gap-3">
          {/* Lock icon */}
          <div
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-none border"
            style={{ borderColor: "#C9B99A", background: "#EDE3CF" }}
          >
            <span style={{ fontSize: 16 }}>🔒</span>
          </div>
          <div className="flex-1 min-w-0">
            {/* Masked title */}
            <div
              className="h-4 rounded mb-2"
              style={{
                background: "#C9B99A",
                width: "60%",
                opacity: 0.6,
              }}
            />
            <p className="text-xs font-serif" style={{ color: "#8B9DAE" }}>
              あと{missing}枚の証拠が必要
            </p>
            {hypothesis.hint && (
              <p
                className="text-xs font-serif italic mt-1"
                style={{ color: "#8B9DAE" }}
              >
                ヒント: {hypothesis.hint}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Unlocked state
  return (
    <button
      type="button"
      className="w-full text-left rounded-none border-2 p-4 transition-all duration-150 focus:outline-none"
      style={{
        borderColor: isSelected ? "#C9805E" : "#C9B99A",
        background: isSelected ? "rgba(201,128,94,0.12)" : "#EDE3CF",
        boxShadow: isSelected ? "2px 2px 0 #C9805E" : "2px 2px 0 #C9B99A",
      }}
      onClick={() => onSelect(hypothesis)}
    >
      <div className="flex items-start gap-3">
        {/* State indicator */}
        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-none border"
          style={{
            borderColor: isSelected ? "#C9805E" : "#C9B99A",
            background: isSelected ? "#C9805E" : "#F5EDE0",
          }}
        >
          {isSelected ? (
            <span className="font-ui text-sm" style={{ color: "#F5EDE0" }}>
              ✓
            </span>
          ) : (
            <span className="font-ui text-sm" style={{ color: "#5A4540" }}>
              ?
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="font-ui text-sm font-semibold leading-snug"
            style={{ color: "#2C2926" }}
          >
            {hypothesis.title}
          </p>
          <p
            className="font-serif text-xs mt-1 leading-relaxed"
            style={{ color: "#5A4540" }}
          >
            {hypothesis.description}
          </p>

          {/* Required evidence checklist */}
          {hypothesis.requiredEvidence.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {hypothesis.requiredEvidence.map((evId) => (
                <span
                  key={evId}
                  className="font-mono text-xs px-1.5 py-0.5 border"
                  style={{
                    borderColor: collectedIds.includes(evId)
                      ? "#6B7C5A"
                      : "#C9B99A",
                    color: collectedIds.includes(evId)
                      ? "#6B7C5A"
                      : "#8B9DAE",
                    background: collectedIds.includes(evId)
                      ? "rgba(107,124,90,0.08)"
                      : "transparent",
                  }}
                >
                  {collectedIds.includes(evId) ? "✓ " : ""}
                  {evId}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isSelected && (
        <div
          className="mt-3 pt-3 border-t"
          style={{ borderColor: "#C9805E" }}
        >
          <p
            className="font-ui text-xs text-center"
            style={{ color: "#C9805E" }}
          >
            この仮説で推理する
          </p>
        </div>
      )}
    </button>
  );
}
