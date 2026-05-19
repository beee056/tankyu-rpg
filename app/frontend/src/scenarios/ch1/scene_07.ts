import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ7「最後の問い」— v2完全版
// 依拠: design/05-chapter1-script.md コマ7 全文
// v2追加:
//   ミニ推理② (ch1_s07_deduction_mini): type=deduction_mini
//     - 仮説C: requiredEvidence [ev_ch1_06]
//     - 仮説D(CD合体): requiredEvidence [ev_ch1_5h_01, ev_ch1_5h_02]
//   requires_journal: false
// ─────────────────────────────────────────────────────────────────────────────

export const scene_07_narration: SceneData = {
  scene_id: "ch1_s07_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "最後のコマ。\n\n窓から見える空は夕焼け色になっていた。\nみのりから連絡が来た。「今日、桐嶋に話せました」と。",
    },
    {
      text: "遊は「よかったね」と言って、小さくガッツポーズをした。",
    },
  ],
  next_scene: "ch1_s07_yu_close",
};

export const scene_07_yu_close: SceneData = {
  scene_id: "ch1_s07_yu_close",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……このケース、一応クローズできるね",
      pose: "relieved",
    },
    {
      character: "yu",
      text: "でも、このケースって結局何だったと思う？",
      pose: "listening",
    },
    {
      character: "yu",
      text: "友達の悪口投稿を解決した、っていうより……なんか違う気がして",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s07_akira_adds",
};

export const scene_07_akira_adds: SceneData = {
  scene_id: "ch1_s07_akira_adds",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……みのりと、桐嶋。二人にそれぞれ問いがあった",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "みのりの問いは「なぜ自分はこんなに傷つくのか」。桐嶋の問いは「なぜ言えないのか」",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "依頼人が最初に持ってきた問いは、「友達は私が嫌いなのか」だった。でも最後の問いは違う",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "問いが深くなった。……それがこの依頼の成果だ",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s07_inner_voice",
};

export const scene_07_inner_voice: SceneData = {
  scene_id: "ch1_s07_inner_voice",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（このケースで、本当に解決されたことは何だったんだろう）",
    },
    {
      text: "（問いが深くなったことが成果——御堂はそう言った。なんか、それが正解な気がした）",
    },
  ],
  next_scene: "ch1_s07_deduction_mini",
};

/** ミニ推理② — v2: 章末DeductionPageの前哨 */
export const scene_07_deduction_mini: SceneData = {
  scene_id: "ch1_s07_deduction_mini",
  type: "deduction_mini",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……この依頼の「本質」って、何だったと思う？",
      pose: "casual",
    },
    {
      character: "yu",
      text: "3つくらい候補がある。証拠と照らし合わせながら考えてみてよ",
      pose: "casual",
    },
  ],
  choices: [
    {
      key: "A",
      label: "友人関係の修復が目的だった",
      // 常に選択可能（証拠なし）
      next_scene: "ch1_s07_mini_result",
    },
    {
      key: "B",
      label: "みのり自身の「問い」の発見が目的だった",
      requiredEvidence: ["ev_ch1_06"],
      hint: "みのりの恐れの核心に関わる証拠が必要です",
      next_scene: "ch1_s07_mini_result",
    },
    {
      key: "C",
      label: "二者それぞれの問いが絡み合っていた",
      requiredEvidence: ["ev_ch1_5h_01", "ev_ch1_5h_02"],
      hint: "桐嶋の事情が明らかになる証拠が必要です",
      next_scene: "ch1_s07_mini_result",
    },
  ],
};

export const scene_07_mini_result: SceneData = {
  scene_id: "ch1_s07_mini_result",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……選んだ仮説を持ったまま、推理に入れ",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "最後の推理でそれが合ってるか、間違ってるかがわかる",
      pose: "expressionless",
    },
  ],
  next_scene: "ch1_s07_title_reveal",
};

export const scene_07_title_reveal: SceneData = {
  scene_id: "ch1_s07_title_reveal",
  type: "title_reveal",
  requires_journal: false,
  messages: [
    {
      text: "第1章 「問いの先にある問い」",
    },
  ],
  next_scene: "ch1_s07_journal",
};

/** コマ7末・最終内省 — v2: requires_journal: false（任意化） */
export const scene_07_journal: SceneData = {
  scene_id: "ch1_s07_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "このケースを通じて、あなた自身の「問いの地図」に何か増えましたか。気になったことがあれば、ジャーナルに書いてもいい",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "この依頼で、あなた自身の問いは変わりましたか。どう変わりましたか（スキップ可）",
  requires_journal: false,
  next_scene: "ch1_s08_deduction_start",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_07: Record<string, SceneData> = {
  ch1_s07_narration: scene_07_narration,
  ch1_s07_yu_close: scene_07_yu_close,
  ch1_s07_akira_adds: scene_07_akira_adds,
  ch1_s07_inner_voice: scene_07_inner_voice,
  ch1_s07_deduction_mini: scene_07_deduction_mini,
  ch1_s07_mini_result: scene_07_mini_result,
  ch1_s07_title_reveal: scene_07_title_reveal,
  ch1_s07_journal: scene_07_journal,
};
