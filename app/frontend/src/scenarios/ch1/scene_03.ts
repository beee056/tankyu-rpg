import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ3「問いを立てる」— v2完全版
// 依拠: design/05-chapter1-script.md コマ3 全文
// v2追加:
//   問いカードA2/A3/自由記述: auto_evidence [ev_ch1_06]
//   ミニ推理①シーン追加 (ch1_s03_deduction_mini): type=deduction_mini
//   requires_journal: false
// ─────────────────────────────────────────────────────────────────────────────

export const scene_03_narration: SceneData = {
  scene_id: "ch1_s03_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "コルクボードは何もないときより、\n何かが貼られているときのほうが、\n不思議と広く見える。",
    },
    {
      text: "遊は情報カードを渡しながら言った。\n「並べてみて。答えを出そうとしなくていいから」",
    },
  ],
  next_scene: "ch1_s03_cork_intro",
};

export const scene_03_cork_intro: SceneData = {
  scene_id: "ch1_s03_cork_intro",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "どこに何を置くかは自由だよ。関係ありそうなものを近くに並べたり、矢印つけたり",
      pose: "casual",
    },
    {
      character: "yu",
      text: "これとこれ、なんか関係ある気がしない？",
      pose: "listening",
    },
    {
      character: "yu",
      text: "……感覚でいい。答えを出そうとしなくていい。並べることが大事",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s03_corkboard",
};

export const scene_03_corkboard: SceneData = {
  scene_id: "ch1_s03_corkboard",
  type: "cork_board",
  requires_journal: false,
  messages: [
    { text: "投稿は主語がない。特定の誰かを指しているのか不明" },
    { text: "みのりの確信と、投稿の曖昧さにズレがある" },
    { text: "言えなかった。傷つけてると思われたくなかった" },
    { text: "親友の過去投稿：疲れに関する投稿が散発的にある" },
  ],
  next_scene: "ch1_s03_akira_appear",
};

export const scene_03_akira_appear: SceneData = {
  scene_id: "ch1_s03_akira_appear",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "で、本当の問いは何？",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "みのりの問い、ということだ。彼女が聞きたいのは何だ",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s03_question_method_choice",
};

export const scene_03_question_method_choice: SceneData = {
  scene_id: "ch1_s03_question_method_choice",
  type: "choice",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "問いカードっていって……みのりが『本当に聞きたいこと』を書く。最初は適当でもいい。後で変えられるから",
      pose: "casual",
    },
  ],
  choices: [
    {
      key: "A",
      label: "選択肢から選ぶ",
      next_scene: "ch1_s03a_select_choice",
    },
    {
      key: "B",
      label: "自由記述で書く",
      status_delta: { question_power: 2 },
      next_scene: "ch1_s03b_free_write",
    },
  ],
};

// ── ルートA ──────────────────────────────────────────────────────────────────

export const scene_03a_select_choice: SceneData = {
  scene_id: "ch1_s03a_select_choice",
  type: "choice",
  requires_journal: false,
  messages: [],
  choices: [
    {
      key: "A",
      label: "友達は私のことを嫌いなの？",
      next_scene: "ch1_s03a_react_a1",
    },
    {
      key: "B",
      label: "私はなぜこんなに傷つくの？",
      // v2: A2選択 → ev_ch1_06 自動付与（auto_evidence は react シーン側で付与）
      next_scene: "ch1_s03a_react_a2",
    },
    {
      key: "C",
      label: "私はこの友達関係に何を求めていたの？",
      // v2: A3選択 → ev_ch1_06 自動付与（auto_evidence は react シーン側で付与）
      next_scene: "ch1_s03a_react_a3",
    },
  ],
};

export const scene_03a_react_a1: SceneData = {
  scene_id: "ch1_s03a_react_a1",
  type: "dialogue",
  requires_journal: false,
  // A1 = 「確認」扱い → ev_ch1_06 は付与しない
  messages: [
    {
      character: "akira",
      text: "それは問いじゃない。確認だ",
      pose: "expressionless",
    },
  ],
  next_scene: "ch1_s03_inner_voice_a1",
};

export const scene_03_inner_voice_a1: SceneData = {
  scene_id: "ch1_s03_inner_voice_a1",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（確認……問い、じゃないのか）" }],
  next_scene: "ch1_s03_yu_followup",
};

/** A2選択後 — v2: auto_evidence で ev_ch1_06 付与 */
export const scene_03a_react_a2: SceneData = {
  scene_id: "ch1_s03a_react_a2",
  type: "dialogue",
  requires_journal: false,
  auto_evidence: ["ev_ch1_06"],
  messages: [
    {
      character: "akira",
      text: "……少し、近づいた",
      pose: "slight_reaction",
    },
  ],
  next_scene: "ch1_s03_yu_followup",
};

/** A3選択後 — v2: auto_evidence で ev_ch1_06 付与 */
export const scene_03a_react_a3: SceneData = {
  scene_id: "ch1_s03a_react_a3",
  type: "dialogue",
  requires_journal: false,
  auto_evidence: ["ev_ch1_06"],
  messages: [
    {
      character: "akira",
      text: "続けろ",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s03_yu_followup",
};

// ── ルートB ──────────────────────────────────────────────────────────────────

export const scene_03b_free_write: SceneData = {
  scene_id: "ch1_s03b_free_write",
  type: "question_card",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "みのりが「本当に聞きたいこと」を、あなたの言葉で書いてみてください",
      pose: "casual",
    },
  ],
  journal_prompt: "みのりが本当に聞きたいこと——あなたの言葉で書いてみてください",
  requires_question_card: true,
  next_scene: "ch1_s03b_akira_react",
};

/** 自由記述後 — v2: auto_evidence で ev_ch1_06 付与（深掘り記述として扱う） */
export const scene_03b_akira_react: SceneData = {
  scene_id: "ch1_s03b_akira_react",
  type: "dialogue",
  requires_journal: false,
  auto_evidence: ["ev_ch1_06"],
  messages: [
    {
      character: "akira",
      text: "一番最初に書いた問いと、それは同じか？",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "コマ1で、お前は何を書いた。今書いた問いと比べてみろ",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s03_yu_followup",
};

// ── 共通 ──────────────────────────────────────────────────────────────────────

export const scene_03_yu_followup: SceneData = {
  scene_id: "ch1_s03_yu_followup",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "問いって最初は浅いんだよね。深い問いほど、答えるのが怖くなる",
      pose: "casual",
    },
    {
      character: "yu",
      text: "だから最初の問いが浅いのは普通のことで",
      pose: "casual",
    },
    {
      character: "yu",
      text: "大事なのは……そこで止まらないことだと思ってる。俺も毎回止まりそうになるんだけど",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s03_inner_voice",
};

export const scene_03_inner_voice: SceneData = {
  scene_id: "ch1_s03_inner_voice",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（問いカードに書いた一文。これで合ってるのか、わからない。でも御堂は「確認だ」と言った。私が書いたのは……確認だったのかもしれない）",
    },
  ],
  next_scene: "ch1_s03_journal",
};

/** コマ3末・内省③ — v2: requires_journal: false（任意化） */
export const scene_03_journal: SceneData = {
  scene_id: "ch1_s03_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "自分自身のすれ違い体験を思い浮かべて。そのとき、あなたの「本当の問い」は何だったと思いますか。気になったことがあれば、ジャーナルに書いてもいい",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "自分のすれ違い体験で、本当の問いは何だったと思う？",
  requires_journal: false,
  next_scene: "ch1_s03_deduction_mini",
};

/** ミニ推理① — v2新規: コマ3終了後、コマ4への分岐を決める */
export const scene_03_deduction_mini: SceneData = {
  scene_id: "ch1_s03_deduction_mini",
  type: "deduction_mini",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "……で、どっちから掘る？みのりの気持ちか、桐嶋の行動か",
      pose: "casual",
    },
  ],
  choices: [
    {
      key: "A",
      label: "みのりの気持ちを中心に追う",
      next_scene: "ch1_s04_narration",
    },
    {
      key: "B",
      label: "桐嶋の側から状況を確認する",
      requiredEvidence: ["ev_ch1_04"],
      hint: "桐嶋の証言がまだない",
      next_scene: "ch1_s04_narration",
    },
  ],
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_03: Record<string, SceneData> = {
  ch1_s03_narration: scene_03_narration,
  ch1_s03_cork_intro: scene_03_cork_intro,
  ch1_s03_corkboard: scene_03_corkboard,
  ch1_s03_akira_appear: scene_03_akira_appear,
  ch1_s03_question_method_choice: scene_03_question_method_choice,
  ch1_s03a_select_choice: scene_03a_select_choice,
  ch1_s03a_react_a1: scene_03a_react_a1,
  ch1_s03_inner_voice_a1: scene_03_inner_voice_a1,
  ch1_s03a_react_a2: scene_03a_react_a2,
  ch1_s03a_react_a3: scene_03a_react_a3,
  ch1_s03b_free_write: scene_03b_free_write,
  ch1_s03b_akira_react: scene_03b_akira_react,
  ch1_s03_yu_followup: scene_03_yu_followup,
  ch1_s03_inner_voice: scene_03_inner_voice,
  ch1_s03_journal: scene_03_journal,
  ch1_s03_deduction_mini: scene_03_deduction_mini,
};
