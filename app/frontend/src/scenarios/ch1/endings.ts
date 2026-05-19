import type { EndingData } from "shared-types";

// ============================================================
// 第1章 エンディングマスターデータ
// 合計: 4件
// 参照: v2-deduction-system.md §5 / v2-scenario-ch1-restructure.md Scene 08
// ============================================================
export const CH1_ENDINGS: Record<string, EndingData> = {
  // ────────────────────────────────────────────────────────
  // ending_ch1_wrong: 誤推理（truthScore < 50 / hyp_ch1_A）
  // ────────────────────────────────────────────────────────
  ending_ch1_wrong: {
    id: "ending_ch1_wrong",
    title: "速すぎた答え",
    dialogues: [
      {
        character: "akira",
        text: "……それを持って帰れ",
      },
      {
        character: "minori",
        text: "友達が悪かったとわかった……はずなのに、なんかすっきりしないんです",
      },
      {
        character: "yu",
        text: "……連みたいな答えの出し方、しちゃったかな",
      },
    ],
    innerVoice:
      "答えは出た。でも、みのりの表情が変わらなかった。\n何かを見落としているかもしれない",
    endingCard:
      "第1章 誤推理 ─ 速すぎた答え",
    retryEnabled: true,
    hint: "桐嶋側の証拠がまだあるかもしれない",
  },

  // ────────────────────────────────────────────────────────
  // ending_ch1_partial: 部分到達（truthScore 50-69 / hyp_ch1_B）
  // ────────────────────────────────────────────────────────
  ending_ch1_partial: {
    id: "ending_ch1_partial",
    title: "見えた側面",
    dialogues: [
      {
        character: "akira",
        text: "……それを持って帰れ",
      },
      {
        character: "minori",
        text: "桐嶋は疲れていた。私のことを嫌いなわけじゃなかった。\n……それだけはわかった気がします",
      },
      {
        character: "akira",
        text: "それで足りるか？",
      },
      {
        character: "minori",
        text: "……まだわかりません",
      },
    ],
    innerVoice:
      "一面は見えた。でも何かが足りない気がする。\n見逃した証拠が、まだあるのかもしれない",
    endingCard:
      "第1章 部分到達 ─ 見えた側面",
    retryEnabled: true,
    hint: "見逃した証拠があります。2周目で確かめよう",
  },

  // ────────────────────────────────────────────────────────
  // ending_ch1_true: 真相到達（truthScore 70-89 / hyp_ch1_C）
  // ────────────────────────────────────────────────────────
  ending_ch1_true: {
    id: "ending_ch1_true",
    title: "二つの問い",
    dialogues: [
      {
        character: "akira",
        text: "……それを持って帰れ",
      },
      {
        character: "minori",
        text: "……私は、なぜあんなに怖かったのか。そして……桐嶋は\nなぜ言えなかったのか",
      },
      {
        character: "minori",
        text: "その二つの問いが、たぶん……本当の問い",
      },
      {
        character: "akira",
        text: "答えを出すな、とは言わない。でも……その問いを持ったまま、\nしばらく歩いてみろ",
      },
      {
        character: "minori",
        text: "……はい",
      },
    ],
    innerVoice:
      "みのりの問いだと思っていた。でも、問いは二つあった。\nそれに気づけたのは——証拠を一つひとつ丁寧に追ったからだ",
    endingCard:
      "第1章 真相到達 ─ 二つの問い",
    retryEnabled: false,
  },

  // ────────────────────────────────────────────────────────
  // ending_ch1_deep: 深層真相（truthScore 90+ / hyp_ch1_D）
  // ────────────────────────────────────────────────────────
  ending_ch1_deep: {
    id: "ending_ch1_deep",
    title: "根を掘った者が見る景色",
    dialogues: [
      {
        character: "akira",
        text: "……それを持って帰れ",
      },
      {
        character: "minori",
        text: "桐嶋の家のことまで、知りませんでした。ずっと一人で\n抱えてたのか……",
      },
      {
        character: "minori",
        text: "私の問いより、桐嶋の問いの方が、ずっと大きかった",
      },
      {
        character: "akira",
        text: "……よく、そこまで見た",
      },
    ],
    innerVoice:
      "問いは一つじゃなかった。深く掘れば掘るほど、\nもっと深いところに誰かの問いが眠っていた",
    endingCard:
      "第1章 真相到達（深層）─ 根を掘った者が見る景色",
    achievement: "根を掘った探偵",
    retryEnabled: false,
  },
};

// ── エンディングIDのリスト ───────────────────────────────────────
export const CH1_ENDING_IDS = Object.keys(CH1_ENDINGS);

// ── truthScore からエンディングIDを決定する ─────────────────────
export function determineEndingId(score: number): string {
  if (score >= 90) return "ending_ch1_deep";
  if (score >= 70) return "ending_ch1_true";
  if (score >= 50) return "ending_ch1_partial";
  return "ending_ch1_wrong";
}
