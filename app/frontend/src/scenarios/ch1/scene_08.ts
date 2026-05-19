import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ8「章末本推理」— v2完全版
// 依拠: design/05-chapter1-script.md コマ8 / v2-deduction-system.md §6
// v2追加:
//   type: "deduction_mini" — PlayPage が next_scene: "deduction_ch1" を検出して
//   DeductionPage に遷移する。実際の仮説UI描画は DeductionPage (Stage 2-B) 側が担う。
//   requires_journal: false
// ─────────────────────────────────────────────────────────────────────────────

export const scene_08_deduction_start: SceneData = {
  scene_id: "ch1_s08_deduction_start",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……証拠が出揃った",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "最後の問い。この依頼の真相を——推理しろ",
      pose: "quiet",
    },
    {
      character: "yu",
      text: "これが、章末の本推理だよ。今まで集めた証拠を使って、一番正しい仮説を選ぶ",
      pose: "casual",
    },
    {
      character: "yu",
      text: "証拠が多ければ多いほど、選べる仮説が増える。……頑張って",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s08_inner_pre_deduction",
};

export const scene_08_inner_pre_deduction: SceneData = {
  scene_id: "ch1_s08_inner_pre_deduction",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（証拠が揃った。コルクボードには、今まで集めたカードが全部ある。\nみのりの言葉、桐嶋の告白、遊の分析——全部がここにある）",
    },
    {
      text: "（何が、本当のことだったのか）",
    },
  ],
  next_scene: "ch1_s08_deduction_prompt",
};

// ── 章末本推理 ────────────────────────────────────────────────────────────────
// type: "deduction_mini" を使い、next_scene: "deduction_ch1" という特殊値を置く。
// PlayPage (Stage 2-A) が next_scene === "deduction_ch1" を検出して DeductionPage へ遷移する。
// DeductionPage (Stage 2-B) が hypotheses.ts から仮説リストを読み込みUI描画を担う。

export const scene_08_deduction_prompt: SceneData = {
  scene_id: "ch1_s08_deduction_prompt",
  type: "deduction_mini",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "推理を始めろ",
      pose: "expressionless",
    },
  ],
  // ── DeductionPage 遷移トリガー ──
  // PlayPage は next_scene === "deduction_ch1" を受け取ったとき
  // DeductionPage へルーティングする（Stage 2-A の実装責任）
  next_scene: "deduction_ch1",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_08: Record<string, SceneData> = {
  ch1_s08_deduction_start: scene_08_deduction_start,
  ch1_s08_inner_pre_deduction: scene_08_inner_pre_deduction,
  ch1_s08_deduction_prompt: scene_08_deduction_prompt,
};
