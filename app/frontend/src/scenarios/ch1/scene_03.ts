import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ3「問いを立てる」
// 依拠: design/05-chapter1-script.md コマ3 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_03_narration: SceneData = {
  scene_id: "ch1_s03_narration",
  type: "narration",
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
      next_scene: "ch1_s03a_react_a2",
    },
    {
      key: "C",
      label: "私はこの友達関係に何を求めていたの？",
      next_scene: "ch1_s03a_react_a3",
    },
  ],
};

export const scene_03a_react_a1: SceneData = {
  scene_id: "ch1_s03a_react_a1",
  type: "dialogue",
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
  messages: [{ text: "（確認……問い、じゃないのか）" }],
  next_scene: "ch1_s03_yu_followup",
};

export const scene_03a_react_a2: SceneData = {
  scene_id: "ch1_s03a_react_a2",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "……少し、近づいた",
      pose: "slight_reaction",
    },
  ],
  next_scene: "ch1_s03_yu_followup",
};

export const scene_03a_react_a3: SceneData = {
  scene_id: "ch1_s03a_react_a3",
  type: "dialogue",
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

export const scene_03b_akira_react: SceneData = {
  scene_id: "ch1_s03b_akira_react",
  type: "dialogue",
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
  messages: [
    {
      text: "（問いカードに書いた一文。これで合ってるのか、わからない。でも御堂は「確認だ」と言った。私が書いたのは……確認だったのかもしれない）",
    },
  ],
  next_scene: "ch1_s03_journal",
};

export const scene_03_journal: SceneData = {
  scene_id: "ch1_s03_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "あなた自身も、誰かとのすれ違いで傷ついたことはありますか。\nそのとき、あなたの『本当の問い』は何だったと思いますか",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "あなた自身も、誰かとのすれ違いで傷ついたことはありますか。そのとき、あなたの「本当の問い」は何だったと思いますか",
  requires_journal: true,
  next_scene: "ch1_s04_narration",
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
};
