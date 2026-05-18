import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ5「みのりの本音」
// 依拠: design/05-chapter1-script.md コマ5 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_05_narration: SceneData = {
  scene_id: "ch1_s05_narration",
  type: "narration",
  messages: [
    {
      text: "みのりが、もう一度来た。\n呼ばれたわけじゃなく、自分から。\n知深がコーヒーを二つ置いた。",
    },
    {
      text: "みのりは一口飲んで、少し間をおいてから口を開いた。",
    },
  ],
  next_scene: "ch1_s05_minori_speaks",
};

export const scene_05_minori_speaks: SceneData = {
  scene_id: "ch1_s05_minori_speaks",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……考えてたんですよ、ずっと",
      pose: "calm",
    },
    {
      character: "minori",
      text: "友達に直接聞くか、聞かないか。どっちにしようか、ずっと悩んでて",
      pose: "tense",
    },
    {
      character: "minori",
      text: "でも、なんか……直接聞くかどうかより先に、引っかかることがあって",
      pose: "thinking",
    },
    {
      character: "minori",
      text: "……私、何が怖かったんだろう、って",
      pose: "looking_down",
    },
    {
      character: "minori",
      text: "直接聞いて、もし本当に私のことだったら……どう思う？って聞かれたら、私、答えられる気がしなくて",
      pose: "tense",
    },
    {
      character: "minori",
      text: "\"あなたといると疲れる\"って言われたとして。……私、その\"なんで疲れさせてたのか\"が、怖かったのかな",
      pose: "voice_changes",
    },
    {
      character: "minori",
      text: "……自分がどんなふうに見られてるか、怖くて。だから投稿を見たとき、瞬間的に\"私のことだ\"って思ったのかも",
      pose: "looking_away",
    },
    {
      character: "minori",
      text: "……なんか、探偵さんに相談に来て、全然関係ないことしゃべってますね、私",
      pose: "embarrassed",
    },
  ],
  next_scene: "ch1_s05_response_choice",
};

export const scene_05_response_choice: SceneData = {
  scene_id: "ch1_s05_response_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "関係ないことじゃないと思う",
      next_scene: "ch1_s05a_react",
    },
    {
      key: "B",
      label: "……聞いていて良かった",
      next_scene: "ch1_s05b_react",
    },
    {
      key: "C",
      label: "（何も言わず、ただ頷く）",
      next_scene: "ch1_s05c_react",
    },
  ],
};

export const scene_05a_react: SceneData = {
  scene_id: "ch1_s05a_react",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……そうですかね",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s05_minori_resolve",
};

export const scene_05b_react: SceneData = {
  scene_id: "ch1_s05b_react",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……ありがとうございます",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s05_minori_resolve",
};

export const scene_05c_react: SceneData = {
  scene_id: "ch1_s05c_react",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……なんか、うん",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s05_minori_resolve",
};

export const scene_05_minori_resolve: SceneData = {
  scene_id: "ch1_s05_minori_resolve",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "直接聞くかどうかは、まだわかりません。でも……何を自分が怖がってたのかは、なんかわかった気がします",
      pose: "calm",
    },
    {
      character: "minori",
      text: "もう少し考えてみます。ありがとうございました",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s05_inner_voice_1",
};

export const scene_05_inner_voice_1: SceneData = {
  scene_id: "ch1_s05_inner_voice_1",
  type: "narration",
  messages: [
    {
      text: "（みのりの「本当の問い」は……最初に考えていたものと、変わった気がする）",
    },
  ],
  next_scene: "ch1_s05_qcard_choice",
};

// 問いカードの書き換え選択

export const scene_05_qcard_choice: SceneData = {
  scene_id: "ch1_s05_qcard_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "問いを書き直してみる",
      status_delta: { question_power: 3 },
      next_scene: "ch1_s05_rewrite",
    },
    {
      key: "B",
      label: "そのままにする",
      next_scene: "ch1_s05_akira_challenge",
    },
  ],
};

export const scene_05_rewrite: SceneData = {
  scene_id: "ch1_s05_rewrite",
  type: "question_card",
  messages: [
    {
      character: "yu",
      text: "問いカードを書き直してみましょう。今のあなたが思うみのりの「本当の問い」を",
      pose: "casual",
    },
  ],
  journal_prompt: "みのりの「本当の問い」——今のあなたの言葉で書き直してみてください",
  requires_question_card: true,
  next_scene: "ch1_s05_akira_changed",
};

export const scene_05_akira_changed: SceneData = {
  scene_id: "ch1_s05_akira_changed",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "……変わったな",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s05_case_choice",
};

export const scene_05_akira_challenge: SceneData = {
  scene_id: "ch1_s05_akira_challenge",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "それでいいか？",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "問いは変わって当然だ。最初から正しい問いを立てられた人間を、俺は見たことがない",
      pose: "expressionless",
    },
  ],
  next_scene: "ch1_s05_case_choice",
};

// ケースの選択（コア分岐）

export const scene_05_case_choice: SceneData = {
  scene_id: "ch1_s05_case_choice",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "みのり、帰ったね。で……このケース、どうする？",
      pose: "casual",
    },
    {
      character: "yu",
      text: "みのりは『わかった気がします』って言ってた。そこでケース閉じる？",
      pose: "listening",
    },
  ],
  choices: [
    {
      key: "A",
      label: "ケースを閉じる",
      next_scene: "ch1_s05_journal_close",
    },
    {
      key: "B",
      label: "もっと深く調べる",
      status_delta: { question_power: 5 },
      flag_updates: [{ key: "ROOT_DIGGER_FLAG", delta: 1 }],
      next_scene: "ch1_s05_journal_dig",
    },
  ],
};

// 標準ルート（閉じる）

export const scene_05_journal_close: SceneData = {
  scene_id: "ch1_s05_journal_close",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "この依頼は、『解決した』と思いますか。\nあなたの言葉で、教えてください",
      pose: "gentle",
    },
  ],
  journal_prompt: "この依頼は、「解決した」と思いますか。あなたの言葉で、教えてください",
  requires_journal: true,
  next_scene: "ch1_s06_narration",
};

// 深掘りルート（隠しコマ5.5へ）

export const scene_05_journal_dig: SceneData = {
  scene_id: "ch1_s05_journal_dig",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "この依頼は、『解決した』と思いますか。\nあなたの言葉で、教えてください",
      pose: "gentle",
    },
  ],
  journal_prompt: "この依頼は、「解決した」と思いますか。あなたの言葉で、教えてください",
  requires_journal: true,
  next_scene: "ch1_s05_5_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_05: Record<string, SceneData> = {
  ch1_s05_narration: scene_05_narration,
  ch1_s05_minori_speaks: scene_05_minori_speaks,
  ch1_s05_response_choice: scene_05_response_choice,
  ch1_s05a_react: scene_05a_react,
  ch1_s05b_react: scene_05b_react,
  ch1_s05c_react: scene_05c_react,
  ch1_s05_minori_resolve: scene_05_minori_resolve,
  ch1_s05_inner_voice_1: scene_05_inner_voice_1,
  ch1_s05_qcard_choice: scene_05_qcard_choice,
  ch1_s05_rewrite: scene_05_rewrite,
  ch1_s05_akira_changed: scene_05_akira_changed,
  ch1_s05_akira_challenge: scene_05_akira_challenge,
  ch1_s05_case_choice: scene_05_case_choice,
  ch1_s05_journal_close: scene_05_journal_close,
  ch1_s05_journal_dig: scene_05_journal_dig,
};
