import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ2「調査開始」— v2.5 書き直し版（Reviewer 指摘4点反映済み）
//
// コマ1の翌日(放課後)。灰島が一晩で掴んだ事実2件を事務所でブリーフィング。
// 御堂の一言で「本格始動」を宣言し、主人公が最初の一手を選ぶ選択肢へ。
// 選択肢ごとに決意の内語を挟んでから「明日、私は——」でTBC。
// 既存ノードキーは維持。PlayPage のシーン遷移時 sprite 全クリア仕様に対応し、
// 各シーン冒頭で character_action を明示再指定。
// ─────────────────────────────────────────────────────────────────────────────

// ── B14 コマタイトル ───────────────────────────────────────────────────────────
export const scene_02_koma_title: SceneData = {
  scene_id: "ch1_s02_koma_title",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "",
      background: "#0E0A08",
      bgm: "duck 15 400ms",
      chapter_title: "コマ 2 — 調査開始",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: "ch1_s02_narration",
};

// ── B15 放課後・坂を上る独白 ──────────────────────────────────────────────────
export const scene_02_narration: SceneData = {
  scene_id: "ch1_s02_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "放課後、いつもの坂を上りながら、ずっと昨夜のことを考えていた。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      bgm: "ramp 38 1000ms",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 600 },
    },
    {
      text: "灰島さんに頼まれた宿題——\n透と最後に話した日のことを、できるだけ細かく思い出してみた。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "あの日の透は、いつもと同じ顔をしていた。\n普通に笑って、普通に「またね」と言った。\n——それが今になって、逆に引っかかる。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      text: "ポケットのスマホが震えた。\n灰島さんからのメッセージだった。",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 600 },
    },
    {
      text: "「見せたいものがある。事務所に来れそう？」",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 800 },
    },
  ],
  next_scene: "ch1_s02_yu_intro",
};

// ── B16 事務所・灰島のブリーフィング ──────────────────────────────────────────
export const scene_02_yu_intro: SceneData = {
  scene_id: "ch1_s02_yu_intro",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      text: "事務所に着くと、灰島さんがノートパソコンを広げて待っていた。",
      background: "/assets/backgrounds/bg_office_interior.png",
      bgm: "duck 18 600ms",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "thinking",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      character: "yu",
      text: "お、来てくれた？　ちょっと待って——ほら、これ",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "一晩ぶっ通しで掘ってたんだけど、まあ聞いてほしくて",
      pose: "casual",
      bgm: "ramp 45 1500ms",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "透くんのSNS、消えてないんだよね。非公開になってただけで",
      pose: "thinking",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "最後の投稿がさ……10月14日の23:47。こんなの書いてある",
      pose: "thinking",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "「誰にも見つからない場所がほしい」",
      pose: "serious",
      se: "se_evidence",
      highlights: [
        {
          word: "誰にも見つからない場所がほしい",
          evidenceId: "ev_ch1_03",
          tooltip: "透の最後のSNS投稿。10月14日 23:47。",
        },
      ],
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 1000 },
    },
    {
      character: "yu",
      text: "返信もなし。その次の日から来なくなってる——かも",
      pose: "thinking",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      character: "yu",
      text: "もう一個あってさ。俺、今日、透くんの叔父さんのフリして学校に電話してみたんだよね",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "そしたら——最初の7日間、「無断欠席」扱いだったみたいで。\n欠席届が出たのは8日目から、だね",
      pose: "thinking",
      se: "se_evidence",
      highlights: [
        {
          word: "最初の7日間は「無断欠席」扱い",
          evidenceId: "ev_ch1_04",
          tooltip: "学校への確認で判明。欠席届は失踪8日目から。誰かが後から辻褄を合わせた可能性。",
        },
      ],
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "「家庭の事情」って担任が言った理由——誰かが後から話を作ったかもしれない、と思う",
      pose: "serious",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      text: "（10月14日の夜——透が投稿した日。\n　あの日の帰り道、透は笑っていた。「またね」と言った。\n　あの笑顔が、最後だったのか）",
      character_action: {
        actor: "yu",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 900 },
    },
    {
      character: "yu",
      text: "ちなみに聞いていい？\n透くんが最後に「いつもと違う」って感じた瞬間、あった？",
      pose: "casual",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 600 },
    },
    {
      text: "（——あった。\n　あの日の「またね」は、少しだけ長かった気がする。\n　気のせいだと思っていた）",
      character_action: {
        actor: "yu",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      character: "akira",
      text: "——十分だ",
      pose: "expressionless",
      bgm: "duck 20 800ms",
      character_action: {
        actor: "akira",
        action: "slideIn",
        expression: "expressionless",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 260, line_pause_ms: 1000 },
    },
    {
      character: "akira",
      text: "明日から本格的に動く。灰島、段取りを組め",
      pose: "expressionless",
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "——依頼人も、覚悟しておけ",
      pose: "expressionless",
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 240, line_pause_ms: 900 },
    },
    {
      text: "御堂さんは、それだけ言って奥に戻った。",
      character_action: {
        actor: "akira",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      bgm: "ramp 40 1200ms",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "……ってわけで、だよ。\nどこから動く——って話なんだよね、次は",
      pose: "casual",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 600 },
    },
  ],
  next_scene: "ch1_s02_collect_choice",
};

// ── B17 最初の一手・選択肢 ────────────────────────────────────────────────────
export const scene_02_collect_choice: SceneData = {
  scene_id: "ch1_s02_collect_choice",
  type: "choice",
  requires_journal: false,
  messages: [
    {
      text: "（動く、と御堂さんが言った。\n　SNSは消えていなかった。非公開だった。\n　無断欠席は7日間。届が出たのは8日目——\n　10月14日の夜の投稿が、全部の始まりかもしれない。\n　明日——どこから始める？）",
      character_action: {
        actor: "yu",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "透の家を、もう一度訪ねる——今度は、引き下がらない",
      flag_updates: [{ key: "ROUTE_HOME", delta: 1 }],
      next_scene: "ch1_s02a_minori_start",
    },
    {
      key: "B",
      label: "学校で、透と最後に一緒にいた人を探す",
      flag_updates: [{ key: "ROUTE_SCHOOL", delta: 1 }],
      next_scene: "ch1_s02c_friend_start",
    },
    {
      key: "C",
      label: "SNSの最後の投稿——「見つからない場所」の意味を考える",
      flag_updates: [{ key: "ROUTE_SNS", delta: 1 }],
      next_scene: "ch1_s02b_sns_start",
    },
  ],
};

// ── B18 決意の余韻 → To be continued ─────────────────────────────────────────
export const scene_02_to_be_continued: SceneData = {
  scene_id: "ch1_s02_to_be_continued",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "明日、私は——",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 300, line_pause_ms: 1200 },
    },
    {
      text: "",
      chapter_title:
        "To be continued —\nこのデモはここまで。\n本編では、選んだ手がかりから透の足跡を辿っていきます。",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: undefined,
};

// ─────────────────────────────────────────────────────────────────────────────
// ルート分岐・決意ビート（選択肢 A / B / C それぞれの内語→TBC）
// ─────────────────────────────────────────────────────────────────────────────

// ── ルート A: 透の家を再訪 ────────────────────────────────────────────────────
export const scene_02a_minori_start: SceneData = {
  scene_id: "ch1_s02a_minori_start",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（透の家——もう一度、あのドアの前に立とう。\n　今度は、引き下がらない）",
      background: "#0E0A08",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// ── ルート B: 学校で目撃者を探す ──────────────────────────────────────────────
export const scene_02c_friend_start: SceneData = {
  scene_id: "ch1_s02c_friend_start",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（あの日、教室の隅で透と一緒にいた誰かを、私は知っている。\n　その人は、何かを見ていたはずだ）",
      background: "#0E0A08",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// ── ルート C: SNS 投稿を読み解く ──────────────────────────────────────────────
export const scene_02b_sns_start: SceneData = {
  scene_id: "ch1_s02b_sns_start",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（あの投稿の時刻——23:47。眠れない夜に書いたか、誰かのそばで書いたか。\n　明日、その答えを、私が拾いに行く）",
      background: "#0E0A08",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// ─────────────────────────────────────────────────────────────────────────────
// 以下のノードは v2.5 デモでは未使用。index.ts / SCENE_MAP 互換のため残置。
// ─────────────────────────────────────────────────────────────────────────────

export const scene_02a_question_choice: SceneData = {
  scene_id: "ch1_s02a_question_choice",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_react_a1: SceneData = {
  scene_id: "ch1_s02a_react_a1",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_react_a2: SceneData = {
  scene_id: "ch1_s02a_react_a2",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_minori_more: SceneData = {
  scene_id: "ch1_s02a_minori_more",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02b_post_display: SceneData = {
  scene_id: "ch1_s02b_post_display",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02b_yu_analysis: SceneData = {
  scene_id: "ch1_s02b_yu_analysis",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02c_yu_returns: SceneData = {
  scene_id: "ch1_s02c_yu_returns",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02_end_common: SceneData = {
  scene_id: "ch1_s02_end_common",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02_inner_voice: SceneData = {
  scene_id: "ch1_s02_inner_voice",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02_journal: SceneData = {
  scene_id: "ch1_s02_journal",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "（v2.5 デモでは未使用）" }],
  next_scene: "ch1_s02_to_be_continued",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_02: Record<string, SceneData> = {
  ch1_s02_koma_title: scene_02_koma_title,
  ch1_s02_narration: scene_02_narration,
  ch1_s02_yu_intro: scene_02_yu_intro,
  ch1_s02_collect_choice: scene_02_collect_choice,
  ch1_s02_to_be_continued: scene_02_to_be_continued,
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
