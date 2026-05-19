import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ2「情報を集める」
// 依拠: design/05-chapter1-script.md コマ2 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_02_narration: SceneData = {
  scene_id: "ch1_s02_narration",
  type: "narration",
  messages: [
    {
      text: "調査室のコルクボードは大きくて、今は何もない。\n遊が手帳サイズのカードを一枚、主人公に渡した。",
    },
    {
      text: "「情報カード。気になったことを書いといて。\n何でもいいよ。感覚でも」",
    },
  ],
  next_scene: "ch1_s02_yu_intro",
};

export const scene_02_yu_intro: SceneData = {
  scene_id: "ch1_s02_yu_intro",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "えーっと、第一弾。何から調べようか、って話なんだけど",
      pose: "casual",
    },
    {
      character: "yu",
      text: "選択肢3つある。①みのりにもっと直接話を聞く。②SNSの投稿を俺が引っ張ってくるから、一緒に読む。③親友の子に話を聞く——これは俺が代わりに当たってくる",
      pose: "casual",
    },
    {
      character: "yu",
      text: "授業内ってことで今は2つしか選べない。どうする？",
      pose: "listening",
    },
  ],
  next_scene: "ch1_s02_collect_choice",
};

export const scene_02_collect_choice: SceneData = {
  scene_id: "ch1_s02_collect_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "みのりにもっと話を聞く",
      status_delta: { question_power: 3 },
      next_scene: "ch1_s02a_minori_start",
    },
    {
      key: "B",
      label: "SNS投稿を調べる",
      status_delta: { explore_power: 3 },
      next_scene: "ch1_s02b_sns_start",
    },
    {
      key: "C",
      label: "親友の側に話を聞く（遊が代行）",
      status_delta: { explore_power: 2, connect_power: 2 },
      next_scene: "ch1_s02c_friend_start",
    },
  ],
};

// ── ルートA ──────────────────────────────────────────────────────────────────

export const scene_02a_minori_start: SceneData = {
  scene_id: "ch1_s02a_minori_start",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "そっちか。じゃあ俺はSNSのほうを確認してくる。みのりと話してきて",
      pose: "casual",
    },
    {
      character: "minori",
      text: "……何を聞きたいですか",
      pose: "tense",
    },
  ],
  next_scene: "ch1_s02a_question_choice",
};

export const scene_02a_question_choice: SceneData = {
  scene_id: "ch1_s02a_question_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "その親友と、最近何かあった？",
      next_scene: "ch1_s02a_react_a1",
    },
    {
      key: "B",
      label: "その投稿を見たとき、最初にどう思った？",
      next_scene: "ch1_s02a_react_a2",
    },
  ],
};

export const scene_02a_react_a1: SceneData = {
  scene_id: "ch1_s02a_react_a1",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……あった、といえばあったかも。先月の文化祭の準備のとき、一回だけ言い合いになって。でも仲直りしたんです",
      pose: "thinking",
    },
    {
      character: "minori",
      text: "でも、そのあとから……なんか空気が変わった気はしてた",
      pose: "tense",
    },
  ],
  next_scene: "ch1_s02a_minori_more",
};

export const scene_02a_react_a2: SceneData = {
  scene_id: "ch1_s02a_react_a2",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……最初は、まさかって思いました。うちの子がそんなこと書くわけないって",
      pose: "looking_down",
    },
    {
      character: "minori",
      text: "でも読み返すたびに、なんかやっぱり私のことな気がしてきて",
      pose: "tense",
    },
  ],
  next_scene: "ch1_s02a_minori_more",
};

export const scene_02a_minori_more: SceneData = {
  scene_id: "ch1_s02a_minori_more",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……ずっと仲良かったんですよ、中学から。なんかズレてきた、っていうのは、感じてたけど",
      pose: "looking_away",
    },
    {
      character: "minori",
      text: "でも、言えなかった。怖くて",
      pose: "tense",
    },
    {
      character: "minori",
      text: "友達に、傷つけてるって思われたくなかったんですよね、たぶん",
      pose: "bitter_smile",
    },
  ],
  next_scene: "ch1_s02_end_common",
};

// ── ルートB ──────────────────────────────────────────────────────────────────

export const scene_02b_sns_start: SceneData = {
  scene_id: "ch1_s02b_sns_start",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "オーケー。引っ張るから、一緒に読もう",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s02b_post_display",
};

export const scene_02b_post_display: SceneData = {
  scene_id: "ch1_s02b_post_display",
  type: "narration",
  messages: [
    {
      text: "【投稿】\n「いつも自分のことしか考えてない人ってたまにいるよね。一緒にいて疲れるときがある。でもなかなか言えないんだよなあ。難しい。」\n─ 3日前 / いいね12件 / コメント0",
    },
  ],
  next_scene: "ch1_s02b_yu_analysis",
};

export const scene_02b_yu_analysis: SceneData = {
  scene_id: "ch1_s02b_yu_analysis",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……微妙だね。これがみのりのことを指してるかどうか、文章だけじゃわからない",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "みのりは『自分のことだと思った』って言ってたけど、客観的に見ると……確かにそうとも取れるし、全然別の話かもしれない",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "……この子、過去の投稿どんな感じか見てみようか",
      pose: "casual",
    },
    {
      character: "yu",
      text: "……真面目な子みたいだね。こういう「しんどい」系の投稿、たまにある。みのりへの文句というより……なんか自分が疲れてる感じ？",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s02_end_common",
};

// ── ルートC ──────────────────────────────────────────────────────────────────

export const scene_02c_friend_start: SceneData = {
  scene_id: "ch1_s02c_friend_start",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "了解。じゃあ俺、その子に話聞いてくる。名前と連絡先、知深さんに確認してくるね",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s02c_yu_returns",
};

export const scene_02c_yu_returns: SceneData = {
  scene_id: "ch1_s02c_yu_returns",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "話聞いてきた。その子——桐嶋さんっていうんだけど",
      pose: "casual",
    },
    {
      character: "yu",
      text: "\"別に嫌いなわけじゃない、最近ちょっと疲れてて\"……って",
      pose: "listening",
    },
    {
      character: "yu",
      text: "あと、なんかもじもじしながら言ってたんだけど……\"みのりには心配かけたくなかった\"とも言ってた",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "……面白いよね。みのりは『傷ついている、親友が自分を嫌いになったかもしれない』と思ってる。でも親友は『自分が疲れてる、みのりには心配かけたくない』と思ってる",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "問題が……ズレてるんだよね。二人それぞれが別の問いを持ってる",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s02_end_common",
};

// ── 共通エンディング ───────────────────────────────────────────────────────────

export const scene_02_end_common: SceneData = {
  scene_id: "ch1_s02_end_common",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "とりあえず情報は集まった。次は……コルクボードに並べてみようか",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s02_inner_voice",
};

export const scene_02_inner_voice: SceneData = {
  scene_id: "ch1_s02_inner_voice",
  type: "narration",
  messages: [
    {
      text: "（情報カードが何枚かある。でもこれで何がわかったんだろう。みのりの友達は本当に、みのりのことが嫌いなのか。それとも——）",
    },
  ],
  next_scene: "ch1_s02_journal",
};

export const scene_02_journal: SceneData = {
  scene_id: "ch1_s02_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "集めた情報の中で、一番気になったのはどれですか。なぜそれが気になりましたか",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "集めた情報で一番気になったのはどれ？なぜそれが気になった？",
  requires_journal: true,
  next_scene: "ch1_s03_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_02: Record<string, SceneData> = {
  ch1_s02_narration: scene_02_narration,
  ch1_s02_yu_intro: scene_02_yu_intro,
  ch1_s02_collect_choice: scene_02_collect_choice,
  ch1_s02a_minori_start: scene_02a_minori_start,
  ch1_s02a_question_choice: scene_02a_question_choice,
  ch1_s02a_react_a1: scene_02a_react_a1,
  ch1_s02a_react_a2: scene_02a_react_a2,
  ch1_s02a_minori_more: scene_02a_minori_more,
  ch1_s02b_sns_start: scene_02b_sns_start,
  ch1_s02b_post_display: scene_02b_post_display,
  ch1_s02b_yu_analysis: scene_02b_yu_analysis,
  ch1_s02c_friend_start: scene_02c_friend_start,
  ch1_s02c_yu_returns: scene_02c_yu_returns,
  ch1_s02_end_common: scene_02_end_common,
  ch1_s02_inner_voice: scene_02_inner_voice,
  ch1_s02_journal: scene_02_journal,
};
