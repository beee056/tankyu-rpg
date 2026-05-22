import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ1「灯台に来た日」— v2.5 ゼロベース版（Bbルート）
//
// 設定: 主人公は依頼人として事務所を訪れる高校2年生。
//       中学からの親友・佐倉透が3週間学校に来ない。家族は「体調を崩した」と言うが
//       SNSアカウントは消え、共通の友人は誰も気にしていない。家を訪ねても玄関で
//       追い返される。担任は「家庭の事情だろう」で終わり。一人だけが
//       「何かが起きている」と感じている。行き場をなくしてヨアケ探偵社に駆け込む。
//
// 既存ノードキー(SCENE_MAP)を維持して PlayPage / index 側の変更を最小化。
// 演出ディレクティブ(background/character_action/bgm/se/text_pace/highlights)は
// 既存のキャラ画像・背景アセットを使う前提で再構成。
// ─────────────────────────────────────────────────────────────────────────────

// ── B01 章タイトル ─────────────────────────────────────────────────────────────
export const scene_01_chapter_title: SceneData = {
  scene_id: "ch1_s01_chapter_title",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "",
      background: "#0E0A08",
      bgm: "start bgm_main 3000ms fadeIn vol=30",
      chapter_title: "第1章 — 灯台に来た日",
      text_pace: { punctuation_wait_ms: 0, line_pause_ms: 0 },
    },
  ],
  next_scene: "ch1_s01_narration",
};

// ── B02 主人公の独白（坂を上る） ──────────────────────────────────────────────
export const scene_01_narration: SceneData = {
  scene_id: "ch1_s01_narration",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "三週間、佐倉透は学校に来ていない。",
      background: "/assets/backgrounds/bg_slope_dusk.png",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 600 },
    },
    {
      text: "家族は「体調を崩した」と言う。\nでも先週、駅前で会ったときの透の母親は、私の顔を見て一瞬、目を逸らした。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "SNSのアカウントは、消えていた。\n他の友達に聞いても、「別に気にしてないけど」と返ってくる。\n家を訪ねても、玄関で追い返された。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "担任は「家庭の事情もあるからな」と言って、それ以上は何も言わなかった。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "誰も、おかしいと思っていない。\n——私だけが、何かが起きていると感じている。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 700 },
    },
    {
      text: "夜、検索の海をさまよっていて、一つだけ引っかかった名前があった。",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "ヨアケ探偵社。\n「言葉にできない違和感」を扱う、と書いてあった。",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s01_chifuka_welcome",
};

// ── B03 建物の前に立つ → 入る ────────────────────────────────────────────────
export const scene_01_chifuka_welcome: SceneData = {
  scene_id: "ch1_s01_chifuka_welcome",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      text: "坂の中腹に、少し傾いた白い建物があった。\n入口のドアには古いガラスがはまっていて、「ヨアケ」という文字が、光の角度で逆さに透けて見える。",
      background: "/assets/backgrounds/bg_yoake_exterior.png",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 600 },
    },
    {
      text: "ドアの前で、息を吸った。\nここまで来て、何を話せばいいのか、まだ自分でも分かっていない。",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 700 },
    },
    {
      text: "それでも、ノブに手をかけた。",
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 800 },
    },
    {
      character: "chifuka",
      text: "……いらっしゃい。座って、いいですよ",
      pose: "calm",
      background: "/assets/backgrounds/bg_office_interior.png",
      character_action: {
        actor: "chifuka",
        action: "slideIn",
        expression: "calm",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 500 },
    },
    {
      character: "chifuka",
      text: "ヨアケ探偵社の時坂です。受付と、まあ、お茶を出すのが仕事",
      pose: "slight_smile",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 500 },
    },
    {
      character: "chifuka",
      text: "急がなくていいです。話せそうになったら、話してください",
      pose: "calm",
      highlights: [
        {
          word: "急がなくていい",
          evidenceId: "ev_ch1_01",
          tooltip: "知深の最初の言葉。覚えておく",
        },
      ],
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
  ],
  next_scene: "ch1_s01_motivation_choice",
};

// ── B04 何から話す? 選択肢（依頼の入口） ─────────────────────────────────────
export const scene_01_motivation_choice: SceneData = {
  scene_id: "ch1_s01_motivation_choice",
  type: "choice",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "どこから話します？",
      pose: "calm",
    },
  ],
  choices: [
    {
      key: "A",
      label: "親友が、三週間学校に来ていないこと",
      flag_updates: [{ key: "OPEN_FACT", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_a",
    },
    {
      key: "B",
      label: "誰も、おかしいと思っていないこと",
      flag_updates: [{ key: "OPEN_FEELING", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_b",
    },
    {
      key: "C",
      label: "自分が、ここに来た理由がうまく言えないこと",
      flag_updates: [{ key: "OPEN_HONEST", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_c",
    },
    {
      key: "D",
      label: "……すみません、少し、考えさせてください",
      flag_updates: [{ key: "OPEN_PAUSE", delta: 1 }],
      next_scene: "ch1_s01_chifuka_react_d",
    },
  ],
};

// ── B05 知深の反応 ────────────────────────────────────────────────────────────
export const scene_01_chifuka_react_a: SceneData = {
  scene_id: "ch1_s01_chifuka_react_a",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "三週間。……それは、長いですね",
      pose: "serious",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "serious",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "chifuka",
      text: "事実から話してくれて、助かります。続きは所長を呼びますから",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

export const scene_01_chifuka_react_b: SceneData = {
  scene_id: "ch1_s01_chifuka_react_b",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "……周りの誰も、ですか",
      pose: "pause",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "pause",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "chifuka",
      text: "それを抱えて来たのは、たぶん、あなたが正しい",
      pose: "calm",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

export const scene_01_chifuka_react_c: SceneData = {
  scene_id: "ch1_s01_chifuka_react_c",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "理由が言えないのに、ここまで来た。十分です",
      pose: "slight_smile",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "slight_smile",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "chifuka",
      text: "言葉は、後からついてきます",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

export const scene_01_chifuka_react_d: SceneData = {
  scene_id: "ch1_s01_chifuka_react_d",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "どうぞ",
      pose: "calm",
      character_action: {
        actor: "chifuka",
        action: "none",
        expression: "calm",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 240, line_pause_ms: 800 },
    },
    {
      character: "chifuka",
      text: "コーヒー、淹れますね",
      pose: "slight_smile",
    },
  ],
  next_scene: "ch1_s01_yu_enter",
};

// ── B06 灰島遊の登場 ──────────────────────────────────────────────────────────
export const scene_01_yu_enter: SceneData = {
  scene_id: "ch1_s01_yu_enter",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "あ、新しい人？　知深さんがコーヒー淹れてる時点で、軽くない話だよね",
      pose: "casual",
      bgm: "ramp 38 1500ms",
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
      text: "俺、灰島遊。先輩探偵ってことになってるけど、まあ、調べるのが仕事って感じ",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
    {
      character: "yu",
      text: "所長呼んでくる。ちょっと待ってて",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 380 },
    },
  ],
  next_scene: "ch1_s01_coffee_choice",
};

// ── B07 コーヒー（待ち時間） ───────────────────────────────────────────────────
export const scene_01_coffee_choice: SceneData = {
  scene_id: "ch1_s01_coffee_choice",
  type: "choice",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "コーヒー、ブラックでいいですか",
      pose: "calm",
      character_action: {
        actor: "chifuka",
        action: "slideIn",
        expression: "calm",
        position: "center",
      },
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
      label: "……すみません、今は飲める気がしなくて",
      next_scene: "ch1_s01_coffee_react_b",
    },
  ],
};

export const scene_01_coffee_react_a: SceneData = {
  scene_id: "ch1_s01_coffee_react_a",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "どうぞ。冷めても置いておくので、好きなときに",
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
      text: "……分かりました。水を置いておきます",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "飲みたくないものを飲ませるのも、仕事じゃないので",
      pose: "slight_smile",
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 500 },
    },
  ],
  next_scene: "ch1_s01_akira_enter",
};

// ── B08 御堂の登場 ────────────────────────────────────────────────────────────
export const scene_01_akira_enter: SceneData = {
  scene_id: "ch1_s01_akira_enter",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "……所長の御堂だ",
      pose: "expressionless",
      bgm: "duck 18 600ms",
      character_action: {
        actor: "akira",
        action: "slideIn",
        expression: "expressionless",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "知深から、おおまかには聞いた",
      pose: "expressionless",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 600 },
    },
    {
      character: "akira",
      text: "三週間、親友が学校に来ていない。家族は体調と言う。SNSは消えた。誰も騒がない。——そうだな？",
      pose: "expressionless",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 600 },
    },
    {
      character: "akira",
      text: "事実は、いい",
      pose: "expressionless",
      bgm: "ramp 38 1500ms",
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "聞きたいのは、君が何を恐れてここに来たか、だ",
      pose: "expressionless",
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 800 },
      highlights: [
        {
          word: "何を恐れてここに来たか",
          evidenceId: "ev_ch1_02",
          tooltip: "御堂の問い。これが依頼の核心になる",
        },
      ],
    },
  ],
  next_scene: "ch1_s01_inner_voice_1",
};

// ── B09 主人公の内語 → 答える ───────────────────────────────────────────────
export const scene_01_inner_voice_1: SceneData = {
  scene_id: "ch1_s01_inner_voice_1",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（恐れ——）",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 240, line_pause_ms: 900 },
    },
    {
      text: "（透が、もう戻ってこないこと？\n　それとも、戻ってきたとき、私が知らない誰かになっていること？）",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 800 },
    },
    {
      text: "（——違う。本当に怖いのは、たぶん）",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 800 },
    },
    {
      text: "（誰も気づかないまま、いなくなることだ）",
      text_pace: { punctuation_wait_ms: 240, line_pause_ms: 1000 },
    },
  ],
  next_scene: "ch1_s01_minori_enter",
};

// ── B10 御堂が依頼を受ける ─────────────────────────────────────────────────
// (旧 minori_enter のキーをそのまま使い、内容差し替え。みのりは登場させない)
export const scene_01_minori_enter: SceneData = {
  scene_id: "ch1_s01_minori_enter",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "akira",
      text: "答えなくていい。今は",
      pose: "expressionless",
      character_action: {
        actor: "akira",
        action: "slideIn",
        expression: "expressionless",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 700 },
    },
    {
      character: "akira",
      text: "依頼は、受ける",
      pose: "expressionless",
      se: "se_evidence",
      text_pace: { punctuation_wait_ms: 240, line_pause_ms: 900 },
    },
    {
      character: "akira",
      text: "ヨアケ探偵社は、誰も騒がない違和感を扱う。君が来た理由は、十分すぎる",
      pose: "expressionless",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 700 },
    },
  ],
  next_scene: "ch1_s01_akira_listen",
};

// ── B11 灰島の参加 ────────────────────────────────────────────────────────────
// (旧 akira_listen のキーをそのまま使い、内容差し替え)
export const scene_01_akira_listen: SceneData = {
  scene_id: "ch1_s01_akira_listen",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "yu",
      text: "じゃあ俺、調査担当ね。最初の三日でやることはだいたい決まってる",
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
      text: "①誰がいつから「来てない」って認識してるか確認。②消えたSNSの周辺ログを当たる。③直近で透くんと会った人をリストアップする",
      pose: "thinking",
      text_pace: { punctuation_wait_ms: 110, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "君にも一個だけ頼みたいんだけど。最後に透くんと話した日、できるだけ細かく思い出してきて",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
    {
      character: "yu",
      text: "言葉そのものより、雰囲気とか、違和感のほうが大事",
      pose: "casual",
      text_pace: { punctuation_wait_ms: 130, line_pause_ms: 500 },
    },
  ],
  next_scene: "ch1_s01_inner_voice_2",
};

// ── B12 主人公の内語2（救われた感覚） ───────────────────────────────────────
export const scene_01_inner_voice_2: SceneData = {
  scene_id: "ch1_s01_inner_voice_2",
  type: "narration",
  requires_journal: false,
  messages: [
    {
      text: "（——信じてくれる人がいる）",
      bgm: "ramp 30 1000ms",
      character_action: {
        actor: "all",
        action: "fadeOut",
        expression: undefined,
        position: undefined,
      },
      text_pace: { punctuation_wait_ms: 220, line_pause_ms: 900 },
    },
    {
      text: "（それだけのことが、こんなに重い）",
      text_pace: { punctuation_wait_ms: 180, line_pause_ms: 800 },
    },
  ],
  next_scene: "ch1_s01_journal",
};

// ── B13 知深の見送り（コマ1終端） ────────────────────────────────────────────
export const scene_01_journal: SceneData = {
  scene_id: "ch1_s01_journal",
  type: "dialogue",
  requires_journal: false,
  messages: [
    {
      character: "chifuka",
      text: "明日からよろしくお願いします、依頼人さん",
      pose: "slight_smile",
      background: "/assets/backgrounds/bg_office_interior.png",
      character_action: {
        actor: "chifuka",
        action: "slideIn",
        expression: "slight_smile",
        position: "center",
      },
      text_pace: { punctuation_wait_ms: 160, line_pause_ms: 500 },
    },
    {
      character: "chifuka",
      text: "あ、それと——遊さんが言いそびれてた一言、伝えておきます",
      pose: "calm",
      text_pace: { punctuation_wait_ms: 140, line_pause_ms: 500 },
    },
    {
      character: "chifuka",
      text: "「気づいてくれて、ありがとう」って",
      pose: "slight_smile",
      text_pace: { punctuation_wait_ms: 200, line_pause_ms: 800 },
    },
  ],
  next_scene: "ch1_s02_koma_title",
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
