import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ1「灯台に来た日」— v2.5演出版
// 依拠: design/05-chapter1-script.md コマ1 全文
// v2追加: highlights(ev_ch1_01, ev_ch1_02), requires_journal: false
// v2.5追加: 背景・BGM・SE・立ち絵演出・テキストウェイト (B01〜B15)
// ─────────────────────────────────────────────────────────────────────────────

// ── B01 章タイトル ─────────────────────────────────────────────────────────────
export const scene_01_chapter_title: SceneData = {
  scene_id: "ch1_s01_chapter_title",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      // B01: 黒背景 + 章タイトルフェードイン + BGM start
      text: "",
      background: "#0E0A08",
      bgm: "start bgm_main 3000ms fadeIn vol=30",
      chapter_title: "第1章 — 灯台に来た日",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: "ch1_s01_narration",
};

// ── B02/B03 システムナレーション（背景描写） ────────────────────────────────────
/** B02: 坂の中腹 / B03: ヨアケ外観 */
export const scene_01_narration: SceneData = {
  scene_id: "ch1_s01_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      // B02: bg_slope_dusk crossfade、地の文ボックス
      text: "坂の中腹に、少し傾いた白い建物がある。\nかつては洋菓子屋だったらしく、\n入口のドアには古いガラスがはまっていて、\n光の角度によっては「ヨアケ」という文字が逆に透けて見える。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      text_pace: { punctuation_wait_ms: 140, line_pause_ms: 500 },
    },
    {
      // B03: bg_yoake_exterior crossfade、ガラスフレア演出
      text: "コーヒーの香りがした。",
      background: "/assets/backgrounds/bg_yoake_exterior.png",
      text_pace: { punctuation_wait_ms: 400, line_pause_ms: 500 },
    },
  ],
  next_scene: "ch1_s01_chifuka_welcome",
};

// ── B04 知深の挨拶 ─────────────────────────────────────────────────────────────
/** B04: 事務所内 / 知深登場 */
export const scene_01_chifuka_welcome: SceneData = {
  scene_id: "ch1_s01_chifuka_welcome",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      // B04: bg_office_interior crossfade、知深 slideIn right
      character: "chifuka",
      text: "いらっしゃい。ヨアケ探偵社です。……ここに来た理由を、少し聞いてもいいですか",
      pose: "calm",
      background: "/assets/backgrounds/bg_office_interior.png",
      character_action: {
        actor: "chifuka",
        action: "slideIn",
        expression: "calm",
        position: "right",
      },
    },
  ],
  next_scene: "ch1_s01_motivation_choice",
};

// ── B05 来所動機選択 ──────────────────────────────────────────────────────────
/** B05: 選択肢 stagger演出、tap時 se_click */
export const scene_01_motivation_choice: SceneData = {
  scene_id: "ch1_s01_motivation_choice",
  type: "choice",
  requires_journal: false,
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
      label: "知り合いの先輩に、来てみたら？と誘われたから",
      flag_updates: [{ key: "JOIN_MOTIVATION_INVITED", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_d",
    },
  ],
};

// ── B06 知深の反応 A/B/C/D ───────────────────────────────────────────────────

/** B06: 知深反応A */
export const scene_01_chifuka_react_a: SceneData = {
  scene_id: "ch1_s01_chifuka_react_a",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "……面白そう、か。それは正直な動機ね",
      pose: "slight_smile",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "slight_smile",
        position: "right",
      },
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** B06: 知深反応B */
export const scene_01_chifuka_react_b: SceneData = {
  scene_id: "ch1_s01_chifuka_react_b",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "人を助けたいという気持ちは、本物ですか？",
      pose: "pause",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "pause",
        position: "right",
      },
    },
    {
      character: "chifuka",
      text: "……答えは後でいいです。先に所長を呼んでくる",
      pose: "calm",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "calm",
        position: "right",
      },
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** B06: 知深反応C */
export const scene_01_chifuka_react_c: SceneData = {
  scene_id: "ch1_s01_chifuka_react_c",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "自分の問い……",
      pose: "surprised",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "surprised",
        position: "right",
      },
    },
    {
      character: "chifuka",
      text: "それは、簡単には答えが出ませんよ。それでも？",
      pose: "serious",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "serious",
        position: "right",
      },
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

/** B06: 知深反応D */
export const scene_01_chifuka_react_d: SceneData = {
  scene_id: "ch1_s01_chifuka_react_d",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "遊さんが。……あの人、また勝手なことを",
      pose: "half_amused",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "half_amused",
        position: "right",
      },
    },
    {
      character: "chifuka",
      text: "まあ、来てしまったなら仕方ない。座って",
      pose: "calm",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "calm",
        position: "right",
      },
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

// ── B07 遊の登場 ──────────────────────────────────────────────────────────────
/** B07: 遊 slideIn left + BGM vol ramp → 38% */
export const scene_01_yu_enter: SceneData = {
  scene_id: "ch1_s01_yu_enter",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      // B07: chifuka:calm:right 継続 + yu:casual:left slideIn
      character: "yu",
      text: "あ、来た来た。えーっと、今日から見習いの子？",
      pose: "casual",
      bgm: "ramp 38 1500ms",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "left",
      },
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
    {
      character: "yu",
      text: "俺、灰島遊。先輩探偵ってことになってるけど、そんな大層なもんじゃないよ。基本、調べてばっかり",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
    {
      character: "yu",
      text: "所長は……今2階で寝てるか本読んでるかどっちかだと思う。呼んでくる",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
  ],
  next_scene: "ch1_s01_coffee_choice",
};

// ── B08 コーヒー選択 ──────────────────────────────────────────────────────────
/** B08: 選択肢 stagger演出 */
export const scene_01_coffee_choice: SceneData = {
  scene_id: "ch1_s01_coffee_choice",
  type: "choice",
  requires_journal: false,
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

// ── B09 コーヒーの反応 ────────────────────────────────────────────────────────

export const scene_01_coffee_react_a: SceneData = {
  scene_id: "ch1_s01_coffee_react_a",
  type: "dialogue",
  requires_journal: false,
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
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "遠慮しなくていいです。置いておくので",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_akira_enter",
};

// ── B10 御堂の登場（雰囲気の転換） ───────────────────────────────────────────
/** B10: yu slideOut left → akira slideIn left → yu:flustered:right 戻す
 *      BGM duck 18% 600ms → 1500ms後38% 復帰 / ビネット+10% */
export const scene_01_akira_enter: SceneData = {
  scene_id: "ch1_s01_akira_enter",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      // B10: 御堂登場 - yu退場してから akira slideIn
      character: "akira",
      text: "……見習い",
      pose: "expressionless",
      bgm: "duck 18 600ms",
      character_action: {
        actor: "akira",
        action: "slideIn",
        expression: "expressionless",
        position: "left",
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "akira",
      text: "見習いに仕事はない",
      pose: "expressionless",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "yu",
      text: "いや、まあ、でも——",
      pose: "flustered",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "flustered",
        position: "right",
      },
    },
    {
      character: "akira",
      text: "ここに来る人間の話を聞いていろ。それだけでいい",
      pose: "expressionless",
      bgm: "ramp 38 1500ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "akira",
      text: "聞くことが仕事の第一歩だ。何かを解決しようとするな。まず聞け",
      pose: "expressionless",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
  ],
  next_scene: "ch1_s01_inner_voice_1",
};

// ── B11 主人公内語1 ───────────────────────────────────────────────────────────
/** B11: akira:expressionless:left のみ / 内語ボックス */
export const scene_01_inner_voice_1: SceneData = {
  scene_id: "ch1_s01_inner_voice_1",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（この人が、御堂 煌。ヨアケ探偵社の所長。……聞くことが仕事の第一歩、か）",
      text_pace: { punctuation_wait_ms: 140, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s01_minori_enter",
};

// ── B12 みのり来訪 / ev_ch1_01 出現 ──────────────────────────────────────────
/** B12: フェード → minori slideIn from-bottom:center + chifuka:gentle:right + yu:casual:left
 *      「ヨアケ探偵社」ハイライト = 下線+微発光 + se_evidence */
export const scene_01_minori_enter: SceneData = {
  scene_id: "ch1_s01_minori_enter",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      // B12: みのり登場 - 全員フェードから再配置
      character: "minori",
      text: "……あの、ここ、ヨアケ探偵社、ですよね",
      pose: "anxious",
      se: "se_evidence",
      character_action: {
        actor: "minori",
        action: "slideIn",
        expression: "anxious",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
      highlights: [
        {
          word: "ヨアケ探偵社",
          evidenceId: "ev_ch1_01",
          tooltip: "依頼人のようすを記録する",
        },
      ],
    },
    {
      character: "chifuka",
      text: "はい。どうぞ、座って",
      pose: "gentle",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "gentle",
        position: "right",
      },
    },
    {
      character: "minori",
      text: "探偵事務所って……こんな感じなんですね",
      pose: "looking_around",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "探偵事務所つっても、謎解きとかじゃないんだけどね。……相談なら、聞けると思うよ",
      pose: "casual",
      character_action: {
        actor: "yu",
        action: "none",
        expression: "casual",
        position: "left",
      },
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
    {
      character: "minori",
      text: "……相談、なんですけど",
      pose: "anxious",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
  ],
  next_scene: "ch1_s01_akira_listen",
};

// ── B13 みのりの相談 / ev_ch1_02 出現 ────────────────────────────────────────
/** B13: akira:quiet:left / minori:tense:center / yu:listening:right
 *      「変ですよね」直前 BGM duck 25% + pulse highlight + se_evidence */
export const scene_01_akira_listen: SceneData = {
  scene_id: "ch1_s01_akira_listen",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "話してみて",
      pose: "quiet",
      character_action: {
        actor: "akira",
        action: "none",
        expression: "quiet",
        position: "left",
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "minori",
      text: "親友のSNS……に、なんか、自分のことみたいな文章が、あって",
      pose: "tense",
      character_action: {
        actor: "minori",
        action: "none",
        expression: "tense",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
    {
      character: "minori",
      text: "\"いつも自分のことしか考えてない人が、たまにいるよね\"って。そういう投稿で",
      pose: "tense",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "……最近？",
      pose: "listening",
      character_action: {
        actor: "yu",
        action: "none",
        expression: "listening",
        position: "right",
      },
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
    {
      character: "minori",
      text: "3日前。直接聞こうとしたけど、なんか……怖くて",
      pose: "self_deprecating",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
    {
      // B13: 「変ですよね」直前 BGM duck / ev_ch1_02 ハイライト pulse
      character: "minori",
      text: "変ですよね。確認すればいいだけなのに",
      pose: "self_deprecating",
      bgm: "duck 25 400ms",
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
      highlights: [
        {
          word: "変ですよね",
          evidenceId: "ev_ch1_02",
          tooltip: "この言葉に何かある",
        },
      ],
    },
    {
      character: "akira",
      text: "変じゃない",
      pose: "quiet",
      bgm: "ramp 38 600ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "akira",
      text: "で、本当の問いは何？",
      pose: "quiet",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "minori",
      text: "……え？",
      pose: "confused",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
    {
      character: "chifuka",
      text: "今日はまず、話を聞かせてください。答えを急ぐ必要はない",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s01_inner_voice_2",
};

// ── B14 内語2 / 章のテーマ提示 ───────────────────────────────────────────────
/** B14: 全員 fadeOut / bg brightness(0.88) / BGM 30% / 内語ボックス */
export const scene_01_inner_voice_2: SceneData = {
  scene_id: "ch1_s01_inner_voice_2",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（御堂は……みのりの話を聞いて、「本当の問いは何？」と言った。みのりが持ち込んだのは、友達への疑いのはずなのに）",
      bgm: "ramp 30 1000ms",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 140, line_pause_ms: 700 },
    },
    {
      text: "（なんか、違う気がする。でも何が違うのかは、わからない）",
      text_pace: { punctuation_wait_ms: 140, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s01_journal",
};

// ── B15 ジャーナル誘導（任意） ────────────────────────────────────────────────
/** B15: bg_office_interior 明るさ復帰 / chifuka slideIn right */
export const scene_01_journal: SceneData = {
  scene_id: "ch1_s01_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "……みのりが本当に求めていたものは、何だと思いますか（気になったことがあれば、ジャーナルに書いてもいい）",
      pose: "gentle",
      background: "/assets/backgrounds/bg_office_interior.png",
      character_action: {
        actor: "chifuka",
        action: "slideIn",
        expression: "gentle",
        position: "right",
      },
    },
  ],
  journal_prompt:
    "みのりが本当に求めていたものは何だと思う？",
  requires_journal: false,
  next_scene: "ch1_s02_narration",
};

// ── エクスポート: コマ1の全シーンを順序で並べたマップ ──────────────────────────
export const SCENE_MAP: Record<string, SceneData> = {
  ch1_s01_chapter_title: scene_01_chapter_title,
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

export const CHAPTER1_START_SCENE = "ch1_s01_chapter_title";
