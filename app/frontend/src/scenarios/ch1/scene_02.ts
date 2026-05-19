import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ2「情報を集める」— v2.5演出版
// 依拠: design/05-chapter1-script.md コマ2 全文
// v2追加:
//   ルートA: ev_ch1_04a highlights（みのりの「空気が変わった気はしてた」）
//   ルートB: evidence_grants [ev_ch1_03]
//   ルートC: evidence_grants [ev_ch1_04, ev_ch1_05]
//   requires_journal: false
// v2.5追加: B16〜B20 演出ディレクティブ
//   - ch1_s02_collect_choice の各選択肢 next_scene を ch1_s02_to_be_continued に上書き
//   - ch1_s02_to_be_continued（新規）でデモ終端
//   NOTE: 後半ルートA/B/C は実装ファイルに残置（到達不可。v2.5では ch1_s02_to_be_continued が終端）
// ─────────────────────────────────────────────────────────────────────────────

// ── B16 コマタイトル ───────────────────────────────────────────────────────────
export const scene_02_koma_title: SceneData = {
  scene_id: "ch1_s02_koma_title",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      // B16: 黒背景 crossfade / BGM duck 15% / コマタイトル fadeIn
      text: "",
      background: "#0E0A08",
      bgm: "duck 15 400ms",
      chapter_title: "コマ 2 / 情報を集める",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: "ch1_s02_narration",
};

// ── B17 調査室・コルクボード ──────────────────────────────────────────────────
export const scene_02_narration: SceneData = {
  scene_id: "ch1_s02_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      // B17: bg_office_research (bg_office_interior + tint) / BGM 38% 復帰
      text: "調査室のコルクボードは大きくて、今は何もない。\n遊が手帳サイズのカードを一枚、主人公に渡した。",
      background: "/assets/backgrounds/bg_office_interior.png",
      bgm: "ramp 38 1000ms",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 480 },
    },
    {
      text: "「情報カード。気になったことを書いといて。\n何でもいいよ。感覚でも」",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
  ],
  next_scene: "ch1_s02_yu_intro",
};

// ── B18 遊の説明 ──────────────────────────────────────────────────────────────
export const scene_02_yu_intro: SceneData = {
  scene_id: "ch1_s02_yu_intro",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      // B18: yu:casual:center slideIn from-bottom
      character: "yu",
      text: "えーっと、第一弾。何から調べようか、って話なんだけど",
      pose: "casual",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
    {
      character: "yu",
      text: "選択肢3つある。①みのりにもっと直接話を聞く。②SNSの投稿を俺が引っ張ってくるから、一緒に読む。③親友の子に話を聞く——これは俺が代わりに当たってくる",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 600 },
    },
    {
      character: "yu",
      text: "授業内ってことで今は2つしか選べない。どうする？",
      pose: "listening",
      character_action: {
        actor: "yu",
        action: "none",
        expression: "listening",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
  ],
  next_scene: "ch1_s02_collect_choice",
};

// ── B19 3択提示（デモ終端） ───────────────────────────────────────────────────
// v2.5: どの選択肢を選んでも next_scene = ch1_s02_to_be_continued
// フラグ・evidence_grants は既存どおり実行される
export const scene_02_collect_choice: SceneData = {
  scene_id: "ch1_s02_collect_choice",
  type: "choice",
  requires_journal: false,
  messages: [],
  choices: [
    {
      key: "A",
      label: "みのりにもっと話を聞く",
      status_delta: { question_power: 3 },
      // v2.5: ch1_s02_to_be_continued に上書き（旧: ch1_s02a_minori_start）
      next_scene: "ch1_s02_to_be_continued",
    },
    {
      key: "B",
      label: "SNS投稿を調べる",
      status_delta: { explore_power: 3 },
      evidence_grants: ["ev_ch1_03"],
      // v2.5: ch1_s02_to_be_continued に上書き（旧: ch1_s02b_sns_start）
      next_scene: "ch1_s02_to_be_continued",
    },
    {
      key: "C",
      label: "親友の側に話を聞く（遊が代行）",
      status_delta: { explore_power: 2, connect_power: 2 },
      evidence_grants: ["ev_ch1_04", "ev_ch1_05"],
      // v2.5: ch1_s02_to_be_continued に上書き（旧: ch1_s02c_friend_start）
      next_scene: "ch1_s02_to_be_continued",
    },
  ],
};

// ── B20 "To be continued" カード（v2.5 新規） ─────────────────────────────────
/** B20: 黒 crossfade / 全員 fadeOut / BGM fadeOut / TBC カード表示 → ダッシュボードへ */
export const scene_02_to_be_continued: SceneData = {
  scene_id: "ch1_s02_to_be_continued",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      chapter_title: "To be continued —\nこのデモはここまで。続きは次章で。",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  // 遷移: next_scene は使わず、PlayPage 側でダッシュボード戻るボタンを表示する
  // scene_id = ch1_s02_to_be_continued をチェックして /dashboard へ遷移させること
  next_scene: undefined,
};

// ── ルートA ──────────────────────────────────────────────────────────────────
// NOTE(v2.5): 以下のルートA/B/C は到達不可（ch1_s02_collect_choice が to_be_continued に向いているため）
// 実装ファイルには残置。将来の v2.6+ で再開時に利用。

export const scene_02a_minori_start: SceneData = {
  scene_id: "ch1_s02a_minori_start",
  type: "dialogue",
  requires_journal: false,
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
  requires_journal: false,
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
  requires_journal: false,
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
      // v2: ev_ch1_04a のハイライト（ルートA専用証拠）
      highlights: [
        {
          word: "空気が変わった気はしてた",
          evidenceId: "ev_ch1_04a",
          tooltip: "文化祭後の変化を記録する",
        },
      ],
    },
  ],
  next_scene: "ch1_s02a_minori_more",
};

export const scene_02a_react_a2: SceneData = {
  scene_id: "ch1_s02a_react_a2",
  type: "dialogue",
  requires_journal: false,
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
  requires_journal: false,
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
// evidence_grants: ["ev_ch1_03"] は scene_02_collect_choice の選択肢B側で付与済み

export const scene_02b_sns_start: SceneData = {
  scene_id: "ch1_s02b_sns_start",
  type: "dialogue",
  requires_journal: false,
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
  requires_journal: false,
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
  requires_journal: false,
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
// evidence_grants: ["ev_ch1_04", "ev_ch1_05"] は scene_02_collect_choice の選択肢C側で付与済み

export const scene_02c_friend_start: SceneData = {
  scene_id: "ch1_s02c_friend_start",
  type: "dialogue",
  requires_journal: false,
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
  requires_journal: false,
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
  requires_journal: false,
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
  requires_journal: false,
  messages: [
    {
      text: "（情報カードが何枚かある。でもこれで何がわかったんだろう。みのりの友達は本当に、みのりのことが嫌いなのか。それとも——）",
    },
  ],
  next_scene: "ch1_s02_journal",
};

/** コマ2末・内省② — v2: requires_journal: false（任意化） */
export const scene_02_journal: SceneData = {
  scene_id: "ch1_s02_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "集めた情報の中で、一番気になったのはどれですか。気になったことがあれば、ジャーナルに書いてもいい",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "集めた情報で一番気になったのはどれ？なぜそれが気になった？",
  requires_journal: false,
  next_scene: "ch1_s03_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_02: Record<string, SceneData> = {
  ch1_s02_koma_title: scene_02_koma_title,
  ch1_s02_narration: scene_02_narration,
  ch1_s02_yu_intro: scene_02_yu_intro,
  ch1_s02_collect_choice: scene_02_collect_choice,
  ch1_s02_to_be_continued: scene_02_to_be_continued,
  // 以下は v2.5 では到達不可（残置）
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
