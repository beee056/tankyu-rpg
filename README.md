# tankyu-rpg

探究学習をRPG体験に変えるプロジェクト。

---

## リポジトリ構成

```
tankyu-rpg/
├── app/        # アプリケーションコード
├── design/     # デザインデータ・UI仕様
├── docs/       # ドキュメント
├── prototype/  # プロトタイプ・試作品
└── research/   # 調査・リサーチ資料
```

---

## 開発フロー（ブランチ戦略・PR運用）

### ブランチ構成

| ブランチ名 | 役割 |
|---|---|
| `main` | 本番・安定版。直接pushは禁止 |
| `dev` | 開発統合ブランチ。featureブランチをここにマージする |
| `feature/xxx` | 機能開発用。dev から切って dev に戻す |
| `fix/xxx` | バグ修正用 |

### 基本的な作業の流れ

```bash
# 1. devブランチから作業ブランチを作成
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name

# 2. 作業・コミット
git add .
git commit -m "feat: 機能の説明"

# 3. pushしてPRを作成
git push origin feature/your-feature-name
gh pr create --base dev --title "機能名" --body "変更内容の説明"

# 4. レビュー後、devにマージ
# 5. リリース時にdev → mainへPR作成・マージ
```

### コミットメッセージ規則

```
feat:   新機能
fix:    バグ修正
docs:   ドキュメント変更
style:  コードスタイル（動作に影響なし）
refactor: リファクタリング
chore:  設定・依存関係の変更
```

### PRのルール

- **直接mainへのpushは禁止**（必ずPR経由でマージ）
- PRには変更内容・テスト方法・スクリーンショット（UI変更時）を記載
- セルフレビュー後にPRを出す
- マージ後は作業ブランチを削除する

---

## セットアップ

```bash
git clone https://github.com/beee056/tankyu-rpg.git
cd tankyu-rpg
pnpm install
```

詳細なセットアップ手順は `docs/` を参照してください。

---

## 内省ジャーナル AI機能（灰島遊）のセットアップ

### ANTHROPIC_API_KEY の取得

1. [Anthropic Console](https://console.anthropic.com/) でアカウント作成・APIキー発行

### ローカル開発時の設定（.dev.vars）

```bash
# app/backend ディレクトリで作業
cd app/backend

# テンプレートをコピー
cp .dev.vars.example .dev.vars

# .dev.vars を編集して実キーを記入
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

`wrangler dev` は `.dev.vars` を自動で読み込む。**.dev.vars は絶対にコミットしないこと**。

### 本番環境（Cloudflare Workers）への設定

```bash
cd app/backend
wrangler secret put ANTHROPIC_API_KEY
# プロンプトに従ってキーを貼り付ける
```

---

## ローカル開発の起動コマンド

```bash
# フロントエンド（http://localhost:5173）
pnpm --filter frontend dev

# バックエンド API（http://localhost:8787）
# ※ app/backend/.dev.vars に ANTHROPIC_API_KEY を設定してから実行
pnpm --filter backend dev

# 両方同時起動
pnpm dev:frontend &
pnpm dev:backend
```

### APIキーなしでも起動できる

`ANTHROPIC_API_KEY` が未設定でもバックエンドは起動する。
チャットAPIを呼ぶと以下のようなエラーレスポンスが返る（フロントで表示される）:

```json
{
  "ok": false,
  "error": "ANTHROPIC_API_KEY is not configured. Set it via: wrangler secret put ..."
}
```

---

## ガードレール動作確認

灰島遊AIの3層ガードレールは以下で確認できる:

```bash
# 層3: アプリ層チェック（正規表現）の手動テスト
# バックエンドAPIに断定文を含む応答が返ってきた場合、フォールバックに差し替わる
# ログで確認: [LLM] Invalid response (attempt 1): "..."

# curlでのテスト例 (バックエンド起動後)
curl -X POST http://localhost:8787/api/journals/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"みのりが可哀想だと思った"}'
```
