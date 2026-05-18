import type { SceneData } from "shared-types";

// ─────────────────────────────────────────────────────────────────────────────
// 隠しコマ5.5「親友の声」
// 出現条件: コマ5「ケースの選択」でB「もっと深く調べる」を選択
//           → scene_05_journal_dig (next_scene: "ch1_s05_5_narration") から遷移
// ステータス: 問い力+5 / 称号「根を掘った探偵」フラグ（コマ5選択時に付与済み）
// 依拠: design/05-chapter1-script.md 隠しコマ5.5 全文
// ─────────────────────────────────────────────────────────────────────────────

export const scene_05_5_narration: SceneData = {
  scene_id: "ch1_s05_5_narration",
  type: "narration",
  messages: [
    {
      text: "──── 隠しコマ5.5「親友の声」────",
    },
  ],
  next_scene: "ch1_s05_5_yu_goes",
};

export const scene_05_5_yu_goes: SceneData = {
  scene_id: "ch1_s05_5_yu_goes",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……深く掘るか。じゃあ俺、もう一回桐嶋さんに当たってみる",
      pose: "casual",
    },
  ],
  next_scene: "ch1_s05_5_waiting",
};

export const scene_05_5_waiting: SceneData = {
  scene_id: "ch1_s05_5_waiting",
  type: "narration",
  messages: [
    {
      text: "（しばらくして）",
    },
  ],
  next_scene: "ch1_s05_5_yu_returns",
};

export const scene_05_5_yu_returns: SceneData = {
  scene_id: "ch1_s05_5_yu_returns",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……聞けた",
      pose: "serious",
    },
    {
      character: "yu",
      text: "桐嶋さん、泣きながら言ってたんだけど",
      pose: "quiet",
    },
  ],
  next_scene: "ch1_s05_5_revelation",
};

export const scene_05_5_revelation: SceneData = {
  scene_id: "ch1_s05_5_revelation",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "\"最近ずっと家のこととかいろいろあって、しんどかった。でもみのりには心配かけたくなくて、ずっと隠してた\"",
      pose: "listening",
    },
    {
      character: "yu",
      text: "\"でもそれがつらくなって、誰に向けるでもなく投稿したら……みのりから探偵に相談した、ってことを後から知って。なんかごめんなさい、ってなった\"、って",
      pose: "listening",
    },
  ],
  next_scene: "ch1_s05_5_yu_reflect",
};

export const scene_05_5_yu_reflect: SceneData = {
  scene_id: "ch1_s05_5_yu_reflect",
  type: "dialogue",
  messages: [
    {
      character: "yu",
      text: "……みのりは傷ついた。桐嶋さんも傷ついてた。二人とも、傷つけたくなくて、傷ついてたんだ",
      pose: "quiet",
    },
    {
      character: "yu",
      text: "……問いが、二つあったんだね",
      pose: "soft_smile",
    },
  ],
  next_scene: "ch1_s05_5_akira_moment",
};

export const scene_05_5_akira_moment: SceneData = {
  scene_id: "ch1_s05_5_akira_moment",
  type: "narration",
  messages: [
    {
      text: "（御堂が調査室の入口に立っている。静かに二人を見ている）",
    },
    {
      text: "（御堂——初めて、ほんの少し、表情がやわらかくなった）",
    },
  ],
  next_scene: "ch1_s05_5_inner_voice",
};

export const scene_05_5_inner_voice: SceneData = {
  scene_id: "ch1_s05_5_inner_voice",
  type: "narration",
  messages: [
    {
      text: "（みのりの問いだと思っていた。でも親友にも問いがあった。最初、私は誰か一人の問いを探していた。でも……問いは、一つじゃなかった）",
    },
  ],
  next_scene: "ch1_s05_5_journal",
};

export const scene_05_5_journal: SceneData = {
  scene_id: "ch1_s05_5_journal",
  type: "journal",
  messages: [
    {
      character: "chifuka",
      text: "この依頼は、『解決した』と思いますか。\nあなたの言葉で、教えてください",
      pose: "gentle",
    },
  ],
  journal_prompt:
    "この依頼は、「解決した」と思いますか。あなたの言葉で、教えてください",
  requires_journal: true,
  next_scene: "ch1_s06_narration",
};

// ── シーンマップ ──────────────────────────────────────────────────────────────
export const SCENE_MAP_05_5: Record<string, SceneData> = {
  ch1_s05_5_narration: scene_05_5_narration,
  ch1_s05_5_yu_goes: scene_05_5_yu_goes,
  ch1_s05_5_waiting: scene_05_5_waiting,
  ch1_s05_5_yu_returns: scene_05_5_yu_returns,
  ch1_s05_5_revelation: scene_05_5_revelation,
  ch1_s05_5_yu_reflect: scene_05_5_yu_reflect,
  ch1_s05_5_akira_moment: scene_05_5_akira_moment,
  ch1_s05_5_inner_voice: scene_05_5_inner_voice,
  ch1_s05_5_journal: scene_05_5_journal,
};
