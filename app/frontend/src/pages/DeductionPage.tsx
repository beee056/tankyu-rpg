import { useState, useCallback, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import type { Hypothesis } from "shared-types";
import { CH1_HYPOTHESES, calcTruthScore } from "../scenarios/ch1/hypotheses";
import { determineEndingId } from "../scenarios/ch1/endings";
import { useEvidenceStore } from "../stores/evidenceStore";
import HypothesisCard from "../components/HypothesisCard";

// Attempt to lazily import EvidenceBoardModal (Stage 2-A).
// If the file doesn't exist at runtime, the catch() returns a no-op component.
// TypeScript: the module declaration is provided by the stub below.
const LazyEvidenceBoardModal = lazy(() =>
  import("../components/EvidenceBoardModal")
);

export default function DeductionPage() {
  const navigate = useNavigate();
  const collectedEvidences = useEvidenceStore((s) => s.collectedEvidences);
  const openBoard = useEvidenceStore((s) => s.openBoard);
  const isBoardOpen = useEvidenceStore((s) => s.isBoardOpen);
  const closeBoard = useEvidenceStore((s) => s.closeBoard);

  const collectedIds = collectedEvidences.map((e) => e.id);

  const [selectedHypId, setSelectedHypId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelectHypothesis = useCallback((hyp: Hypothesis) => {
    setSelectedHypId(hyp.id);
  }, []);

  const handleConfirm = () => {
    if (!selectedHypId) return;
    const hyp = CH1_HYPOTHESES.find((h) => h.id === selectedHypId);
    if (!hyp) return;
    setConfirmed(true);
    const score = calcTruthScore(hyp, collectedIds);
    const endingId = determineEndingId(score);
    setTimeout(() => {
      navigate(`/ending/ch1/${endingId}`);
    }, 500);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F5EDE0" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 border-b"
        style={{
          background: "#F5EDE0",
          borderColor: "#C9B99A",
          boxShadow: "0 1px 0 #C9B99A",
        }}
      >
        <button
          type="button"
          className="font-ui text-sm"
          style={{ color: "#5A4540" }}
          onClick={() => navigate(-1)}
        >
          ← 調査に戻る
        </button>
        <span
          className="font-ui text-sm font-semibold"
          style={{ color: "#2C2926" }}
        >
          推理 — 第1章の結論
        </span>
        <span className="font-mono text-xs" style={{ color: "#8B9DAE" }}>
          {collectedEvidences.length}枚
        </span>
      </header>

      {/* ── Main ── */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Evidence summary bar */}
        <section
          className="flex items-center justify-between border p-3 animate-fade-in"
          style={{
            borderColor: "#C9B99A",
            background: "#EDE3CF",
            boxShadow: "2px 2px 0 #C9B99A",
          }}
        >
          <div className="flex-1 min-w-0 pr-3">
            <p className="font-ui text-xs" style={{ color: "#8B9DAE" }}>
              集めた証拠
            </p>
            <p className="font-serif text-lg font-bold" style={{ color: "#2C2926" }}>
              {collectedEvidences.length}枚
            </p>
            {collectedEvidences.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {collectedEvidences.slice(0, 5).map((e) => (
                  <span
                    key={e.id}
                    className="font-mono text-xs px-1 py-0.5 border"
                    style={{
                      borderColor: e.type === "hidden" ? "#6B7C5A" : "#C9B99A",
                      color: e.type === "hidden" ? "#6B7C5A" : "#5A4540",
                      background:
                        e.type === "hidden"
                          ? "rgba(107,124,90,0.1)"
                          : "transparent",
                    }}
                  >
                    {e.title}
                  </span>
                ))}
                {collectedEvidences.length > 5 && (
                  <span
                    className="font-mono text-xs px-1 py-0.5"
                    style={{ color: "#8B9DAE" }}
                  >
                    他 {collectedEvidences.length - 5}枚
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            className="flex-shrink-0 font-ui text-xs px-3 py-2 border transition-colors"
            style={{
              borderColor: "#C9B99A",
              color: "#5A4540",
              background: "#F5EDE0",
            }}
            onClick={openBoard}
          >
            証拠ボードを開く →
          </button>
        </section>

        {/* Deduction prompt */}
        <div className="animate-fade-in">
          <p className="font-ui text-base" style={{ color: "#2C2926" }}>
            この依頼の真相はどれだと思う？
          </p>
          <p className="font-serif text-xs mt-1" style={{ color: "#8B9DAE" }}>
            必要な証拠を持っている仮説のみ選択できます
          </p>
        </div>

        {/* Hypothesis cards */}
        <div className="space-y-3 animate-slide-up">
          {CH1_HYPOTHESES.map((hyp) => (
            <HypothesisCard
              key={hyp.id}
              hypothesis={hyp}
              collectedIds={collectedIds}
              isSelected={selectedHypId === hyp.id}
              onSelect={handleSelectHypothesis}
            />
          ))}
        </div>

        {/* Confirm button */}
        <div className="pt-2 animate-fade-in">
          <button
            type="button"
            disabled={!selectedHypId || confirmed}
            className="w-full py-3 font-ui text-sm transition-all duration-150 border-2"
            style={{
              background: selectedHypId && !confirmed ? "#C9805E" : "#C9B99A",
              color: selectedHypId && !confirmed ? "#F5EDE0" : "#8B9DAE",
              borderColor: selectedHypId && !confirmed ? "#C9805E" : "#C9B99A",
              cursor: selectedHypId && !confirmed ? "pointer" : "default",
              boxShadow:
                selectedHypId && !confirmed ? "2px 2px 0 #B56B49" : "none",
            }}
            onClick={handleConfirm}
          >
            {confirmed ? "推理を確定しました…" : "推理を確定する"}
          </button>
          {!selectedHypId && (
            <p
              className="text-center font-serif text-xs mt-2"
              style={{ color: "#8B9DAE" }}
            >
              仮説を一つ選択してください
            </p>
          )}
        </div>

        {/* Back to dashboard */}
        <div className="pb-8 text-center">
          <button
            type="button"
            className="font-ui text-xs underline"
            style={{ color: "#8B9DAE" }}
            onClick={() => navigate("/dashboard")}
          >
            ← 事務所に戻る
          </button>
        </div>
      </main>

      {/* EvidenceBoardModal — lazy-loaded; gracefully absent if Stage 2-A not yet merged */}
      {isBoardOpen && (
        <Suspense fallback={null}>
          <LazyEvidenceBoardModal onClose={closeBoard} />
        </Suspense>
      )}
    </div>
  );
}
