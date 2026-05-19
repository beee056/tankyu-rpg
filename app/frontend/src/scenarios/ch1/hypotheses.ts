import type { Hypothesis } from "shared-types";

// ============================================================
// 第1章 仮説マスターデータ
// 合計: 4件 (hyp_ch1_A〜D)
// 参照: v2-deduction-system.md §3-1
// ============================================================
export const CH1_HYPOTHESES: Hypothesis[] = [
  // ────────────────────────────────────────────────────────
  // hyp_ch1_A: 誤推理ルート（truthScore 30 → ending_ch1_wrong）
  // ────────────────────────────────────────────────────────
  {
    id: "hyp_ch1_A",
    title: "親友はみのりに批判的だった",
    description:
      "SNSの投稿はみのりに向けられた批判であり、親友はみのりのことを嫌っていた。",
    requiredEvidence: ["ev_ch1_03"],
    optionalEvidence: [],
    truthScore: 30,
    leadsTo: "ending_ch1_wrong",
    hint: "SNSの投稿に関する証拠を探してみよう",
  },

  // ────────────────────────────────────────────────────────
  // hyp_ch1_B: 部分到達ルート（truthScore 65 → ending_ch1_partial）
  // ────────────────────────────────────────────────────────
  {
    id: "hyp_ch1_B",
    title: "親友は自分自身の疲れを吐き出していた",
    description:
      "桐嶋の投稿はみのりへの批判ではなく、自身の疲れが滲み出たものだった。" +
      "みのりに心配をかけたくなかったため、直接話さなかった。",
    requiredEvidence: ["ev_ch1_04", "ev_ch1_05"],
    optionalEvidence: [],
    truthScore: 65,
    leadsTo: "ending_ch1_partial",
    hint: "桐嶋側の証言がまだ必要かもしれない",
  },

  // ────────────────────────────────────────────────────────
  // hyp_ch1_C: 真相到達ルート（truthScore 80 → ending_ch1_true）
  // ────────────────────────────────────────────────────────
  {
    id: "hyp_ch1_C",
    title: "みのりと親友の両者にそれぞれの問いがあった",
    description:
      "みのりには「なぜ怖かったのか」という自己認識の問いがあり、" +
      "桐嶋には「なぜ隠していたのか」という問いがあった。" +
      "依頼の核心は、二つの問いの発見だった。",
    requiredEvidence: ["ev_ch1_05", "ev_ch1_06"],
    optionalEvidence: ["ev_ch1_07"],
    truthScore: 80,
    leadsTo: "ending_ch1_true",
    hint: "みのり自身の恐れに関する証拠と、桐嶋側の証拠が両方必要",
  },

  // ────────────────────────────────────────────────────────
  // hyp_ch1_D: 深層真相ルート（truthScore 100 → ending_ch1_deep）
  //   hidden — ev_ch1_5h_01 + ev_ch1_5h_02 が必須
  // ────────────────────────────────────────────────────────
  {
    id: "hyp_ch1_D",
    title: "親友の家庭事情がすべての発端だった（真相）",
    description:
      "桐嶋の投稿の背景には、長期にわたる家庭内の事情があった。" +
      "八つ当たりではなく、抱えきれなくなった苦しさが漏れ出たものだった。" +
      "桐嶋自身が後から罪悪感を感じており、謝罪の気持ちを持っていた。",
    requiredEvidence: ["ev_ch1_5h_01", "ev_ch1_5h_02"],
    optionalEvidence: ["ev_ch1_07"],
    truthScore: 100,
    leadsTo: "ending_ch1_deep",
    hint: "隠されたコマに到達しなければ、この真相には辿り着けない",
  },
];

// ── ユーティリティ: IDで引く ─────────────────────────────────────
export function getHypothesisById(id: string): Hypothesis | undefined {
  return CH1_HYPOTHESES.find((h) => h.id === id);
}

// ── ユーティリティ: 解放判定 ─────────────────────────────────────
export function isHypothesisUnlocked(
  hyp: Hypothesis,
  collectedIds: string[]
): boolean {
  if (hyp.requiredEvidence.length === 0) return true;
  return hyp.requiredEvidence.every((id) => collectedIds.includes(id));
}

// ── ユーティリティ: truthScore 計算（optional bonus含む）────────
export function calcTruthScore(
  hyp: Hypothesis,
  collectedIds: string[]
): number {
  const optBonus = (hyp.optionalEvidence ?? []).filter((id) =>
    collectedIds.includes(id)
  ).length * 5;
  return Math.min(100, hyp.truthScore + optBonus);
}
