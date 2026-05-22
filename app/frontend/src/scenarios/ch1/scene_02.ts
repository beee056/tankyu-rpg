import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ2「最初の一日」— v2.5 ゼロベース版（Bbルート）
//
// コマ1で依頼が成立した直後の短いブリッジ。
// 主人公が翌日への一歩を踏み出すところまでを描き、To be continued で締める。
// 既存ノードキーは維持して PlayPage / index 側の変更を最小化。
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
      chapter_title: "コマ 2 — 最初の一日",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: "ch1_s02_narration",
};

// ── B15 翌朝・通学路の独白 ────────────────────────────────────────────────────
export const scene_02_narration: SceneData = {
  scene_id: "ch1_s02_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "翌朝、いつもの通学路で、自分の足が一瞬止まった。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      bgm: "ramp 38 1000ms",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 600 },
    },
    {
      text: "透の家に向かう曲がり角だった。\n三週間、毎朝そこを素通りしていた。「気にしすぎだよ」と自分に言い聞かせながら。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "今日は、立ち止まれる。\n依頼を受けてくれた大人が、三人いる。",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s02_yu_intro",
};

// ── B16 灰島からのメッセージ（テキストとして読む） ───────────────────────────
export const scene_02_yu_intro: SceneData = {
  scene_id: "ch1_s02_yu_intro",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      text: "ポケットの中で、スマホが震えた。\n灰島さんからのメッセージだった。",
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      character: "yu",
      text: "おはよ。昨日の続きで一個確認したい。今日、できそうな範囲で答えて",
      pose: "casual",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "透くんが「来てない」って、君が最初に気づいたのはいつ？　\n登校初日？　それとも、もう少し前から?",
      pose: "thinking",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 600 },
    },
    {
      character: "yu",
      text: "あと、ひとつ大事なこと",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "今日、無理に何かしようとしなくていい。\n調べるのは俺らの仕事だから",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
  ],
  next_scene: "ch1_s02_collect_choice",
};

// ── B17 主人公の答え（小さな一歩） ───────────────────────────────────────────
export const scene_02_collect_choice: SceneData = {
  scene_id: "ch1_s02_collect_choice",
  type: "choice",
  requires_journal: false,
  messages: [
    {
      text: "返信を打つ前に、息を吸った。\n私が今日、できることは——",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "「最初に気づいたのは、登校初日でした」と正直に伝える",
      next_scene: "ch1_s02_to_be_continued",
    },
    {
      key: "B",
      label: "「もっと前から、なんとなく違和感はありました」と書く",
      next_scene: "ch1_s02_to_be_continued",
    },
    {
      key: "C",
      label: "「分かりません。でも、思い出してみます」と返す",
      next_scene: "ch1_s02_to_be_continued",
    },
  ],
};

// ── B18 To be continued ────────────────────────────────────────────────────
export const scene_02_to_be_continued: SceneData = {
  scene_id: "ch1_s02_to_be_continued",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      chapter_title: "To be continued —\nこのデモはここまで。\n本編では、この日から透の足跡を辿っていきます。",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: undefined,
};

// ─────────────────────────────────────────────────────────────────────────────
// 以下のノードは v2.5 デモでは到達不可だが、index.ts / SCENE_MAP 互換のため残置。
// 後の章で再開するときに参照する可能性がある。中身はダミー（差し替え予定）。
// ─────────────────────────────────────────────────────────────────────────────

export const scene_02a_minori_start: SceneData = {
  scene_id: "ch1_s02a_minori_start",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_question_choice: SceneData = {
  scene_id: "ch1_s02a_question_choice",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_react_a1: SceneData = {
  scene_id: "ch1_s02a_react_a1",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_react_a2: SceneData = {
  scene_id: "ch1_s02a_react_a2",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02a_minori_more: SceneData = {
  scene_id: "ch1_s02a_minori_more",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02b_sns_start: SceneData = {
  scene_id: "ch1_s02b_sns_start",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02b_post_display: SceneData = {
  scene_id: "ch1_s02b_post_display",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02b_yu_analysis: SceneData = {
  scene_id: "ch1_s02b_yu_analysis",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02c_friend_start: SceneData = {
  scene_id: "ch1_s02c_friend_start",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02c_yu_returns: SceneData = {
  scene_id: "ch1_s02c_yu_returns",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02_end_common: SceneData = {
  scene_id: "ch1_s02_end_common",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02_inner_voice: SceneData = {
  scene_id: "ch1_s02_inner_voice",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
  next_scene: "ch1_s02_to_be_continued",
};

export const scene_02_journal: SceneData = {
  scene_id: "ch1_s02_journal",
  type: "narration",
  requires_journal: false,
  messages: [{ text: "[unused in v2.5 demo]" }],
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
