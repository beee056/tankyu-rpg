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
```

詳細なセットアップ手順は `docs/` を参照してください。
