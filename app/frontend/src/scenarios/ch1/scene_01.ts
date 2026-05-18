import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ1「灯台に来た日」— 完全版
// 依拠: design/05-chapter1-script.md コマ1 全文
// ─────────────────────────────────────────────────────────────────────────────

/** システムナレーション（背景描写） */
export const scene_01_narration: SceneData = {
  scene_id: "ch1_s01_narration",
  type: "narration",
  messages: [
    {
      text: "坂の中腹に、少し傾いた白い建物がある。\nかつては洋菓子屋だったらしく、\n入口のドアには古いガラスがはまっていて、\n光の角度によっては「ヨアケ」という文字が逆に透けて見える。",
    },
    {
      text: "コーヒーの香りがした。",
    },
  ],
  next_scene: "ch1_s01_chifuka_welcome",
};

/** 知深の挨拶 */
export const scene_01_chifuka_welcome: SceneData = {
  scene_id: "ch1_s01_chifuka_welcome",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "いらっしゃい。ヨアケ探偵社です。……ここに来た理由を、少し聞いてもいいですか",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_motivation_choice",
};

/** 来所動機選択 */
export const scene_01_motivation_choice: SceneData = {
  scene_id: "ch1_s01_motivation_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "なんとなく、面白そうだったから",
      flag_updates: [{ key: "JOIN_MOTIVATION_FUN", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_a",
    },
    {
      key: "B",
      label: "誰かの力になりたかったから",
      flag_updates: [{ key: "JOIN_MOTIVATION_HELP", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_b",
    },
    {
      key: "C",
      label: "自分自身に、答えを出したい問いがあるから",
      flag_updates: [{ key: "JOIN_MOTIVATION_QUESTION", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_c",
    },
    {
      key: "D",
      label: "灰島さんに、来てみたら？と言われたから",
      flag_updates: [{ key: "JOIN_MOTIVATION_INVITED", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_d",
    },
  ],
};

/** 知深の反応 A */
export const scene_01_chifuka_react_a: SceneData = {
  scene_id: "ch1_s01_chifuka_react_a",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……面白そう、か。それは正直な動機ね",
      pose: "slight_smile",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** 知深の反応 B */
export const scene_01_chifuka_react_b: SceneData = {
  scene_id: "ch1_s01_chifuka_react_b",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "人を助けたいという気持ちは、本物ですか？",
      pose: "pause",
    },
    {
      character: "chifuka",
      text: "……答えは後でいいです。先に所長を呼んでくる",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** 知深の反応 C */
export const scene_01_chifuka_react_c: SceneData = {
  scene_id: "ch1_s01_chifuka_react_c",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "自分の問い……",
      pose: "surprised",
    },
    {
      character: "chifuka",
      text: "それは、簡単には答えが出ませんよ。それでも？",
      pose: "serious",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** 知深の反応 D */
export const scene_01_chifuka_react_d: SceneData = {
  scene_id: "ch1_s01_chifuka_react_d",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "遊さんが。……あの人、また勝手なことを",
      pose: "half_amused",
    },
    {
      character: "chifuka",
      text: "まあ、来てしまったなら仕方ない。座って",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** 遊の登場 */
export const scene_01_yu_enter: SceneData = {
  scene_id: "ch1_s01_yu_enter",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "あ、来た来た。えーっと、今日から見習いの子？",
      pose: "casual",
    },
    {
      character: "yu",
      text: "俺、灰島遊。先輩探偵ってことになってるけど、そんな大層なもんじゃないよ。基本、調べてばっかり",
      pose: "casual",
    },
    {
      character: "yu",
      text: "所長は……今2階で寝てるか本読んでるかどっちかだと思う。呼んでくる",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s01_coffee_choice",
};

/** コーヒー選択（どちらを選んでも同じ結果） */
export const scene_01_coffee_choice: SceneData = {
  scene_id: "ch1_s01_coffee_choice",
  type: "choice",
  messages: [
    {
      character: "chifuka",
      text: "コーヒー、飲みますか",
      pose: "calm",
    },
  ],
  choices: [
    {
      key: "A",
      label: "はい、いただきます",
      next_scene: "ch1_s01_coffee_react_a",
    },
    {
      key: "B",
      label: "いや、大丈夫です",
      next_scene: "ch1_s01_coffee_react_b",
    },
  ],
};

export const scene_01_coffee_react_a: SceneData = {
  scene_id: "ch1_s01_coffee_react_a",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……あなたが選んでも選ばなくても、置いておきますから",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_akira_enter",
};

export const scene_01_coffee_react_b: SceneData = {
  scene_id: "ch1_s01_coffee_react_b",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "遠慮しなくていいです。置いておくので",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_akira_enter",
};

/** 御堂の登場 */
export const scene_01_akira_enter: SceneData = {
  scene_id: "ch1_s01_akira_enter",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "……見習い",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "見習いに仕事はない",
      pose: "expressionless",
    },
    {
      character: "yu",
      text: "いや、まあ、でも——",
      pose: "flustered",
    },
    {
      character: "akira",
      text: "ここに来る人間の話を聞いていろ。それだけでいい",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "聞くことが仕事の第一歩だ。何かを解決しようとするな。まず聞け",
      pose: "expressionless",
    },
  ],
  next_scene: "ch1_s01_inner_voice_1",
};

/** 主人公の内語 */
export const scene_01_inner_voice_1: SceneData = {
  scene_id: "ch1_s01_inner_voice_1",
  type: "narration",
  messages: [
    {
      text: "（この人が、御堂 煌。ヨアケ探偵社の所長。……聞くことが仕事の第一歩、か）",
    },
  ],
  next_scene: "ch1_s01_minori_enter",
};

/** みのりの来訪 */
export const scene_01_minori_enter: SceneData = {
  scene_id: "ch1_s01_minori_enter",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……あの、ここ、ヨアケ探偵社、ですよね",
      pose: "anxious",
    },
    {
      character: "chifuka",
      text: "はい。どうぞ、座って",
      pose: "gentle",
    },
    {
      character: "minori",
      text: "探偵事務所って……こんな感じなんですね",
      pose: "looking_around",
    },
    {
      character: "yu",
      text: "探偵事務所つっても、謎解きとかじゃないんだけどね。……相談なら、聞けると思うよ",
      pose: "casual",
    },
    {
      character: "minori",
      text: "……相談、なんですけど",
      pose: "anxious",
    },
  ],
  next_scene: "ch1_s01_akira_listen",
};

/** みのりの話 */
export const scene_01_akira_listen: SceneData = {
  scene_id: "ch1_s01_akira_listen",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "話してみて",
      pose: "quiet",
    },
    {
      character: "minori",
      text: "親友のSNS……に、なんか、自分のことみたいな文章が、あって",
      pose: "tense",
    },
    {
      character: "minori",
      text: "\"いつも自分のことしか考えてない人が、たまにいるよね\"って。そういう投稿で",
      pose: "tense",
    },
    {
      character: "yu",
      text: "……最近？",
      pose: "listening",
    },
    {
      character: "minori",
      text: "3日前。直接聞こうとしたけど、なんか……怖くて",
      pose: "self_deprecating",
    },
    {
      character: "minori",
      text: "変ですよね。確認すればいいだけなのに",
      pose: "self_deprecating",
    },
    {
      character: "akira",
      text: "変じゃない",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "で、本当の問いは何？",
      pose: "quiet",
    },
    {
      character: "minori",
      text: "……え？",
      pose: "confused",
    },
    {
      character: "chifuka",
      text: "今日はまず、話を聞かせてください。答えを急ぐ必要はない",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s01_inner_voice_2",
};

/** コマ1終了の内語 */
export const scene_01_inner_voice_2: SceneData = {
  scene_id: "ch1_s01_inner_voice_2",
  type: "narration",
  messages: [
    {
      text: "（御堂は……みのりの話を聞いて、「本当の問いは何？」と言った。みのりが持ち込んだのは、友達への疑いのはずなのに）",
    },
    {
      text: "（なんか、違う気がする。でも何が違うのかは、わからない）",
    },
  ],
  next_scene: "ch1_s01_journal",
};

/** コマ1末・内省① */
export const scene_01_journal: SceneData = {
  scene_id: "ch1_s01_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "……みのりの話を聞いて、あなたはどう感じましたか。\nみのりが本当に答えを求めているのは、何だと思いますか",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "みのりの話を聞いて、あなたはどう感じましたか。みのりが本当に答えを求めているのは、何だと思いますか",
  requires_journal: true,
  next_scene: "ch1_s02_narration",
};

// ── エクスポート: コマ1の全シーンを順序で並べたマップ ──────────────────────────
export const SCENE_MAP: Record<string, SceneData> = {
  ch1_s01_narration: scene_01_narration,
  ch1_s01_chifuka_welcome: scene_01_chifuka_welcome,
  ch1_s01_motivation_choice: scene_01_motivation_choice,
  ch1_s01_chifuka_react_a: scene_01_chifuka_react_a,
  ch1_s01_chifuka_react_b: scene_01_chifuka_react_b,
  ch1_s01_chifuka_react_c: scene_01_chifuka_react_c,
  ch1_s01_chifuka_react_d: scene_01_chifuka_react_d,
  ch1_s01_yu_enter: scene_01_yu_enter,
  ch1_s01_coffee_choice: scene_01_coffee_choice,
  ch1_s01_coffee_react_a: scene_01_coffee_react_a,
  ch1_s01_coffee_react_b: scene_01_coffee_react_b,
  ch1_s01_akira_enter: scene_01_akira_enter,
  ch1_s01_inner_voice_1: scene_01_inner_voice_1,
  ch1_s01_minori_enter: scene_01_minori_enter,
  ch1_s01_akira_listen: scene_01_akira_listen,
  ch1_s01_inner_voice_2: scene_01_inner_voice_2,
  ch1_s01_journal: scene_01_journal,
};

export const CHAPTER1_START_SCENE = "ch1_s01_narration";
