import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ6「問いの地図を描く」— v2完全版
// 依拠: design/05-chapter1-script.md コマ6 全文
// v2追加: requires_journal: false（全ノード）
//   （コマ6は証拠付与なし。収集済み証拠を整理する認知的まとめパートのため）
// ─────────────────────────────────────────────────────────────────────────────

export const scene_06_narration: SceneData = {
  scene_id: "ch1_s06_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "コルクボードが少し賑やかになった。\nカードが増えて、矢印が増えた。\n\n知深が横に立って、静かに眺めている。",
    },
    {
      text: "「……問いが増えましたね」",
    },
  ],
  next_scene: "ch1_s06_chifuka_map",
};

export const scene_06_chifuka_map: SceneData = {
  scene_id: "ch1_s06_chifuka_map",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "問いの地図、という考え方があります",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "一つの問いの下に、別の問いがある。その下にまた別の問いがある。\n地図みたいに広がっていく",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "この依頼は……みのりの問いと、桐嶋の問いが、ある意味で絡み合っていた",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s06_yu_question",
};

export const scene_06_yu_question: SceneData = {
  scene_id: "ch1_s06_yu_question",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……俺、最初はこの依頼って「みのりの友達がSNSで悪口書いたかどうか」ってだけだと思ってたんだよね",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "でも掘ってくうちに……なんか全然違うものが出てきた",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "みのりが傷ついていた理由、桐嶋が書いた理由、全部違う層にあって",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s06_radar",
};

export const scene_06_radar: SceneData = {
  scene_id: "ch1_s06_radar",
  type: "radar_chart",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "これまでの調査であなたが使ったのはどの力でしょう。レーダーチャートを確認してみましょう",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s06_akira_comment",
};

export const scene_06_akira_comment: SceneData = {
  scene_id: "ch1_s06_akira_comment",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……問いの地図を描くのは、答えを出すためじゃない",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "どこに問いがあるかを知るためだ",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "答えが出ていない問いがあっても、それは失敗じゃない。答えを出せない問いをちゃんと持てることが、探偵の仕事だ",
      pose: "expressionless",
    },
  ],
  next_scene: "ch1_s06_yu_add",
};

export const scene_06_yu_add: SceneData = {
  scene_id: "ch1_s06_yu_add",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……御堂は口が悪いけど、言ってることはそういうことだよ",
      pose: "casual",
    },
    {
      character: "yu",
      text: "でさ、次コマで……この依頼のまとめに入る前に一回、自分に問いを立ててみてほしいんだよね",
      pose: "casual",
    },
    {
      character: "yu",
      text: "探偵は依頼人の問いを解くんじゃなくて、問いと一緒に歩く、みたいな感じ？うまく言えないけど",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s06_choice_q",
};

export const scene_06_choice_q: SceneData = {
  scene_id: "ch1_s06_choice_q",
  type: "choice",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "この依頼を通じて、あなたが「問いたい」と思ったことは何？",
      pose: "listening",
    },
  ],
  choices: [
    {
      key: "A",
      label: "人はなぜ、直接聞けないのか",
      status_delta: { question_power: 3 },
      next_scene: "ch1_s06_react_a",
    },
    {
      key: "B",
      label: "傷つくことを恐れるのはなぜか",
      status_delta: { connect_power: 3 },
      next_scene: "ch1_s06_react_b",
    },
    {
      key: "C",
      label: "相手の問いを知ることはできるのか",
      status_delta: { explore_power: 3 },
      next_scene: "ch1_s06_react_c",
    },
  ],
};

export const scene_06_react_a: SceneData = {
  scene_id: "ch1_s06_react_a",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "……それは、探偵が生涯かけて持つ問いかもしれません",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s06_journal",
};

export const scene_06_react_b: SceneData = {
  scene_id: "ch1_s06_react_b",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "……傷つくことを知っているから、人は誰かを好きになれる",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s06_journal",
};

export const scene_06_react_c: SceneData = {
  scene_id: "ch1_s06_react_c",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "……完全には知れないかもしれない。でも近づくことはできる",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s06_journal",
};

/** コマ6末・内省⑥ — v2: requires_journal: false（任意化） */
export const scene_06_journal: SceneData = {
  scene_id: "ch1_s06_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "「問いの地図」を自分でも描いてみましょう。気になったことがあれば、ジャーナルに書いてもいい",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "この依頼を通じて、あなたが気になった問いを書いてみましょう（スキップ可）",
  requires_journal: false,
  next_scene: "ch1_s07_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_06: Record<string, SceneData> = {
  ch1_s06_narration: scene_06_narration,
  ch1_s06_chifuka_map: scene_06_chifuka_map,
  ch1_s06_yu_question: scene_06_yu_question,
  ch1_s06_radar: scene_06_radar,
  ch1_s06_akira_comment: scene_06_akira_comment,
  ch1_s06_yu_add: scene_06_yu_add,
  ch1_s06_choice_q: scene_06_choice_q,
  ch1_s06_react_a: scene_06_react_a,
  ch1_s06_react_b: scene_06_react_b,
  ch1_s06_react_c: scene_06_react_c,
  ch1_s06_journal: scene_06_journal,
};
