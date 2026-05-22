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

  // ──────────────────────────────────────────────────────────
  // Scene 02c: Cルート調査ループ（SNS投稿タップ）
  // ──────────────────────────────────────────────────────────
  ev_ch1_s2_post_school: {
    id: "ev_ch1_s2_post_school",
    sceneId: "ch1_s02c_investigation",
    type: "item",
    title: "「明日も学校がある」",
    snippet:
      "透は学校に行くつもりでいた。学校が「ある」という書き方は、まだそこに居続ける意思があることを示す",
    icon: "file-text",
    tags: ["透", "投稿", "sns_school", "学校"],
    source: { speaker: undefined, line: undefined },
  },

  ev_ch1_s2_post_place: {
    id: "ev_ch1_s2_post_place",
    sceneId: "ch1_s02c_investigation",
    type: "item",
    title: "「誰にも見つからない場所」",
    snippet:
      "物理的な場所ではなく、心理的な逃げ場を探している可能性がある",
    icon: "file-text",
    tags: ["透", "投稿", "sns_place", "逃避"],
    source: { speaker: undefined, line: undefined },
  },

  ev_ch1_s2_post_isolation: {
    id: "ev_ch1_s2_post_isolation",
    sceneId: "ch1_s02c_investigation",
    type: "item",
    title: "「わたし以外には伝わらないけれど」",
    snippet:
      "伝わることを最初から諦めている。しかし投稿した——誰かに読まれることを、微かに望んでいた",
    icon: "file-text",
    tags: ["透", "投稿", "sns_isolation", "孤立"],
    source: { speaker: undefined, line: undefined },
  },

  ev_ch1_s2_post_late: {
    id: "ev_ch1_s2_post_late",
    sceneId: "ch1_s02c_investigation",
    type: "item",
    title: "打ち込み時刻 23:47",
    snippet:
      "23時47分。誰も起きていない時間。眠れない夜に、誰にも届かない言葉を書いた",
    icon: "file-text",
    tags: ["透", "投稿", "sns_late", "深夜"],
    source: { speaker: undefined, line: undefined },
  },

  // ──────────────────────────────────────────────────────────
  // Scene 02: ルートA — 透の家を再訪
  // ──────────────────────────────────────────────────────────
  ev_ch1_s2_home_lie: {
    id: "ev_ch1_s2_home_lie",
    sceneId: "ch1_s02_route_a",
    type: "observation",
    title: "「塾に行ってる」という嘘",
    snippet:
      "夕方5時過ぎに母親が「透は塾」と言った。透の通っていた塾は週に2回、木曜と土曜だ。今日は火曜日",
    icon: "eye",
    tags: ["透", "家", "home_lie", "嘘", "母親"],
    source: { speaker: "透の母", line: undefined },
  },

  ev_ch1_s2_home_sound: {
    id: "ev_ch1_s2_home_sound",
    sceneId: "ch1_s02_route_a",
    type: "observation",
    title: "ドアの向こうの足音",
    snippet:
      "母親が応対している間、玄関の奥で床がきしむ音がした。誰かが動くのを止めたような、不自然な静けさ",
    icon: "eye",
    tags: ["透", "家", "home_sound", "足音", "気配"],
    source: { speaker: undefined, line: undefined },
  },

  ev_ch1_s2_home_car: {
    id: "ev_ch1_s2_home_car",
    sceneId: "ch1_s02_route_a",
    type: "dialogue",
    title: "隣人の証言「夜中の車」",
    snippet:
      "「最近ね、夜中の1時か2時頃に見慣れない車が来るのよ。2、3回は見た」",
    icon: "message-circle",
    tags: ["透", "家", "home_car", "車", "夜中", "隣人"],
    source: { speaker: "隣人の老婦人", line: undefined },
  },

  // ──────────────────────────────────────────────────────────
  // Scene 02: ルートB — 学校で最後の目撃者
  // ──────────────────────────────────────────────────────────
  ev_ch1_s2_school_meeting: {
    id: "ev_ch1_s2_school_meeting",
    sceneId: "ch1_s02_route_b",
    type: "dialogue",
    title: "「放課後に会う約束」",
    snippet:
      "クラスメイト：「あの日、透は誰かと放課後に会う約束をしてたって言ってた。誰かは知らない」",
    icon: "message-circle",
    tags: ["透", "学校", "school_meeting", "約束", "放課後"],
    source: { speaker: "クラスメイト", line: undefined },
  },

  ev_ch1_s2_school_teacher: {
    id: "ev_ch1_s2_school_teacher",
    sceneId: "ch1_s02_route_b",
    type: "observation",
    title: "担任の視線",
    snippet:
      "職員室の前を通ると担任と目が合った。一瞬だけ。すぐに逸らされた。声はかけてこなかった",
    icon: "eye",
    tags: ["透", "学校", "school_teacher", "担任", "視線"],
    source: { speaker: undefined, line: undefined },
  },

  ev_ch1_s2_school_nurse: {
    id: "ev_ch1_s2_school_nurse",
    sceneId: "ch1_s02_route_b",
    type: "dialogue",
    title: "「保健室に呼ばれていた」",
    snippet:
      "部活の先輩：「透、最近よく保健の先生に呼ばれてたよ。本人は何でもないって言ってたけど」",
    icon: "message-circle",
    tags: ["透", "学校", "school_nurse", "保健室", "呼び出し"],
    source: { speaker: "部活の先輩", line: undefined },
  },
};

// ── 全証拠IDのリスト（順序付き）─────────────────────────────────
export const CH1_EVIDENCE_IDS = Object.keys(CH1_EVIDENCES);

// ── 証拠総数 ─────────────────────────────────────────────────────
// 10件: ev_ch1_01〜07, ev_ch1_04a, ev_ch1_5h_01, ev_ch1_5h_02
export const CH1_EVIDENCE_COUNT = CH1_EVIDENCE_IDS.length;
