# イラストテストレポート — 御堂 煌 AI生成テスト v1.0
## 探究RPG「LIGHTHOUSE」キャラクタービジュアル品質評価

> **作成日**: 2026-05-18
> **目的**: AI画像生成（gpt-image-2）によるメインキャラ「御堂 煌（31歳・ベテラン探偵）」の品質検証
> **生成ツール**: verdent-image CLI（gpt-image-2モデル）
> **保存先**: `design/assets/character-test/midou/`

---

## 1. 生成パターン一覧

| # | ファイル名 | シーン | 表情 |
|---|-----------|--------|------|
| 1 | `midou_01_neutral_front.png` | 探偵事務所の前・正面 | 無表情（基本立ち絵） |
| 2 | `midou_02_thinking.png` | 事務所内・調査室 | 俯き・口元に手（思考中） |
| 3 | `midou_03_sharp_gaze.png` | 事務所内・暗め | 鋭い眼差し（問い返し場面） |
| 4 | `midou_04_soft_smile.png` | 事務所内・暖かい照明 | 柔らかい微笑（励ますシーン） |
| 5 | `midou_05_distant_gaze.png` | 事務所・夕暮れの窓辺 | 遠い目（過去を語る場面） |

---

## 2. 各パターン使用プロンプト全文

### パターン1 — 基本立ち絵（無表情・正面）

```
Visual novel style character illustration of a 31-year-old Japanese male detective named Midou Akira. Serious, mature, professional adult man. Standing straight, facing front, neutral expression close to stoic, mouth nearly closed, composed posture. Short black hair with scattered silver-white streaks (about 30%), slightly disheveled but clean. Wearing a worn dark-brown leather jacket over a plain grey shirt, dark chino trousers, scuffed leather shoes. Background: exterior of a detective office on a hillside with a harbour view. Semi-realistic anime art style similar to Persona 4 and Collar x Malice. Refined, no kawaii, no cute elements, no school uniform, no suit-and-smile. Mature aesthetic. Single character, full-body or three-quarter shot. Soft warm light source from the left. Navy blue and amber colour palette. High quality illustration.
```

### パターン2 — 思考中（俯き・口元に手）

```
Visual novel style character illustration of a 31-year-old Japanese male detective named Midou Akira. Serious, mature, professional adult man. Slight downward gaze, chin slightly lowered, right hand raised to rest fingers pensively against his lips or chin, deep in thought. Contemplative and brooding expression. Short black hair with scattered silver-white streaks, slightly disheveled but clean. Wearing a light grey cardigan over a white shirt, dark chino trousers. Background: dimly lit detective office interior with cork board and scattered papers. Semi-realistic anime art style similar to Persona 4 and Collar x Malice. Refined, no kawaii, no cute elements. Mature aesthetic. Single character, three-quarter or upper-body shot. Soft warm lamplight. No educational vibe. High quality illustration.
```

### パターン3 — 鋭い眼差し（目線がプレイヤーに刺さる瞬間）

```
Visual novel style character illustration of a 31-year-old Japanese male detective named Midou Akira. Serious, mature, professional adult man. Sharp piercing gaze directed straight at the viewer, eyes slightly narrowed with intensity, one eyebrow subtly raised, expression like a detective asking a decisive question. Not angry, but penetrating and focused. Short black hair with silver-white streaks, slightly tousled. Wearing a dark navy long coat over a white shirt. Background: dark atmospheric detective office. Semi-realistic anime art style similar to Persona 5 and Daigyakuten Saiban. Refined, no kawaii, no cute elements. Mature dramatic aesthetic. Single character, upper-body or bust shot. High contrast dramatic side lighting. Strong bold composition. High quality illustration.
```

### パターン4 — 柔らかい微笑（稀に見せる温かさ）

```
Visual novel style character illustration of a 31-year-old Japanese male detective named Midou Akira. Serious, mature, professional adult man. A rare soft, gentle smile — the corner of his mouth is slightly lifted, eyes carry warmth and quiet encouragement, as if gently reassuring someone. Not a grinning smile but a subtle heartfelt one. Short black hair with silver-white streaks, slightly disheveled. Wearing a light grey cardigan over a white shirt. Background: warm-lit cozy detective office with bookshelves. Semi-realistic anime art style similar to Persona 4. Refined, no kawaii, no cute elements. Mature warm aesthetic. Single character, upper-body shot. Soft warm amber light. High quality illustration.
```

### パターン5 — 過去を語る（少し遠い目）

```
Visual novel style character illustration of a 31-year-old Japanese male detective named Midou Akira. Serious, mature, professional adult man. Distant, faraway gaze — eyes slightly unfocused, looking into the middle distance or slightly downward, as if haunted by a memory or a past regret. Expression is quiet and melancholic, not dramatic, but carrying an emotional weight. Short black hair with silver-white streaks, slightly disheveled. Wearing a dark navy coat, white shirt underneath. Background: dimly lit office window at dusk with a harbour view, soft blue-grey twilight. Semi-realistic anime art style similar to Persona 4 and Collar x Malice. Refined, no kawaii, no cute elements. Mature melancholic aesthetic. Single character, upper-body or three-quarter shot. Cool dim evening light. High quality illustration.
```

---

## 3. 各パターン品質評価（5段階: 1=最低 / 5=最高）

> 評価基準: **キャラ一致**（設定との一致）/ **雰囲気**（探偵ゲームとして機能するか）/ **プロ感**（線/陰影/構図の完成度）/ **教育臭NG度**（「萌え化・教育的スマイル」の排除）/ **総合**

### パターン1: 基本立ち絵（無表情・正面）

| 評価軸 | 点数 | コメント |
|--------|------|---------|
| キャラ一致 | 4/5 | 31歳男性・短髪・グレー系服装・探偵らしい佇まいはよく出ている。革ジャンはやや明るめだが方向性は合っている |
| 雰囲気 | 4/5 | ペルソナ系VNの空気感に近い。港町の背景との馴染みも良好 |
| プロ感 | 3/5 | 線や陰影は安定しているが、手・細部の処理にAI特有の甘さが残る。商業VN水準にはもう一歩 |
| 教育臭NG度 | 5/5 | スーツでニコニコ感は皆無。真剣な表情と落ち着いた佇まいが確保されている |
| **総合** | **4/5** | 基本立ち絵として機能する品質。プロンプト改善でさらに向上できる余地あり |

### パターン2: 思考中（俯き・口元に手）

| 評価軸 | 点数 | コメント |
|--------|------|---------|
| キャラ一致 | 4/5 | 口元に手・俯き気味の姿勢はよく出ている。カーディガン＋白シャツの指示も反映されている |
| 雰囲気 | 5/5 | 5枚の中で最も「探偵らしい思考の瞬間」が出ている。VNの重要シーン差分として機能する |
| プロ感 | 3/5 | 手の細部に若干のアーティファクト。全体の構図は優れている |
| 教育臭NG度 | 5/5 | 思考中の沈黙感が確保されており、教育的な「明るく前向き」感は一切ない |
| **総合** | **4.5/5** | **5枚の中の最高評価。プレイヤーが「この人は何かを考えている」と感じる絵として機能する** |

### パターン3: 鋭い眼差し（目線がプレイヤーに刺さる瞬間）

| 評価軸 | 点数 | コメント |
|--------|------|---------|
| キャラ一致 | 3/5 | 鋭い目線は出ているが、ダークネイビーのコートの表現がやや弱い。設定の雰囲気からやや外れている部分あり |
| 雰囲気 | 4/5 | 「問い返し」の瞬間として使える緊張感がある。P5的な演出力が出ている |
| プロ感 | 4/5 | 高コントラスト照明の扱いが良く、ドラマ性が表現されている。構図の完成度は高い |
| 教育臭NG度 | 5/5 | 完全に「探偵に詰められる感覚」が出ており、教育臭ゼロ |
| **総合** | **4/5** | 重要なシーンの差分として機能する。一貫性の観点では顔の印象がP1/P2から若干変化している点が課題 |

### パターン4: 柔らかい微笑（稀に見せる温かさ）

| 評価軸 | 点数 | コメント |
|--------|------|---------|
| キャラ一致 | 3/5 | 微笑の「口角が3mm上がる程度」という設定はやや弱まり、笑顔がやや大きく出ている。「稀に見せる」感の表現が難しい |
| 雰囲気 | 4/5 | 暖かい照明とカーディガンの組み合わせで「ルブランの惣治郎」的な職人感が出ている |
| プロ感 | 3/5 | 柔らかい表情の陰影処理にやや甘さ。笑顔キャラに近づくほど「量産キャラ感」が出やすいAIの傾向が出た |
| 教育臭NG度 | 3/5 | **微笑が若干「教育的な先生の笑顔」に近い印象。これが唯一の教育臭警戒評価。再生成候補** |
| **総合** | **3.25/5** | **5枚の中で最も改善が必要なパターン。「稀な温かさ」ではなく「一般的な笑顔」になってしまっている** |

### パターン5: 過去を語る（少し遠い目）

| 評価軸 | 点数 | コメント |
|--------|------|---------|
| キャラ一致 | 4/5 | 遠い目・夕暮れ窓辺の設定がよく反映されている。コートと白シャツも設定に近い |
| 雰囲気 | 5/5 | 「過去の傷を匂わせる」シーンとして機能する叙情性がある。港・夕暮れの背景との親和性が高い |
| プロ感 | 4/5 | 夕暮れ照明の処理が美しい。ブルーグレーの色調が成功している |
| 教育臭NG度 | 5/5 | 憂いのある表情と色調が教育臭を完全に排除している |
| **総合** | **4.5/5** | **パターン2と並ぶ高評価。「過去のある大人の探偵」という複雑さが視覚的に表現できている** |

---

## 4. 一貫性の評価（5枚通して同一人物か）

### 評価: 3.5/5 — 「同一人物感はあるが、差分として使うにはスタイルガイドの確立が必要」

#### 一致している要素
- 黒髪（白髪交じり）のショートスタイルは5枚を通じて安定している
- 31歳の「若すぎず老けすぎない」年齢感は概ね統一されている
- 服装の方向性（カーディガン/コート系、スマートカジュアル）は各シーンに沿っている
- 教育臭排除・真剣な佇まいは5枚全てで達成されている

#### ブレが生じている要素
- **顔の輪郭・フェイスシェイプ**: パターン1・2と3・5で若干異なる。同一人物の「違う表情」には見えるが、厳密な一貫性はない
- **白髪の比率**: パターンによって10〜40%程度の幅がある
- **パターン4（微笑）**: 表情の大きさが他4枚と比較して外れており、「同じキャラが笑った」より「別の絵柄」に近い

#### 結論
> 5枚を横並びに並べると「この人物は同じ探偵である」という認識は可能だが、「完全に同一キャラクターの差分立ち絵」としてゲームに実装するには一貫性が不十分。**マスター参照画像の確立とi2i（image-to-image）またはLoRAによる固定が次のステップとして必要。**

---

## 5. AI生成路線の判断

### 結論: **「条件付きで継続可能 — ただし投資コストの認識が必要」**

#### AI路線でいけそうな理由
1. **雰囲気・方向性の確認ツールとしては完全に機能した** — 「御堂 煌がどんな絵柄になるか」の方向感を低コスト・短時間（約10分・5枚）で掴むことができた
2. **教育臭排除は達成できる** — 適切なネガティブキーワードとスタイル指定で「スーツでニコニコ教育キャラ」を回避できることが実証された
3. **P4/Collar×Malice系の雰囲気は出せる** — セミリアルアニメスタイルとVN参照でペルソナ系の空気感を近似できる

#### プロ外注に切り替えるべき理由
1. **ゲーム実装レベルの一貫性はAI単体では不可能** — 5枚の顔が微妙に異なる。プレイヤーが毎回見るキャラクター立ち絵として使うには一貫性が致命的に低い
2. **手・細部のアーティファクトが残る** — レタッチなしでの直接実装は難しい
3. **「稀な微笑（パターン4）」のような微妙な表情表現はAIが苦手** — 「笑顔すぎず、無表情すぎず」の繊細なコントロールが現状ツールでは困難

#### 推奨判断
- **現フェーズ（ビジュアル方向性確認・スタイルガイド作成）**: AI生成継続でOK
- **MVP第1章実装用の立ち絵**: プロ外注（または高品質LoRA確立後のAI＋レタッチ）を推奨
- **今回のテストをプロ絵師への依頼書として活用可能**: 「このパターン2・5の雰囲気を維持しつつ、一貫した顔で全差分を作ってほしい」という具体的な参照画像として使える

---

## 6. 改善余地の分析

### プロンプト改善で解決できるもの

| 課題 | 改善アプローチ |
|------|---------------|
| パターン4の「笑顔が大きすぎる」 | プロンプトに `subtle, barely perceptible smile, 3mm lip raise, mouth barely open, suppressed warmth` を追加 |
| 白髪の比率ブレ | `exactly 20-25% silver-white hair streaks, not fully gray, predominantly black` と数値指定を詳細化 |
| 顔の一貫性 | `same face as reference` + i2i で1枚の顔を固定してから差分生成 |
| 手のアーティファクト | `hands hidden or in pocket, avoid showing hands` で回避 or レタッチ |

### モデルの限界（プロンプトでは解決困難）

| 限界 | 内容 |
|------|------|
| 完全な顔一貫性 | LoRAなしのgpt-image-2では1枚ずつ顔が微妙に変化する。これは構造的限界 |
| 「稀に見せる温かさ」の微表情 | 「控えめな微笑」vs「普通の笑顔」の区別が難しい。言語でのコントロールに限界がある |
| VN立ち絵形式の保証 | 背景透過・全身立ち絵・一定のポーズ固定はLoRA+ControlNetなしでは安定しない |

---

## 7. 次のアクション提案

### 選択肢A: AI生成路線でその他キャラも試作（推奨・現フェーズ）

**実施内容**: 灰島 遊（25歳）、時坂 知深（28歳）、明智 連（17歳）も同様にAIテスト生成
**目的**: 全5キャラの方向性確認＋絵師への依頼書として使う参照画像セットを完成させる
**コスト**: 低（ツール費のみ・工数2〜3時間）
**推奨度**: ★★★★★ — プロ外注前の必須ステップ

### 選択肢B: 御堂 煌のパターン4を再生成

**実施内容**: 微笑表現のプロンプトを改善して再生成（`subtle`, `barely perceptible` 等を追加）
**目的**: 5枚セットの完成度を高める
**コスト**: 非常に低
**推奨度**: ★★★★☆ — すぐ実施可能

### 選択肢C: プロ絵師へ依頼書作成・絵師探しを開始

**実施内容**: 今回のAIテスト画像を参照として、SKIMA/PixivFANBOX でVN絵師を探し始める
**目的**: MVP第1章の本番用立ち絵制作
**コスト**: 20〜35万円（メインキャラ4名・差分3種込み）
**推奨度**: ★★★★★ — ビジュアル方向性が今回で確認できたため、今がベストタイミング

### 選択肢D: LoRA学習環境の構築（中長期）

**実施内容**: 今回生成した5枚＋追加生成でLoRAを学習し、一貫性確保したAI立ち絵を量産できる環境を作る
**目的**: 依頼人キャラ（全50時間版の30〜50枚）をAI生成でコスト削減
**コスト**: 高（学習環境構築工数・専門知識必要）
**推奨度**: ★★★☆☆ — 全体版フェーズで検討。MVP段階では不要

---

## 8. 最終評価サマリー

| 項目 | 評価 |
|------|------|
| **最も成功したパターン** | **パターン2（思考中）・パターン5（遠い目）** — 雰囲気4.5/5。「31歳ベテラン探偵が中高生にかっこいいと感じられる」条件を最もよく満たしている |
| **最も改善が必要なパターン** | **パターン4（微笑）** — 教育臭警戒評価3/5。「稀な温かさ」の微妙さが出ず、若干の教育的笑顔感が残った |
| **AI路線の結論** | **方向性確認・依頼書作成ツールとしてはAI有効。ゲーム実装用立ち絵はプロ外注推奨** |
| **一貫性の評価** | 3.5/5 — 同一人物感はあるが差分実装には不十分。LoRAまたはプロ外注が必要 |
| **マニフェスト遵守** | 教育臭排除は達成（パターン4のみ要再生成）。萌え化・子供向け感は全5枚で完全回避 |

---

> **次回更新**: パターン4再生成後、または他キャラ（灰島遊・時坂知深・明智連）のAIテスト完了後
> **作成**: Verdent AI × LIGHTHOUSE探究RPGプロジェクト / 2026-05-18
