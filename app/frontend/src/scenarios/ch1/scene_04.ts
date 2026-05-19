import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ4「連との初対峙」
// 依拠: design/05-chapter1-script.md コマ4 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_04_narration: SceneData = {
  scene_id: "ch1_s04_narration",
  type: "narration",
  messages: [
    {
      text: "みのりに調査結果を報告する日。\n窓の外は薄い曇り。港の方向から\nコンテナ船の汽笛が遠く聞こえた。",
    },
    {
      text: "みのりは昨日よりも少し緊張した顔で来た。",
    },
  ],
  next_scene: "ch1_s04_minori_arrive",
};

export const scene_04_minori_arrive: SceneData = {
  scene_id: "ch1_s04_minori_arrive",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……何かわかりましたか",
      pose: "anxious",
    },
  ],
  next_scene: "ch1_s04_report_choice",
};

export const scene_04_report_choice: SceneData = {
  scene_id: "ch1_s04_report_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "友達が悪かったと伝える",
      status_delta: { connect_power: 2, express_power: 3 },
      flag_updates: [{ key: "EMPATHY_COUNT", delta: 1 }],
      next_scene: "ch1_s04a_report",
    },
    {
      key: "B",
      label: "状況を整理して伝える",
      status_delta: { question_power: 1, explore_power: 2, connect_power: 3, express_power: 2 },
      next_scene: "ch1_s04b_report",
    },
    {
      key: "C",
      label: "みのりにも問いを返す",
      status_delta: { question_power: 5 },
      flag_updates: [{ key: "DEEP_DIG_COUNT", delta: 1 }],
      next_scene: "ch1_s04c_report",
    },
  ],
};

// ── ルートA ──────────────────────────────────────────────────────────────────

export const scene_04a_report: SceneData = {
  scene_id: "ch1_s04a_report",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……やっぱりそうですよね！なんか、すっきりした",
      pose: "relieved",
    },
  ],
  next_scene: "ch1_s04a_inner_voice",
};

export const scene_04a_inner_voice: SceneData = {
  scene_id: "ch1_s04a_inner_voice",
  type: "narration",
  messages: [
    { text: "（みのりはすっきりした顔をしている。でも……何かが引っかかる）" },
  ],
  next_scene: "ch1_s04a_ren_enter",
};

export const scene_04a_ren_enter: SceneData = {
  scene_id: "ch1_s04a_ren_enter",
  type: "dialogue",
  messages: [
    { character: "ren", text: "……やっと来れた。ヨアケ探偵社、初めて入るな", pose: "cold" },
    { character: "yu", text: "あ、明智くん。どうしたの", pose: "casual" },
    { character: "ren", text: "SONARの明智連だ。一応、伝えておく", pose: "cold" },
    {
      character: "ren",
      text: "それでいい選択じゃないか。SONARならそこで終わりだよ。依頼人が納得してケースクローズ。みのりさん、よかったね",
      pose: "slight_smile",
    },
  ],
  next_scene: "ch1_s04a_inner_voice_2",
};

export const scene_04a_inner_voice_2: SceneData = {
  scene_id: "ch1_s04a_inner_voice_2",
  type: "narration",
  messages: [
    {
      text: "（連は「よかったね」と言った。みのりも頷いた。でも、なんかこれで終わりな気がしない）",
    },
  ],
  next_scene: "ch1_s04_ren_exit",
};

// ── ルートB ──────────────────────────────────────────────────────────────────

export const scene_04b_report: SceneData = {
  scene_id: "ch1_s04b_report",
  type: "dialogue",
  messages: [
    { character: "minori", text: "……どういうことですか？", pose: "confused" },
    { character: "minori", text: "でも、じゃあ、どうしたら……", pose: "anxious" },
  ],
  next_scene: "ch1_s04b_ren_enter",
};

export const scene_04b_ren_enter: SceneData = {
  scene_id: "ch1_s04b_ren_enter",
  type: "dialogue",
  messages: [
    { character: "ren", text: "……やっと来れた。ヨアケ探偵社、初めて入るな", pose: "cold" },
    { character: "yu", text: "あ、明智くん。どうしたの", pose: "casual" },
    { character: "ren", text: "SONARの明智連だ。一応、伝えておく", pose: "cold" },
    {
      character: "ren",
      text: "……わかりにくくない？もっとシンプルに言えばよかったのに。整理して伝えるのはいいけど、依頼人は答えを求めて来てるんだから",
      pose: "cold",
    },
    { character: "ren", text: "SONARならもうケース閉じてるよ", pose: "cold" },
  ],
  next_scene: "ch1_s04_ren_exit",
};

// ── ルートC ──────────────────────────────────────────────────────────────────

export const scene_04c_report: SceneData = {
  scene_id: "ch1_s04c_report",
  type: "dialogue",
  messages: [
    { character: "minori", text: "……私が、何を？", pose: "surprised" },
    { character: "minori", text: "……私が、何を求めていたか、ですか", pose: "thinking" },
  ],
  next_scene: "ch1_s04c_ren_enter",
};

export const scene_04c_ren_enter: SceneData = {
  scene_id: "ch1_s04c_ren_enter",
  type: "dialogue",
  messages: [
    { character: "ren", text: "……やっと来れた。ヨアケ探偵社、初めて入るな", pose: "cold" },
    { character: "yu", text: "あ、明智くん。どうしたの", pose: "casual" },
    { character: "ren", text: "SONARの明智連だ。一応、伝えておく", pose: "cold" },
  ],
  next_scene: "ch1_s04c_ren_subchoice",
};

export const scene_04c_ren_subchoice: SceneData = {
  scene_id: "ch1_s04c_ren_subchoice",
  type: "choice",
  messages: [
    {
      character: "ren",
      text: "……答えを求めてる依頼人に、問いを返すのか",
      pose: "cold",
    },
    {
      character: "ren",
      text: "非効率だな。依頼人が何を求めてるか考えてる？",
      pose: "cold",
    },
  ],
  choices: [
    {
      key: "A",
      label: "そうかもしれない",
      flag_updates: [{ key: "REN_RELATION_NEUTRAL", delta: 1 }],
      next_scene: "ch1_s04c_ren_c1",
    },
    {
      key: "B",
      label: "効率だけが仕事じゃない",
      flag_updates: [{ key: "REN_RELATION_OPPOSE", delta: 1 }],
      next_scene: "ch1_s04c_ren_c2",
    },
    {
      key: "C",
      label: "（何も言わず、みのりを見る）",
      flag_updates: [{ key: "REN_RELATION_RESPECT", delta: 1 }],
      next_scene: "ch1_s04c_ren_c3",
    },
  ],
};

export const scene_04c_ren_c1: SceneData = {
  scene_id: "ch1_s04c_ren_c1",
  type: "dialogue",
  messages: [
    { character: "ren", text: "……正直な奴だな", pose: "slightly_surprised" },
  ],
  next_scene: "ch1_s04_ren_exit",
};

export const scene_04c_ren_c2: SceneData = {
  scene_id: "ch1_s04c_ren_c2",
  type: "dialogue",
  messages: [
    { character: "ren", text: "……そういう綺麗事、俺は好きじゃない", pose: "cold" },
  ],
  next_scene: "ch1_s04_ren_exit",
};

export const scene_04c_ren_c3: SceneData = {
  scene_id: "ch1_s04c_ren_c3",
  type: "dialogue",
  messages: [
    { character: "ren", text: "……変な奴だな", pose: "thinking" },
  ],
  next_scene: "ch1_s04_ren_exit",
};

// ── 連退場・共通エンディング ───────────────────────────────────────────────────

export const scene_04_ren_exit: SceneData = {
  scene_id: "ch1_s04_ren_exit",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……あれ、明智連。SONAR所属の見習い探偵。年は一緒くらいだけど",
      pose: "casual",
    },
    {
      character: "yu",
      text: "本当に速いんだよね、あいつ。答えを出すのが。……あんまり間違えないし",
      pose: "thinking",
    },
    {
      character: "yu",
      text: "でも、なんか……毎回あいつが解決した依頼人の話を聞いてると、もやっとする。うまく言えないんだけど",
      pose: "conflicted",
    },
  ],
  next_scene: "ch1_s04_minori_leave",
};

export const scene_04_minori_leave: SceneData = {
  scene_id: "ch1_s04_minori_leave",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……少し、考えてみます",
      pose: "thoughtful",
    },
  ],
  next_scene: "ch1_s04_inner_voice",
};

export const scene_04_inner_voice: SceneData = {
  scene_id: "ch1_s04_inner_voice",
  type: "narration",
  messages: [
    {
      text: "（連は「非効率だ」と言った。速く答えを出して、依頼人を納得させることが仕事だ、という言い方をした。……連は間違ってない気がした。でも、なんかそれだけじゃない気もした）",
    },
  ],
  next_scene: "ch1_s04_journal",
};

export const scene_04_journal: SceneData = {
  scene_id: "ch1_s04_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "明智連の言葉、聞こえていましたね。\nあの言葉のどこかに共感しましたか。もしそうなら、なぜだと思いますか",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "連の言葉のどこかに共感した？それはなぜ？（スキップ可）",
  requires_journal: false,
  next_scene: "ch1_s05_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_04: Record<string, SceneData> = {
  ch1_s04_narration: scene_04_narration,
  ch1_s04_minori_arrive: scene_04_minori_arrive,
  ch1_s04_report_choice: scene_04_report_choice,
  ch1_s04a_report: scene_04a_report,
  ch1_s04a_inner_voice: scene_04a_inner_voice,
  ch1_s04a_ren_enter: scene_04a_ren_enter,
  ch1_s04a_inner_voice_2: scene_04a_inner_voice_2,
  ch1_s04b_report: scene_04b_report,
  ch1_s04b_ren_enter: scene_04b_ren_enter,
  ch1_s04c_report: scene_04c_report,
  ch1_s04c_ren_enter: scene_04c_ren_enter,
  ch1_s04c_ren_subchoice: scene_04c_ren_subchoice,
  ch1_s04c_ren_c1: scene_04c_ren_c1,
  ch1_s04c_ren_c2: scene_04c_ren_c2,
  ch1_s04c_ren_c3: scene_04c_ren_c3,
  ch1_s04_ren_exit: scene_04_ren_exit,
  ch1_s04_minori_leave: scene_04_minori_leave,
  ch1_s04_inner_voice: scene_04_inner_voice,
  ch1_s04_journal: scene_04_journal,
};
