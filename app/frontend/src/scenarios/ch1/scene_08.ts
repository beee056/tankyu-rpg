import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ8「内省ジャーナル」
// 依拠: design/05-chapter1-script.md コマ8 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_08_narration: SceneData = {
  scene_id: "ch1_s08_narration",
  type: "narration",
  messages: [
    {
      text: "知深が、革表紙のノートを一冊持ってきた。\n「内省ジャーナルです」と言って、テーブルに置いた。",
    },
    {
      text: "「書きたくなったら書いてください。\n書けなかったら、ここに座っているだけでもいい」",
    },
  ],
  next_scene: "ch1_s08_chifuka_intro",
};

export const scene_08_chifuka_intro: SceneData = {
  scene_id: "ch1_s08_chifuka_intro",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "一つだけ聞かせてください",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "今回の調査で一番驚いたことは何でしたか",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s08_journal1",
};

export const scene_08_journal1: SceneData = {
  scene_id: "ch1_s08_journal1",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "今日の調査で一番驚いたことは？",
      pose: "gentle",
    },
  ],
  journal_prompt: "今日の調査で一番驚いたことは何でしたか",
  requires_journal: true,
  next_scene: "ch1_s08_chifuka_q2",
};

export const scene_08_chifuka_q2: SceneData = {
  scene_id: "ch1_s08_chifuka_q2",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……みのりの問いと、あなた自身の問いは——似ていましたか",
      pose: "thoughtful",
    },
  ],
  next_scene: "ch1_s08_journal2",
};

export const scene_08_journal2: SceneData = {
  scene_id: "ch1_s08_journal2",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "みのりの問いとあなた自身の問いは似ていましたか？",
      pose: "gentle",
    },
  ],
  journal_prompt: "みのりの問いとあなた自身の問いは——似ていましたか",
  requires_journal: true,
  next_scene: "ch1_s08_evolution_log",
};

export const scene_08_evolution_log: SceneData = {
  scene_id: "ch1_s08_evolution_log",
  type: "narration",
  messages: [
    {
      text: "【問いの進化ログ】\nコマ1のあなた → 今のあなた",
    },
  ],
  next_scene: "ch1_s08_chifuka_log",
};

export const scene_08_chifuka_log: SceneData = {
  scene_id: "ch1_s08_chifuka_log",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……最初の問いと、今の問いを並べてみると",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s08_title_reveal",
};

export const scene_08_title_reveal: SceneData = {
  scene_id: "ch1_s08_title_reveal",
  type: "narration",
  messages: [
    {
      text: "称号：「問いの芽吹き」",
    },
  ],
  next_scene: "ch1_s08_ren_appears",
};

export const scene_08_ren_appears: SceneData = {
  scene_id: "ch1_s08_ren_appears",
  type: "dialogue",
  messages: [
    {
      character: "ren",
      text: "……来た",
      pose: "hesitant",
    },
    {
      character: "yu",
      text: "あ、明智くんじゃん。珍しい、ちゃんとドア開けてきた",
      pose: "casual",
    },
    {
      character: "ren",
      text: "……昨日のこと",
      pose: "cold",
    },
    {
      character: "ren",
      text: "\"効率だけが仕事じゃない\"って言ったやつ。……あれ、どういう意味だったんだ",
      pose: "cold",
    },
  ],
  next_scene: "ch1_s08_ren_choice",
};

export const scene_08_ren_choice: SceneData = {
  scene_id: "ch1_s08_ren_choice",
  type: "choice",
  messages: [],
  choices: [
    {
      key: "A",
      label: "あのときは、うまく言えなかった",
      next_scene: "ch1_s08a_react",
    },
    {
      key: "B",
      label: "効率より、みのりの問いの方が大事だと思ったから",
      next_scene: "ch1_s08b_react",
    },
    {
      key: "C",
      label: "……連は、どう思った？",
      next_scene: "ch1_s08c_react",
    },
  ],
};

export const scene_08a_react: SceneData = {
  scene_id: "ch1_s08a_react",
  type: "dialogue",
  messages: [
    {
      character: "ren",
      text: "……そうか",
      pose: "tension_release",
    },
    {
      character: "ren",
      text: "俺は、答えを出すのが速い。それが得意で、それがいいことだと思ってた。でも……",
      pose: "thinking",
    },
    {
      character: "ren",
      text: "……なんでもない。邪魔したな",
      pose: "departing",
    },
  ],
  next_scene: "ch1_s08_yu_comment",
};

export const scene_08b_react: SceneData = {
  scene_id: "ch1_s08b_react",
  type: "dialogue",
  messages: [
    {
      character: "ren",
      text: "……それ、どういう意味だ",
      pose: "conflicted",
    },
    {
      character: "ren",
      text: "……俺の解決した依頼人、みんなケースが閉じた後どうなってるんだろ。一回も追ってなかった",
      pose: "thinking",
    },
    {
      character: "ren",
      text: "……考えておく",
      pose: "departing",
    },
  ],
  next_scene: "ch1_s08_yu_comment",
};

export const scene_08c_react: SceneData = {
  scene_id: "ch1_s08c_react",
  type: "dialogue",
  messages: [
    {
      character: "ren",
      text: "……俺に聞くのか",
      pose: "surprised",
    },
    {
      character: "ren",
      text: "……正直、わからん。SONARのやり方が正しいと思ってたし、今も間違ってるとは思わない。ただ……",
      pose: "thinking",
    },
    {
      character: "ren",
      text: "昨日お前が\"問いを返した\"の、みのりの顔が変わったのは、俺から見てもわかったから",
      pose: "conflicted",
    },
    {
      character: "ren",
      text: "……それだけだ。また来るかもしれない",
      pose: "departing",
    },
  ],
  next_scene: "ch1_s08_yu_comment",
};

export const scene_08_yu_comment: SceneData = {
  scene_id: "ch1_s08_yu_comment",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……珍しいね、あいつがああいうこと言うの",
      pose: "casual",
    },
    {
      character: "yu",
      text: "なんか変わったのかもね、少し",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s08_chifuka_closing",
};

export const scene_08_chifuka_closing: SceneData = {
  scene_id: "ch1_s08_chifuka_closing",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……今回の調査は、ここで一区切りです",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "でも一つだけ、聞かせてください",
      pose: "gentle",
    },
    {
      character: "chifuka",
      text: "今、あなたの中に、誰かに話したくなるような問いは、ありますか",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s08_final_journal",
};

export const scene_08_final_journal: SceneData = {
  scene_id: "ch1_s08_final_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "今、あなたの中に気になっていることは何ですか。あなた自身の言葉で",
      pose: "gentle",
    },
  ],
  journal_prompt: "今、あなたの中に気になっていることは何ですか。あなた自身の言葉で（推奨）",
  requires_journal: false,
  next_scene: "ch1_s08_akira_final",
};

export const scene_08_akira_final: SceneData = {
  scene_id: "ch1_s08_akira_final",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "……来たのか",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "で、本当の問いは何？",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "……それ、笑うとこじゃない",
      pose: "slight_reaction",
    },
    {
      character: "akira",
      text: "今回の依頼、終わったな",
      pose: "expressionless",
    },
    {
      character: "akira",
      text: "よくやった",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s08_end_narration",
};

export const scene_08_end_narration: SceneData = {
  scene_id: "ch1_s08_end_narration",
  type: "narration",
  messages: [
    {
      text: "（今日、ヨアケ探偵社の見習い1日目が終わった。答えは一つも出なかった。みのりの問いは変わった。連は何かを考えて帰っていった。御堂は「よくやった」と言った。それが褒め言葉かどうかはよくわからない）",
    },
    {
      text: "（でも——何か、自分の中にも問いが生まれた気がする。それが何かは、まだうまく言葉にできない。でも確かに、ある）",
    },
    {
      text: "第1章「灯台に来た日」——完\n\nあなたのジャーナルは、あなただけのものです。",
    },
  ],
  next_scene: "CHAPTER_END",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_08: Record<string, SceneData> = {
  ch1_s08_narration: scene_08_narration,
  ch1_s08_chifuka_intro: scene_08_chifuka_intro,
  ch1_s08_journal1: scene_08_journal1,
  ch1_s08_chifuka_q2: scene_08_chifuka_q2,
  ch1_s08_journal2: scene_08_journal2,
  ch1_s08_evolution_log: scene_08_evolution_log,
  ch1_s08_chifuka_log: scene_08_chifuka_log,
  ch1_s08_title_reveal: scene_08_title_reveal,
  ch1_s08_ren_appears: scene_08_ren_appears,
  ch1_s08_ren_choice: scene_08_ren_choice,
  ch1_s08a_react: scene_08a_react,
  ch1_s08b_react: scene_08b_react,
  ch1_s08c_react: scene_08c_react,
  ch1_s08_yu_comment: scene_08_yu_comment,
  ch1_s08_chifuka_closing: scene_08_chifuka_closing,
  ch1_s08_final_journal: scene_08_final_journal,
  ch1_s08_akira_final: scene_08_akira_final,
  ch1_s08_end_narration: scene_08_end_narration,
};
