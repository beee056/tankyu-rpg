# Audio Assets / Licenses

> v2.5 audio bundle for tankyu-rpg.  
> 現状はプレースホルダー（無音BGM＋簡易SE）を配置しています。本番では下記の推奨フリー素材へ手動で差し替えてください。

---

## 現在配置されているファイル（プレースホルダー）

| ファイル | 内容 | 出典 |
|---------|------|------|
| `bgm_main.mp3` | 無音 180秒（ループ用ダミー） | ffmpeg `anullsrc` で生成 |
| `se_evidence.mp3` | 1320Hz サイン波 0.18秒 | ffmpeg で生成 |
| `se_click.mp3` | 880Hz サイン波 0.05秒 | ffmpeg で生成 |

これらは **演出が破綻しないための一時ファイル**です。実機デモ前に必ず差し替えてください。

---

## 推奨差し替え素材（商用利用可・要クレジット表記）

### BGM（章メイン用 / `bgm_main.mp3`）

**第一候補: 甘茶の音楽工房**  
落ち着いた探偵もの・ピアノ／アコギ系で雰囲気が合うもの。

- 「夜とコーヒー」 — https://amachamusic.chagasi.com/music_yorutocoffee.html
- 「日溜まりの猫」 — https://amachamusic.chagasi.com/music_hidamarinoneko.html
- 「思い出のカフェテラス」 — https://amachamusic.chagasi.com/music_omoidenocafeterrace.html

**ライセンス（甘茶の音楽工房・抜粋）**:
- 個人・商用問わず無料利用可
- クレジット表記は任意（推奨：「Music: 甘茶の音楽工房」）
- 利用規約: https://amachamusic.chagasi.com/license.html

**第二候補: DOVA-SYNDROME**  
- ジャンル「ジャズ／ブルース」「フォーク」あたりから探偵もの想定で選ぶ
- 利用規約: https://dova-s.jp/_contents/license/
- クレジット表記は曲ごとに異なるので個別に確認すること

---

### 証拠取得 SE（`se_evidence.mp3`）

**推奨: 効果音ラボ**  
- 「決定、ボタン押下40」 — https://soundeffect-lab.info/sound/button/
- 「キラキラ1」 — https://soundeffect-lab.info/sound/anime/

**ライセンス（効果音ラボ・抜粋）**:
- 個人・商用問わず無料利用可
- クレジット表記は不要（推奨）
- 利用規約: https://soundeffect-lab.info/agreement/

---

### UIクリック SE（`se_click.mp3`）

**推奨: 効果音ラボ**  
- 「カーソル移動2」 / 「決定、ボタン押下20」 — https://soundeffect-lab.info/sound/button/

ライセンスは上記と同じ。

---

## 差し替え手順

1. 上記URLから各 mp3 をダウンロード
2. ファイル名を以下にリネームして上書き
   - 章BGM → `bgm_main.mp3`
   - 証拠SE → `se_evidence.mp3`
   - UIクリック → `se_click.mp3`
3. このファイル末尾の **「実際に使用した素材」** セクションに、選んだ曲名・作者・URLを追記
4. （該当する場合）アプリ内のクレジット表示欄に作者名を反映

---

## 実際に使用した素材（差し替え後に追記）

| ファイル | 曲名／音源 | 作者 | 出典URL | ライセンス | クレジット表記 |
|---------|-----------|------|---------|-----------|---------------|
| bgm_main.mp3 | _未差替（プレースホルダー）_ | — | — | — | — |
| se_evidence.mp3 | _未差替（プレースホルダー）_ | — | — | — | — |
| se_click.mp3 | _未差替（プレースホルダー）_ | — | — | — | — |

---

## 自動ダウンロードについて

v2.5 作業時点では、推奨サイト（甘茶の音楽工房・DOVA・効果音ラボ）はいずれも直リンクが安定して取得できる構成ではなく、**スクリプトでの自動ダウンロードは行いませんでした**。手動DLで差し替えてください。

---

*作成: Verdent AI / 2026-05-19*
