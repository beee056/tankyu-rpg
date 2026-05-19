import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ7「選択と提示」
// 依拠: design/05-chapter1-script.md コマ7 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_07_narration: SceneData = {
  scene_id: "ch1_s07_narration",
  type: "narration",
  messages: [
    {
      text: "翌朝、ヨアケ探偵社に行くと知深がいた。\nコーヒーが二つ置かれていた。",
    },
    {
      text: "「おはようございます」と言った知深の声は、\n昨日より少しやわらかかった気がした。",
    },
  ],
  next_scene: "ch1_s07_chifuka_dialogue",
};

export const scene_07_chifuka_dialogue: SceneData = {
  scene_id: "ch1_s07_chifuka_dialogue",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "昨日の調査について、少し話を聞かせてもらえますか",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "……みのりへの返し方、あなたはどうすると決めましたか",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "ヨアケ探偵社のやり方は……答えを渡さない。代わりに問いを一緒に深める。でも依頼人が本当に求めているのが『答え』だったとき、私たちは何をすべきだと思いますか",
      pose: "serious",
    },
  ],
  next_scene: "ch1_s07_chifuka_choice",
};

export const scene_07_chifuka_choice: SceneData = {
  scene_id: "ch1_s07_chifuka_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "やっぱり問いを返すべきだと思う",
      next_scene: "ch1_s07a_react",
    },
    {
      key: "B",
      label: "場合によっては答えを伝えることもあると思う",
      next_scene: "ch1_s07b_react",
    },
    {
      key: "C",
      label: "……まだわからない",
      next_scene: "ch1_s07c_react",
    },
  ],
};

export const scene_07a_react: SceneData = {
  scene_id: "ch1_s07a_react",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……なぜですか？",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "みのりは、その問いを持ってどうしましたか",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "……あなたが問いを返さなければ、みのりはあのタイミングで桐嶋に声をかけなかったかもしれない。でも逆に、あなたが答えを返していたら——何が起きたと思いますか",
      pose: "serious",
    },
  ],
  next_scene: "ch1_s07_akira_final",
};

export const scene_07b_react: SceneData = {
  scene_id: "ch1_s07b_react",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……それは、正直な答えだと思います",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "御堂さんは『答えを教えない』と言う。でも私は……答えが必要な瞬間があると思っています",
      pose: "thoughtful",
    },
    {
      character: "chifuka",
      text: "ただ……どちらの答えを渡すか、ではなく。渡すことで依頼人が何を失うかを、考えていますか",
      pose: "serious",
    },
  ],
  next_scene: "ch1_s07_akira_final",
};

export const scene_07c_react: SceneData = {
  scene_id: "ch1_s07c_react",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "わからない、というのは正確な答えです",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "私もまだわからないことがある。御堂さんほど長くやっていても、この問いに毎回迷います",
      pose: "thoughtful",
    },
    {
      character: "chifuka",
      text: "……でも、毎回迷うから、依頼人の顔を見られる気がしています",
      pose: "distant_gaze",
    },
  ],
  next_scene: "ch1_s07_akira_final",
};

export const scene_07_akira_final: SceneData = {
  scene_id: "ch1_s07_akira_final",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "今回の依頼、終わったな",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "でも問いは終わってない",
      pose: "expressionless",
    },
  ],
  next_scene: "ch1_s07_inner_voice",
};

export const scene_07_inner_voice: SceneData = {
  scene_id: "ch1_s07_inner_voice",
  type: "narration",
  messages: [
    {
      text: "（御堂は「終わったな」と言った。でもすぐ「問いは終わってない」と続けた。依頼は終わった。みのりの問いは変わった。でも私の中に、何か残っている）",
    },
    {
      text: "（それが何かは、まだわからない）",
    },
  ],
  next_scene: "ch1_s07_journal",
};

export const scene_07_journal: SceneData = {
  scene_id: "ch1_s07_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "みのりへの返し方——あなたはどう選んで、なぜそう選んだと思いますか",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "みのりへの返し方を選んだのはなぜ？（スキップ可）",
  requires_journal: false,
  next_scene: "ch1_s08_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_07: Record<string, SceneData> = {
  ch1_s07_narration: scene_07_narration,
  ch1_s07_chifuka_dialogue: scene_07_chifuka_dialogue,
  ch1_s07_chifuka_choice: scene_07_chifuka_choice,
  ch1_s07a_react: scene_07a_react,
  ch1_s07b_react: scene_07b_react,
  ch1_s07c_react: scene_07c_react,
  ch1_s07_akira_final: scene_07_akira_final,
  ch1_s07_inner_voice: scene_07_inner_voice,
  ch1_s07_journal: scene_07_journal,
};
