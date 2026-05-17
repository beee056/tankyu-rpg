import type { StatusPoint } from "shared-types";

type StatusDelta = Partial<
  Pick<
    StatusPoint,
    "question_power" | "explore_power" | "connect_power" | "express_power"
  >
>;

/**
 * Calculate status delta when player records a question card.
 */
export function calcQuestionCardDelta(isFirstTime: boolean): StatusDelta {
  return { question_power: isFirstTime ? 3 : 5, connect_power: isFirstTime ? 0 : 2 };
}

/**
 * Calculate status delta for journal submission.
 */
export function calcJournalDelta(
  wordCount: number,
  hasSelfRef: boolean
): StatusDelta {
  const base: StatusDelta = {};
  if (wordCount >= 100) {
    base.question_power = 1;
    base.connect_power = 3;
    base.express_power = 1;
  }
  if (hasSelfRef) {
    base.question_power = (base.question_power ?? 0) + 2;
    base.connect_power = (base.connect_power ?? 0) + 3;
    base.express_power = (base.express_power ?? 0) + 2;
  }
  return base;
}

/**
 * Calculate status delta for information source access.
 */
export function calcInfoSourceDelta(
  sourceCount: number,
  isNewSource: boolean
): StatusDelta {
  const base: StatusDelta = isNewSource ? { explore_power: 2 } : {};
  if (sourceCount >= 3) {
    base.explore_power = (base.explore_power ?? 0) + 5;
  }
  return base;
}

/**
 * Calculate status delta for choice selection.
 */
export function calcChoiceReasonDelta(): StatusDelta {
  return { question_power: 1, connect_power: 1, express_power: 1 };
}

/**
 * Check if self-reference keywords appear in text.
 */
export function hasSelfReference(text: string): boolean {
  const keywords = ["私は", "自分が", "僕は", "わたしは", "じぶんが", "自分は"];
  return keywords.some((kw) => text.includes(kw));
}

/**
 * Merge two status deltas together.
 */
export function mergeDeltas(...deltas: StatusDelta[]): StatusDelta {
  return deltas.reduce<StatusDelta>((acc, d) => {
    return {
      question_power: (acc.question_power ?? 0) + (d.question_power ?? 0),
      explore_power: (acc.explore_power ?? 0) + (d.explore_power ?? 0),
      connect_power: (acc.connect_power ?? 0) + (d.connect_power ?? 0),
      express_power: (acc.express_power ?? 0) + (d.express_power ?? 0),
    };
  }, {});
}
