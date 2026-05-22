import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ2「調査開始」— v2.5 真の調査ループ構造
//
// フロー:
//   yu_intro → route_hub (3択)
//     A: route_a (透の家) → route_a_return → hub
//     B: route_b (学校)   → route_b_return → hub
//     C: route_c (SNS)    → route_c_return → hub
//   全3ルート完了 → final_deduction → to_be_continued
// ─────────────────────────────────────────────────────────────────────────────

// ── コマタイトル ──────────────────────────────────────────────────────────────
export const scene_02_koma_title: SceneData = {
  scene_id: "ch1_s02_koma_title",
  type: "narration",
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

// ── 放課後・坂を上る独白 ───────────────────────────────────────────────────────
export const scene_02_narration: SceneData = {
  scene_id: "ch1_s02_narration",
  type: "narration",
  messages: [
    {
      text: "放課後、いつもの坂を上りながら、ずっと昨夜のことを考えていた。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      bgm: "ramp 38 1000ms",
      character_action: { actor: "all", action: "fadeOut" },
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

// ── 事務所・灰島のブリーフィング ──────────────────────────────────────────────
export const scene_02_yu_intro: SceneData = {
  scene_id: "ch1_s02_yu_intro",
  type: "dialogue",
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
      text: "最後の投稿がさ……10月14日の23:47。\n最初の欠席届が出たのはそれから8日後——",
      pose: "thinking",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "つまり最初の7日間は「無断欠席」扱いだったんだよね。\nちょっとこれ、変だと思う——かも",
      pose: "serious",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      text: "（10月14日の夜——透が投稿した日。\n　あの日の帰り道、透は笑っていた。「またね」と言った。\n　あの笑顔が、最後だったのか）",
      character_action: { actor: "yu", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 900 },
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
      character_action: { actor: "akira", action: "fadeOut" },
      bgm: "ramp 40 1200ms",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "……ってわけで、だよ。\nどこから動く？",
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
  next_scene: "ch1_s02_route_hub",
};

// ── 調査ハブ（3択 → 全完了でdeductionへ自動遷移）─────────────────────────────
export const scene_02_route_hub: SceneData = {
  scene_id: "ch1_s02_route_hub",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "どこから当たる？",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "透の家を再訪する——今度は引き下がらない",
      completed_route_key: "route_a",
      next_scene: "ch1_s02_route_a",
    },
    {
      key: "B",
      label: "学校で、最後の目撃者を探す",
      completed_route_key: "route_b",
      next_scene: "ch1_s02_route_b",
    },
    {
      key: "C",
      label: "SNSの最後の投稿を、もう一度読み解く",
      completed_route_key: "route_c",
      next_scene: "ch1_s02_route_c",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ルートA — 透の家を再訪
// ═══════════════════════════════════════════════════════════════════════
export const scene_02_route_a: SceneData = {
  scene_id: "ch1_s02_route_a",
  type: "dialogue",
  messages: [
    {
      text: "夕方、透の家の前に来た。\nチャイムを押すと、透の母親が出てきた。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
    {
      text: "母親は少し間を置いてから、笑顔を作った。\n「透は今、塾に行ってるのよ」\n目が逸れた。ドアの奥で、床がきしんだ。",
      highlights: [
        {
          word: "塾に行ってる",
          evidenceId: "ev_ch1_s2_home_lie",
          tooltip: "夕方5時過ぎ。透の塾は木・土だ",
        },
        {
          word: "床がきしんだ",
          evidenceId: "ev_ch1_s2_home_sound",
          tooltip: "ドアの向こうで誰かが動いた",
        },
      ],
      force_highlight_tap: true,
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      text: "帰り際、路地で隣人の老婦人に声をかけられた。\n「最近ね、夜中に車が出入りしてるのよ。\n　2、3回は見た」",
      highlights: [
        {
          word: "夜中に車が出入りしてる",
          evidenceId: "ev_ch1_s2_home_car",
          tooltip: "深夜1〜2時。見慣れない車",
        },
      ],
      force_highlight_tap: true,
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      character: "yu",
      text: "お疲れ。何か拾えた——かも？",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "casual",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
  ],
  next_scene: "ch1_s02_route_a_return",
};

export const scene_02_route_a_return: SceneData = {
  scene_id: "ch1_s02_route_a_return",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "「塾」が嘘だとしたら——誰かが透を家に隠してる？\nまだ2ルートある。先に進もう",
      character_action: {
        actor: "yu",
        action: "none",
        expression: "thinking",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "次の場所を調べる",
      flag_updates: [{ key: "COMPLETE_ROUTE_A", delta: 1 }],
      next_scene: "ch1_s02_route_hub",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ルートB — 学校で最後の目撃者を探す
// ═══════════════════════════════════════════════════════════════════════
export const scene_02_route_b: SceneData = {
  scene_id: "ch1_s02_route_b",
  type: "dialogue",
  messages: [
    {
      text: "放課後の校舎。人が少なくなった廊下を歩く。\n透のクラスメイトを捕まえた。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
    {
      text: "「あの日、透は——放課後に誰かと会う約束をしてたって言ってた。\n　誰かは、知らない」\n彼女は目を伏せて、そう言った。",
      highlights: [
        {
          word: "放課後に誰かと会う約束",
          evidenceId: "ev_ch1_s2_school_meeting",
          tooltip: "失踪した日の放課後。相手は不明",
        },
      ],
      force_highlight_tap: true,
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      text: "職員室の前を通った。\n担任と目が合った——一瞬だけ。\n視線が逸れた。声はかけてこなかった。\n\n廊下の角で、部活帰りの先輩が声をかけてきた。\n「透って、最近よく保健室の先生に呼ばれてたよ。\n　本人は何でもないって言ってたけど」",
      highlights: [
        {
          word: "視線が逸れた",
          evidenceId: "ev_ch1_s2_school_teacher",
          tooltip: "担任は何かを知っている",
        },
        {
          word: "保健室の先生に呼ばれてた",
          evidenceId: "ev_ch1_s2_school_nurse",
          tooltip: "保健室の先生が何度も呼び出していた",
        },
      ],
      force_highlight_tap: true,
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      character: "yu",
      text: "担任、目が合った？\n……それ、知ってて黙ってる顔だよ、たぶん",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "serious",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
  ],
  next_scene: "ch1_s02_route_b_return",
};

export const scene_02_route_b_return: SceneData = {
  scene_id: "ch1_s02_route_b_return",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "保健室の先生、あとで当たれるかもしれない。\nまずは残りを片付けよう",
      character_action: {
        actor: "yu",
        action: "none",
        expression: "casual",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "次の場所を調べる",
      flag_updates: [{ key: "COMPLETE_ROUTE_B", delta: 1 }],
      next_scene: "ch1_s02_route_hub",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ルートC — SNS投稿を読み解く（SnsPostCard表示）
// ═══════════════════════════════════════════════════════════════════════
export const scene_02_route_c: SceneData = {
  scene_id: "ch1_s02_route_c",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "スマホに保存してある。もう一回、ちゃんと読んでみて",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "thinking",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      // SnsPostCard として表示
      text: "",
      character_action: { actor: "yu", action: "fadeOut" },
      sns_post: {
        username: "とおる",
        timestamp: "2025/10/14 23:47",
        // NOTE: "23:47" を body 末尾に含めることで renderWithHighlights の indexOf マッチを成立させている。
        // 将来課題: (1) highlights 配列は body 内の出現順を守る運用で順序依存を管理。(2) renderWithHighlights の body外 word 対応は別タスクで汎用化検討。
        body: "明日も学校がある。そんなことよりも、誰にも見つからない場所がほしい。\nたぶん、わたし以外には伝わらないけれど — 23:47",
        highlights: [
          {
            word: "明日も学校がある",
            evidenceId: "ev_ch1_s2_post_school",
            tooltip: "透にとって学校はまだ「ある」前提だった",
          },
          {
            word: "誰にも見つからない場所",
            evidenceId: "ev_ch1_s2_post_place",
            tooltip: "場所への希求——物理的か、心理的か",
          },
          {
            word: "わたし以外には伝わらないけれど",
            evidenceId: "ev_ch1_s2_post_isolation",
            tooltip: "伝わることを諦めながら、投稿した",
          },
          {
            word: "23:47",
            evidenceId: "ev_ch1_s2_post_late",
            tooltip: "誰も起きていない時間の投稿",
          },
        ],
      },
      force_highlight_tap: true,
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
    {
      character: "yu",
      text: "23時47分か。\n眠れなかったか、それとも——誰かのそばにいた、か",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "thinking",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s02_route_c_return",
};

export const scene_02_route_c_return: SceneData = {
  scene_id: "ch1_s02_route_c_return",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "「学校がある」って書き方——まだ行くつもりだった、よな。\nそれが次の日から来なくなった",
      character_action: {
        actor: "yu",
        action: "none",
        expression: "serious",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "残りを調べる",
      flag_updates: [{ key: "COMPLETE_ROUTE_C", delta: 1 }],
      next_scene: "ch1_s02_route_hub",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// 仮説選択（全3ルート完了後）
// ═══════════════════════════════════════════════════════════════════════
export const scene_02_final_deduction: SceneData = {
  scene_id: "ch1_s02_final_deduction",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "3か所、お疲れ。\n集まった情報から——今の時点で、一番しっくりくる仮説はどれ？",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "serious",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "（証拠が9つ、手元にある。\n　「塾という嘘」「ドアの向こうの足音」「夜中の車」——\n　「放課後の約束」「担任の視線」「保健室の呼び出し」——\n　「学校がある」「見つからない場所」「深夜の投稿」。\n　どれが、透の今につながる？）",
      character_action: { actor: "yu", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  choices: [
    {
      key: "A",
      label: "透は何かを抱え、家でも学校でも話せていない。保健室の先生だけが気づいていたかも",
      next_scene: "ch1_s02_react_I",
    },
    {
      key: "B",
      label: "夜中の車、放課後の約束、深夜の投稿。透は何度か「どこかへ行こうとしていた」",
      next_scene: "ch1_s02_react_II",
    },
    {
      key: "C",
      label: "家族と学校が透の情報を隠している。透は「見つからない場所」にすでに居る",
      next_scene: "ch1_s02_react_III",
    },
    {
      key: "D",
      label: "透は学校に来るつもりだったのに、誰かに止められた。その誰かは家の中にいる",
      next_scene: "ch1_s02_react_IV",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// 仮説別反応ノード
// ═══════════════════════════════════════════════════════════════════════

// 仮説I: 保健室の先生が逃げ場だった
export const scene_02_react_I: SceneData = {
  scene_id: "ch1_s02_react_I",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "保健室の先生か。透の唯一の逃げ場だったのかも",
      character_action: {
        actor: "yu",
        action: "slideIn",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "明日、保健室から当たれ。守ってきた人間にしか出せない情報がある",
      character_action: {
        actor: "akira",
        action: "slideIn",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 800 },
    },
    {
      text: "（透は誰にも見つかりたくなかった。でも保健室にだけは行っていた）",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      text: "（明日、私はこの仮説を持って動く）",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// 仮説II: 何度か「どこかへ行こうとしていた」
export const scene_02_react_II: SceneData = {
  scene_id: "ch1_s02_react_II",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "何度か行こうとしてた、ってことだよね。それを誰かに止められた",
      character_action: {
        actor: "yu",
        action: "slideIn",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "透は逃げる側じゃない。連れて行かれる側でもない。どこかへ行きたかった",
      character_action: {
        actor: "akira",
        action: "slideIn",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 800 },
    },
    {
      text: "（透は、私には言わずに、どこかへ行こうとしていた）",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      text: "（明日、私はこの仮説を持って動く）",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// 仮説III: 家族と学校が隠している・場所はすでにある
export const scene_02_react_III: SceneData = {
  scene_id: "ch1_s02_react_III",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "家族と学校が口を揃えてる。これ、たまたまじゃない",
      character_action: {
        actor: "yu",
        action: "slideIn",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "大人の沈黙は、子供の悲鳴より重い。透はもう、場所を見つけたかもしれん",
      character_action: {
        actor: "akira",
        action: "slideIn",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 800 },
    },
    {
      text: "（透はもう、私の手の届かない場所にいる。それでも、追わないと）",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      text: "（明日、私はこの仮説を持って動く）",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// 仮説IV: 学校に来るつもりだったのに、家の中で止められた
export const scene_02_react_IV: SceneData = {
  scene_id: "ch1_s02_react_IV",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "学校に来るつもりだった。でも家から出られなかった",
      character_action: {
        actor: "yu",
        action: "slideIn",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "保健室の先生は知ってる。透が、行きたいと思っていたことを",
      character_action: {
        actor: "akira",
        action: "slideIn",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 800 },
    },
    {
      text: "（透は逃げたんじゃない。連れて行かれたんでもない。止められたんだ、家の中で）",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 900 },
    },
    {
      text: "（明日、私はこの仮説を持って動く）",
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// 仮説選択後の灰島反応
export const scene_02_deduction_reaction: SceneData = {
  scene_id: "ch1_s02_deduction_reaction",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……そっか。\nそれ、俺も考えてた——かも",
      character_action: {
        actor: "yu",
        action: "slideIn",
        expression: "thinking",
        position: "center",
      },
      background: "/assets/backgrounds/bg_office_interior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      character: "yu",
      text: "明日、この仮説を持って動こう。\n……崩れるかもしれないけど",
      pose: "serious",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      text: "（崩れてもいい。動かなければ、何も見つからない）",
      character_action: { actor: "yu", action: "fadeOut" },
      background: "#0E0A08",
      bgm: "fadeOut 2500ms",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s02_to_be_continued",
};

// ── To be continued ───────────────────────────────────────────────────────────
export const scene_02_to_be_continued: SceneData = {
  scene_id: "ch1_s02_to_be_continued",
  type: "narration",
  messages: [
    {
      text: "明日、私は——",
      background: "#0E0A08",
      character_action: { actor: "all", action: "fadeOut" },
      text_pace: { punctuation_wait_ms: 300, line_pause_ms: 1200 },
    },
    {
      text: "",
      chapter_title:
        "To be continued —\nこのデモはここまで。\n本編では、選んだ仮説を手に透の足跡を辿っていきます。",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: undefined,
};

// ─────────────────────────────────────────────────────────────────────────────
// 旧ノード — 互換性のためスタブとして残置
// ─────────────────────────────────────────────────────────────────────────────
const _stub = (id: string): SceneData => ({
  scene_id: id,
  type: "narration",
  messages: [{ text: "（このノードは v2.5 で統合されました）" }],
  next_scene: "ch1_s02_to_be_continued",
});

export const scene_02_collect_choice      = _stub("ch1_s02_collect_choice");
export const scene_02a_minori_start       = _stub("ch1_s02a_minori_start");
export const scene_02a_question_choice    = _stub("ch1_s02a_question_choice");
export const scene_02a_react_a1           = _stub("ch1_s02a_react_a1");
export const scene_02a_react_a2           = _stub("ch1_s02a_react_a2");
export const scene_02a_minori_more        = _stub("ch1_s02a_minori_more");
export const scene_02b_sns_start          = _stub("ch1_s02b_sns_start");
export const scene_02b_post_display       = _stub("ch1_s02b_post_display");
export const scene_02c_investigation      = _stub("ch1_s02c_investigation");
export const scene_02c_inv_board          = _stub("ch1_s02c_inv_board");
export const scene_02c_inv_reaction       = _stub("ch1_s02c_inv_reaction");
export const scene_02c_friend_start       = _stub("ch1_s02c_friend_start");
export const scene_02c_yu_returns         = _stub("ch1_s02c_yu_returns");
export const scene_02_end_common          = _stub("ch1_s02_end_common");
export const scene_02_inner_voice         = _stub("ch1_s02_inner_voice");
export const scene_02_journal             = _stub("ch1_s02_journal");

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_02: Record<string, SceneData> = {
  // 新規ループ構造ノード
  ch1_s02_koma_title:         scene_02_koma_title,
  ch1_s02_narration:          scene_02_narration,
  ch1_s02_yu_intro:           scene_02_yu_intro,
  ch1_s02_route_hub:          scene_02_route_hub,
  ch1_s02_route_a:            scene_02_route_a,
  ch1_s02_route_a_return:     scene_02_route_a_return,
  ch1_s02_route_b:            scene_02_route_b,
  ch1_s02_route_b_return:     scene_02_route_b_return,
  ch1_s02_route_c:            scene_02_route_c,
  ch1_s02_route_c_return:     scene_02_route_c_return,
  ch1_s02_final_deduction:    scene_02_final_deduction,
  ch1_s02_react_I:            scene_02_react_I,
  ch1_s02_react_II:           scene_02_react_II,
  ch1_s02_react_III:          scene_02_react_III,
  ch1_s02_react_IV:           scene_02_react_IV,
  ch1_s02_deduction_reaction: scene_02_deduction_reaction,
  ch1_s02_to_be_continued:    scene_02_to_be_continued,
  // 旧ノード（互換スタブ）
  ch1_s02_collect_choice:     scene_02_collect_choice,
  ch1_s02a_minori_start:      scene_02a_minori_start,
  ch1_s02a_question_choice:   scene_02a_question_choice,
  ch1_s02a_react_a1:          scene_02a_react_a1,
  ch1_s02a_react_a2:          scene_02a_react_a2,
  ch1_s02a_minori_more:       scene_02a_minori_more,
  ch1_s02b_sns_start:         scene_02b_sns_start,
  ch1_s02b_post_display:      scene_02b_post_display,
  ch1_s02c_investigation:     scene_02c_investigation,
  ch1_s02c_inv_board:         scene_02c_inv_board,
  ch1_s02c_inv_reaction:      scene_02c_inv_reaction,
  ch1_s02c_friend_start:      scene_02c_friend_start,
  ch1_s02c_yu_returns:        scene_02c_yu_returns,
  ch1_s02_end_common:         scene_02_end_common,
  ch1_s02_inner_voice:        scene_02_inner_voice,
  ch1_s02_journal:            scene_02_journal,
};
