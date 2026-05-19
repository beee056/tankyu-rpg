import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ5.5「隠しコマ — 桐嶋の告白」— v2完全版
// 依拠: design/05-chapter1-script.md コマ5.5 全文（深掘りルートのみ到達可）
// v2追加:
//   auto_evidence: ["ev_ch1_5h_01", "ev_ch1_5h_02"] — コマ到達時に自動付与（hidden証拠）
//   requires_journal: false
// ─────────────────────────────────────────────────────────────────────────────

export const scene_05_5_narration: SceneData = {
  scene_id: "ch1_s05_5_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "みのりが帰った後、意外なことが起こった。\n\n夕方。ヨアケ探偵社のドアが、また開いた。",
    },
  ],
  next_scene: "ch1_s05_5_kirima_enter",
};

/** 桐嶋の来訪 — v2: auto_evidence で hidden証拠を自動付与 */
export const scene_05_5_kirima_enter: SceneData = {
  scene_id: "ch1_s05_5_kirima_enter",
  type: "dialogue",
  requires_journal: false,
  // v2: このシーン到達時に隠し証拠を自動付与
  auto_evidence: ["ev_ch1_5h_01", "ev_ch1_5h_02"],
  messages: [
    {
      character: "yu",
      text: "……あ、きみ、もしかして桐嶋さん？",
      pose: "surprised",
    },
    {
      text: "ドアに立っていたのは、少し俯いた女の子だった。みのりとは雰囲気が全然違う。静かで、固いような印象。",
    },
    {
      text: "「……灰島遊さんですよね。昼に話しかけてきた人。ここに来れば会えるって、聞いたので」",
    },
    {
      text: "——桐嶋が、自分から来た。",
    },
  ],
  next_scene: "ch1_s05_5_revelation",
};

/** 桐嶋の告白 — ev_ch1_5h_01: 家庭事情の核心 */
export const scene_05_5_revelation: SceneData = {
  scene_id: "ch1_s05_5_revelation",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……来てくれたんだ。話、聞いていい？",
      pose: "gentle",
    },
    {
      text: "桐嶋は座って、少し間を置いてから、話し始めた。",
    },
    {
      text: "「……家の事情で、最近ずっとしんどいんです。半年くらい。みのりには言えなかった」",
      // ev_ch1_5h_01: 桐嶋の家庭事情告白
    },
    {
      text: "「……みのりって、心配性なんで。言ったら絶対気を遣わせる。それが嫌で」",
    },
    {
      text: "「あの投稿……みのりのことじゃないです。なんか、余裕がなくて、吐き出しただけで。……でも傷つけたかもって、気がついて」",
      // ev_ch1_5h_02: 謝罪の罪悪感
    },
    {
      text: "「……ごめんなさい、って、みのりに言えてなくて」",
    },
  ],
  next_scene: "ch1_s05_5_response_choice",
};

export const scene_05_5_response_choice: SceneData = {
  scene_id: "ch1_s05_5_response_choice",
  type: "choice",
  requires_journal: false,
  messages: [],
  choices: [
    {
      key: "A",
      label: "みのりに話してみる気はある？",
      next_scene: "ch1_s05_5_react_a",
    },
    {
      key: "B",
      label: "ごめんなさいって言えたら、変わるかもしれない",
      next_scene: "ch1_s05_5_react_b",
    },
    {
      key: "C",
      label: "（何も言わず、聞き続ける）",
      next_scene: "ch1_s05_5_react_c",
    },
  ],
};

export const scene_05_5_react_a: SceneData = {
  scene_id: "ch1_s05_5_react_a",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      text: "桐嶋は少し下を向いた。",
    },
    {
      text: "「……わかんないです。でも、ここに来たのは……みのりに謝りたかったからかも、しれないです」",
    },
  ],
  next_scene: "ch1_s05_5_end",
};

export const scene_05_5_react_b: SceneData = {
  scene_id: "ch1_s05_5_react_b",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      text: "桐嶋は一瞬だけ顔を上げた。",
    },
    {
      text: "「……そうかも、しれない」",
    },
  ],
  next_scene: "ch1_s05_5_end",
};

export const scene_05_5_react_c: SceneData = {
  scene_id: "ch1_s05_5_react_c",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      text: "しばらく沈黙が続いた。",
    },
    {
      text: "「……ありがとうございます」\n桐嶋はそう言って、立ち上がった。",
    },
  ],
  next_scene: "ch1_s05_5_end",
};

export const scene_05_5_end: SceneData = {
  scene_id: "ch1_s05_5_end",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……帰ったね。桐嶋さん",
      pose: "thoughtful",
    },
    {
      character: "yu",
      text: "みのりの問いの裏側に……桐嶋の事情があったんだよ。みのりは全然知らなかった",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "……こういうことって、案外多いんだよね。傷ついてると思ってたら、相手も傷ついてた",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s05_5_akira_comment",
};

export const scene_05_5_akira_comment: SceneData = {
  scene_id: "ch1_s05_5_akira_comment",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……事情は揃った",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "みのりの問いと、桐嶋の事情と。二つがある。次は……何が問いになる？",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s05_5_inner_voice",
};

export const scene_05_5_inner_voice: SceneData = {
  scene_id: "ch1_s05_5_inner_voice",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（桐嶋が来た。みのりは知らない。桐嶋が家庭のことで半年しんどかったことも。あの投稿がみのりへの八つ当たりじゃなかったことも）",
    },
    {
      text: "（でも桐嶋は、みのりに謝りたかったと言った。二人の間には……それぞれの問いがあった）",
    },
  ],
  next_scene: "ch1_s05_5_journal",
};

/** コマ5.5末・内省 — v2: requires_journal: false（任意化） */
export const scene_05_5_journal: SceneData = {
  scene_id: "ch1_s05_5_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "桐嶋の告白を聞いて、何か変わりましたか。気になったことがあれば、ジャーナルに書いてもいい",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "桐嶋の話を聞いて、あなたの中で何が変わりましたか",
  requires_journal: false,
  next_scene: "ch1_s06_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_05_5: Record<string, SceneData> = {
  ch1_s05_5_narration: scene_05_5_narration,
  ch1_s05_5_kirima_enter: scene_05_5_kirima_enter,
  ch1_s05_5_revelation: scene_05_5_revelation,
  ch1_s05_5_response_choice: scene_05_5_response_choice,
  ch1_s05_5_react_a: scene_05_5_react_a,
  ch1_s05_5_react_b: scene_05_5_react_b,
  ch1_s05_5_react_c: scene_05_5_react_c,
  ch1_s05_5_end: scene_05_5_end,
  ch1_s05_5_akira_comment: scene_05_5_akira_comment,
  ch1_s05_5_inner_voice: scene_05_5_inner_voice,
  ch1_s05_5_journal: scene_05_5_journal,
};
