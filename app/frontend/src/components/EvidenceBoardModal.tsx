import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEvidenceStore } from "@/stores/evidenceStore";
import type { Evidence } from "shared-types";
import type { AssociationResult } from "@/stores/evidenceStore";

// ── Type icon map ─────────────────────────────────────────────────────────
const TYPE_ICONS: Record<string, string> = {
  dialogue: "💬",
  observation: "👁",
  item: "📄",
  hidden: "🔒",
};

const TYPE_LABELS: Record<string, string> = {
  dialogue: "セリフ",
  observation: "観察",
  item: "アイテム",
  hidden: "隠し",
};

// ── EvidenceCard ──────────────────────────────────────────────────────────
interface EvidenceCardProps {
  evidence: Evidence;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

function EvidenceCard({ evidence, isSelected, onToggle }: EvidenceCardProps) {
  const isHidden = evidence.type === "hidden";

  const borderColor = isSelected
    ? "#C9805E"
    : isHidden
    ? "#6B7C5A"
    : "#C9B99A";
  const bgColor = isSelected
    ? "rgba(201,128,94,0.08)"
    : isHidden
    ? "rgba(107,124,90,0.08)"
    : "#EDE3CF";

  return (
    <button
      onClick={() => onToggle(evidence.id)}
      className="relative flex flex-col items-start transition-all duration-200 active:scale-95 hover:opacity-90 text-left w-full"
      style={{
        border: `2px solid ${borderColor}`,
        background: bgColor,
        borderRadius: 0,
        padding: "8px 6px",
        minHeight: "88px",
        width: "100%",
      }}
    >
      {/* Type icon + selection check */}
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-base leading-none">
          {TYPE_ICONS[evidence.type] ?? "📄"}
        </span>
        {isSelected && (
          <span className="text-xs" style={{ color: "#C9805E" }}>
            ✓
          </span>
        )}
      </div>

      {/* Title */}
      <p
        className="text-xs leading-snug font-serif line-clamp-3"
        style={{ color: isHidden ? "#8B9DAE" : "#2C2926" }}
      >
        {evidence.title}
      </p>

      {/* Type label */}
      <p
        className="mt-auto pt-1 text-xs font-ui tracking-wide"
        style={{ color: "#8B9DAE" }}
      >
        {TYPE_LABELS[evidence.type] ?? evidence.type}
      </p>
    </button>
  );
}

// ── AssociationResultDisplay ──────────────────────────────────────────────
function AssociationResultDisplay({ result }: { result: AssociationResult | null }) {
  if (!result) return null;

  const isUnlocked = result.type === "hypothesis_unlocked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-3 px-4 py-3 text-sm font-serif"
      style={{
        border: `1px solid ${isUnlocked ? "#C9805E" : "#C9B99A"}`,
        background: isUnlocked ? "rgba(201,128,94,0.1)" : "rgba(201,185,154,0.1)",
        borderRadius: 0,
        color: isUnlocked ? "#C9805E" : "#5A4540",
      }}
    >
      {isUnlocked && (
        <p className="font-ui text-xs tracking-widest mb-1" style={{ color: "#C9805E" }}>
          ヒント解放
        </p>
      )}
      <p>{result.message}</p>
    </motion.div>
  );
}

// ── EvidenceBoardModal ────────────────────────────────────────────────────
interface EvidenceBoardModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function EvidenceBoardModal({ isOpen = true, onClose }: EvidenceBoardModalProps) {
  const {
    collectedEvidences,
    selectedIds,
    toggleSelect,
    clearSelection,
    associateEvidence,
    clearNewFlag,
  } = useEvidenceStore();

  const [assocResult, setAssocResult] = useState<AssociationResult | null>(null);

  function handleOverlayAnimationStart() {
    clearNewFlag();
    setAssocResult(null);
  }

  function handleClose() {
    clearSelection();
    setAssocResult(null);
    onClose();
  }

  function handleAssociate() {
    const result = associateEvidence();
    setAssocResult(result);
  }

  const canAssociate = selectedIds.length >= 2 && selectedIds.length <= 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="evidence-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(30,24,20,0.75)" }}
            onClick={handleClose}
            onAnimationStart={handleOverlayAnimationStart}
          />

          {/* Bottom sheet */}
          <motion.div
            key="evidence-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] flex flex-col"
            style={{
              background: "#F5EDE0",
              borderTop: "2px solid #C9B99A",
              borderRadius: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid #C9B99A" }}
            >
              <div className="flex items-center gap-3">
                <h2
                  className="text-sm font-ui tracking-widest"
                  style={{ color: "#2C2926" }}
                >
                  証拠ボード
                </h2>
                <span
                  className="text-xs font-serif px-2 py-0.5"
                  style={{
                    background: "#EDE3CF",
                    border: "1px solid #C9B99A",
                    color: "#5A4540",
                  }}
                >
                  {collectedEvidences.length}枚
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-yoake-text-muted hover:text-yoake-ink transition-colors font-serif text-lg leading-none"
                style={{
                  minWidth: "44px",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              {collectedEvidences.length === 0 ? (
                <p
                  className="text-center text-sm font-serif py-8"
                  style={{ color: "#8B9DAE" }}
                >
                  まだ証拠は集まっていない。
                  <br />
                  セリフの下線部をタップしてみよう。
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {collectedEvidences.map((ev) => (
                    <EvidenceCard
                      key={ev.id}
                      evidence={ev}
                      isSelected={selectedIds.includes(ev.id)}
                      onToggle={toggleSelect}
                    />
                  ))}
                </div>
              )}

              {/* Association result */}
              <AnimatePresence>
                {assocResult && (
                  <AssociationResultDisplay key="assoc-result" result={assocResult} />
                )}
              </AnimatePresence>
            </div>

            {/* Association bar */}
            {collectedEvidences.length > 0 && (
              <div
                className="flex-shrink-0 px-3 py-3 flex items-center justify-between gap-2"
                style={{ borderTop: "1px solid #C9B99A", background: "#EDE3CF" }}
              >
                <span
                  className="text-xs font-serif"
                  style={{ color: "#8B9DAE" }}
                >
                  {selectedIds.length > 0
                    ? `選択中: ${selectedIds.length}/3`
                    : "2〜3枚選んで関連付け"}
                </span>
                <div className="flex items-center gap-2">
                  {selectedIds.length > 0 && (
                    <button
                      onClick={clearSelection}
                      className="text-xs font-serif transition-colors hover:opacity-70"
                      style={{
                        color: "#8B9DAE",
                        minHeight: "36px",
                        padding: "0 8px",
                        background: "transparent",
                        border: "none",
                      }}
                    >
                      クリア
                    </button>
                  )}
                  <button
                    disabled={!canAssociate}
                    onClick={handleAssociate}
                    className="text-sm font-ui tracking-wide transition-all disabled:opacity-40"
                    style={{
                      background: canAssociate ? "#C9805E" : "#C9B99A",
                      color: "#F5EDE0",
                      borderRadius: 0,
                      minHeight: "36px",
                      padding: "0 16px",
                      border: "none",
                    }}
                  >
                    関連付ける →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Named export alias for convenience
export { EvidenceBoardModal };
