import type { Evidence } from "shared-types";

// ============================================================
// 第1章 証拠マスターデータ
// 合計: 10件
//   通常証拠: ev_ch1_01 〜 ev_ch1_07 (7件) + ev_ch1_04a (1件)
//   隠し証拠: ev_ch1_5h_01, ev_ch1_5h_02 (2件)
// ============================================================
export const CH1_EVIDENCES: Record<string, Evidence> = {
  // ──────────────────────────────────────────────────────────
  // Scene 01: 灯台に来た日
  // ──────────────────────────────────────────────────────────
  ev_ch1_01: {
    id: "ev_ch1_01",
    sceneId: "ch1_s01_minori_enter",
    type: "observation",
    title: "依頼の手紙の様子",
    snippet:
      "依頼人は制服が少しよれていて、入ってくるとき躊躇していた",
    icon: "eye",
    tags: ["みのり", "緊張", "依頼", "身なり"],
    source: {
      speaker: undefined,
      line: undefined,
    },
  },

  ev_ch1_02: {
    id: "ev_ch1_02",
    sceneId: "ch1_s01_akira_listen",
    type: "dialogue",
    title: "「変ですよね」の自己否定",
    snippet:
      "直接聞けない自分を変だと笑う。でも御堂は変じゃないと言った",
    icon: "message-circle",
    tags: ["みのり", "傷つき", "確認恐怖", "自己否定"],
    source: {
      speaker: "みのり",
      line: undefined,
    },
  },

  // ──────────────────────────────────────────────────────────
  // Scene 02: 情報を集める
  // ──────────────────────────────────────────────────────────
  ev_ch1_03: {
    id: "ev_ch1_03",
    sceneId: "ch1_s02_route_b",
    type: "item",
    title: "SNS投稿の曖昧さ",
    snippet:
      "\"いつも自分のことしか考えてない人\"——主語がない。みのりのことかどうかは不明",
    icon: "file-text",
    tags: ["投稿", "特定不能", "主語なし", "曖昧"],
    source: {
      speaker: undefined,
      line: undefined,
    },
  },

  ev_ch1_04: {
    id: "ev_ch1_04",
    sceneId: "ch1_s02_route_c",
    type: "dialogue",
    title: "親友の疲れの言葉",
    snippet:
      "桐嶋：別に嫌いなわけじゃない、最近疲れてる",
    icon: "message-circle",
    tags: ["桐嶋", "疲れ", "最近", "否定でない"],
    source: {
      speaker: "桐嶋",
      line: undefined,
    },
  },

  ev_ch1_05: {
    id: "ev_ch1_05",
    sceneId: "ch1_s02_route_c",
    type: "dialogue",
    title: "「心配かけたくなかった」",
    snippet:
      "桐嶋：みのりには心配をかけたくなかった、だから隠していた",
    icon: "message-circle",
    tags: ["桐嶋", "隠す", "気遣い", "みのり"],
    source: {
      speaker: "桐嶋",
      line: undefined,
    },
  },

  ev_ch1_04a: {
    id: "ev_ch1_04a",
    sceneId: "ch1_s02_route_a",
    type: "observation",
    title: "文化祭後の違和感",
    snippet:
      "みのり：文化祭の後、空気が変わった気はしてた。でも何が変わったのかはわからない",
    icon: "eye",
    tags: ["みのり", "変化", "違和感", "文化祭後"],
    source: {
      speaker: "みのり",
      line: undefined,
    },
  },

  // ──────────────────────────────────────────────────────────
  // Scene 03 / 05 (救済): みのりの問い
  // ──────────────────────────────────────────────────────────
  ev_ch1_06: {
    id: "ev_ch1_06",
    sceneId: "ch1_s03_question_card_result",
    type: "observation",
    title: "「なぜ怖かったのか」の問い",
    snippet:
      "みのりが本当に恐れていたのは、直接確認することではなく\"なぜ怖いのか\"への答えかもしれない",
    icon: "eye",
    tags: ["みのり", "傷つき", "自己認識", "問いの深化"],
    source: {
      speaker: undefined,
      line: undefined,
    },
  },

  // ──────────────────────────────────────────────────────────
  // Scene 04: 関係者ヒアリング
  // ──────────────────────────────────────────────────────────
  ev_ch1_07: {
    id: "ev_ch1_07",
    sceneId: "ch1_s04_report_and_ren",
    type: "observation",
    title: "直接声かけの予告",
    snippet:
      "みのりは「少し考えてみます」と言って帰った。何かを決めようとしているようだった",
    icon: "eye",
    tags: ["みのり", "行動変化", "決意", "予告"],
    source: {
      speaker: "みのり",
      line: undefined,
    },
  },

  // ──────────────────────────────────────────────────────────
  // Scene 05_5: 隠しコマ（hidden type）
  // ──────────────────────────────────────────────────────────
  ev_ch1_5h_01: {
    id: "ev_ch1_5h_01",
    sceneId: "ch1_s05_5_revelation",
    type: "hidden",
    title: "桐嶋の家庭事情の告白",
    snippet:
      "桐嶋は家庭の事情で長期間しんどい状態だった。みのりへの投稿は八つ当たりではない",
    icon: "key",
    tags: ["桐嶋", "家", "しんどい", "隠す", "真相"],
    source: {
      speaker: "桐嶋",
      line: 71,
    },
  },

  ev_ch1_5h_02: {
    id: "ev_ch1_5h_02",
    sceneId: "ch1_s05_5_revelation",
    type: "hidden",
    title: "「ごめんなさい」という謝罪",
    snippet:
      "桐嶋は自分の投稿がみのりを傷つけたことに罪悪感を感じていた",
    icon: "key",
    tags: ["桐嶋", "謝罪", "罪悪感", "みのり", "後悔"],
    source: {
      speaker: "桐嶋",
      line: 76,
    },
  },
};

// ── 全証拠IDのリスト（順序付き）─────────────────────────────────
export const CH1_EVIDENCE_IDS = Object.keys(CH1_EVIDENCES);

// ── 証拠総数 ─────────────────────────────────────────────────────
// 10件: ev_ch1_01〜07, ev_ch1_04a, ev_ch1_5h_01, ev_ch1_5h_02
export const CH1_EVIDENCE_COUNT = CH1_EVIDENCE_IDS.length;
