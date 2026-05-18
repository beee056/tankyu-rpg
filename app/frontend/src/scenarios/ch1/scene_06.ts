import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// コマ6「根本の問いへ」
// 依拠: design/05-chapter1-script.md コマ6 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_06_narration: SceneData = {
  scene_id: "ch1_s06_narration",
  type: "narration",
  messages: [
    {
      text: "調査室のコルクボードに並んでいた情報カード。\n遊がそれを一枚ずつ外しながら、\n「このカードたちの行き先、考えてみようか」と言った。",
    },
    {
      text: "港の灯台が、窓の向こうでゆっくり光り始めていた。",
    },
  ],
  next_scene: "ch1_s06_minori_returns",
};

export const scene_06_minori_returns: SceneData = {
  scene_id: "ch1_s06_minori_returns",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "……桐嶋に、話しかけてみました",
      pose: "calm",
    },
    {
      character: "minori",
      text: "直接聞く、っていうよりは……なんか声かけた感じで。\"最近なんか大変そうだけど、大丈夫？\"みたいな",
      pose: "soft_smile",
    },
    {
      character: "minori",
      text: "そしたら泣き出して",
      pose: "surprised",
    },
    {
      character: "minori",
      text: "いろいろ話してくれました。家のこととか。投稿のこと、私のことじゃなかったみたいで。でもそれより、なんか……桐嶋が一人でしんどかったんだな、って",
      pose: "calm",
    },
  ],
  next_scene: "ch1_s06_minori_resolve",
};

export const scene_06_minori_resolve: SceneData = {
  scene_id: "ch1_s06_minori_resolve",
  type: "dialogue",
  messages: [
    {
      character: "minori",
      text: "最初は、私のことが嫌いなのかって聞こうとしてた。でもそんなこと、どうでも良くなった",
      pose: "calm",
    },
    {
      character: "minori",
      text: "……最初の問い、変わったと思います",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s06_inner_voice_1",
};

export const scene_06_inner_voice_1: SceneData = {
  scene_id: "ch1_s06_inner_voice_1",
  type: "narration",
  messages: [
    {
      text: "（みのりの問いが変わった。最初の「友達は私のことが嫌いなの？」から——）",
    },
  ],
  next_scene: "ch1_s06_akira_question",
};

export const scene_06_akira_question: SceneData = {
  scene_id: "ch1_s06_akira_question",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "で、本当の問いは何？",
      pose: "quiet",
    },
    {
      character: "minori",
      text: "……私は、なぜあんなに怖かったのか。それと……桐嶋はなぜ言えなかったのか",
      pose: "calm",
    },
    {
      character: "minori",
      text: "その二つの問いが、たぶん……本当の問い",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s06_akira_respond",
};

export const scene_06_akira_respond: SceneData = {
  scene_id: "ch1_s06_akira_respond",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "……それを持って帰れ",
      pose: "quiet",
    },
    {
      character: "akira",
      text: "答えを出すな、とは言わない。でも……その問いを持ったまま、しばらく歩いてみろ",
      pose: "expressionless",
    },
    {
      character: "minori",
      text: "……はい",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s06_yu_reflect_choice",
};

export const scene_06_yu_reflect_choice: SceneData = {
  scene_id: "ch1_s06_yu_reflect_choice",
  type: "choice",
  messages: [
    {
      character: "yu",
      text: "……最初の依頼と、かなり変わったね。問いが",
      pose: "casual",
    },
    {
      character: "yu",
      text: "どう感じてる？",
      pose: "listening",
    },
  ],
  choices: [
    {
      key: "A",
      label: "なんか、すっきりしない",
      next_scene: "ch1_s06a_react",
    },
    {
      key: "B",
      label: "面白かった",
      next_scene: "ch1_s06b_react",
    },
    {
      key: "C",
      label: "……わからない",
      next_scene: "ch1_s06c_react",
    },
  ],
};

export const scene_06a_react: SceneData = {
  scene_id: "ch1_s06a_react",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "そうだよね。解決したかどうか、曖昧だし",
      pose: "casual",
    },
    {
      character: "yu",
      text: "でも……その『すっきりしない』が大事なんだよ、たぶん。御堂もよく言うんだよね。答えが出たとき、すっきりしすぎたら疑えって",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s06_akira_lighthouse",
};

export const scene_06b_react: SceneData = {
  scene_id: "ch1_s06b_react",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……面白かったか！そっか",
      pose: "surprised_happy",
    },
    {
      character: "yu",
      text: "俺もそうなんだよね。みんなに言うと引かれるんだけど、依頼人の問いが変わっていくのが、なんか……好きなんだよな",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s06_akira_lighthouse",
};

export const scene_06c_react: SceneData = {
  scene_id: "ch1_s06c_react",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "うん。わからないで正解だと思う",
      pose: "casual",
    },
    {
      character: "yu",
      text: "わかった気がするとき、俺は逆に不安になる。本当にわかったのかな、って",
      pose: "thinking",
    },
  ],
  next_scene: "ch1_s06_akira_lighthouse",
};

export const scene_06_akira_lighthouse: SceneData = {
  scene_id: "ch1_s06_akira_lighthouse",
  type: "dialogue",
  messages: [
    {
      character: "akira",
      text: "灯台は答えを教えない。方向だけを教える",
      pose: "distant_gaze",
    },
    {
      character: "akira",
      text: "みのりが持って帰った問いが、彼女の灯台になる",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s06_inner_voice",
};

export const scene_06_inner_voice: SceneData = {
  scene_id: "ch1_s06_inner_voice",
  type: "narration",
  messages: [
    {
      text: "（御堂は「答えを教えない」と言う。最初はそれが不親切に思えた。でも……みのりが自分で問いを立てて帰っていく様子を見たとき、御堂の言ってることが少しだけわかった気がした。答えを渡されなかったから、みのりは自分で考えたんだ）",
    },
  ],
  next_scene: "ch1_s06_chifuka_transition",
};

export const scene_06_chifuka_transition: SceneData = {
  scene_id: "ch1_s06_chifuka_transition",
  type: "dialogue",
  messages: [
    {
      character: "chifuka",
      text: "……今日の調査、おつかれさまでした",
      pose: "calm",
    },
    {
      character: "chifuka",
      text: "明日、ジャーナルを書く時間を取っています。また来てください",
      pose: "gentle",
    },
  ],
  next_scene: "ch1_s07_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_06: Record<string, SceneData> = {
  ch1_s06_narration: scene_06_narration,
  ch1_s06_minori_returns: scene_06_minori_returns,
  ch1_s06_minori_resolve: scene_06_minori_resolve,
  ch1_s06_inner_voice_1: scene_06_inner_voice_1,
  ch1_s06_akira_question: scene_06_akira_question,
  ch1_s06_akira_respond: scene_06_akira_respond,
  ch1_s06_yu_reflect_choice: scene_06_yu_reflect_choice,
  ch1_s06a_react: scene_06a_react,
  ch1_s06b_react: scene_06b_react,
  ch1_s06c_react: scene_06c_react,
  ch1_s06_akira_lighthouse: scene_06_akira_lighthouse,
  ch1_s06_inner_voice: scene_06_inner_voice,
  ch1_s06_chifuka_transition: scene_06_chifuka_transition,
};
