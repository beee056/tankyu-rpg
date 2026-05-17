# 実装計画書 — 探究RPG「LIGHTHOUSE」MVP第1章
## Implementation Plan v1.0

> **作成日**: 2026-05-18  
> **ステータス**: フェーズ1 STEP 3 成果物（技術スタック確定・開発着手前ゲート）  
> **前提文書**: 01-design-manifesto.md / 02-worldview.md v1.2 / 03-gdd-v0.1.md / phase-0-summary.md / 01-curriculum-guidelines.md  
> **対象**: MVP第1章（依頼A・最大8コマ）のプロトタイプ実装

---

## 1. システム全体像

### 1-1. アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────────┐
│                        フロントエンド（PWA）                        │
│  React 19 + TypeScript  /  Vite  /  Tailwind CSS + shadcn/ui   │
│  ┌───────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │  ゲームシーン  │  │ ジャーナル/問いカード│  │  教員ダッシュボード │ │
│  │（テキスト表示、 │  │（内省入力、進化ログ │  │  （クラス集計、    │ │
│  │  選択肢、立ち絵）│  │  レーダーチャート） │  │   個人ジャーナル） │ │
│  └───────────────┘  └──────────────────┘  └──────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │     Zustand ストア（ゲーム進行状態 / プレイヤーデータ）        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  Service Worker（静的アセットキャッシュ）/ IndexedDB（下書き保存）  │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS REST API
┌─────────────────────────────▼───────────────────────────────────┐
│                       バックエンド（Hono on Cloudflare Workers）    │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │  ゲームAPIルーター    │  │     LLM APIプロキシ               │  │
│  │  /progress, /journal │  │  （ガードレール・レート制限付き）  │  │
│  │  /choice, /status    │  │  → Claude claude-3-5-haiku       │  │
│  └─────────────────────┘  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 認証（Magic Link / Google OAuth）           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Drizzle ORM
┌─────────────────────────────▼───────────────────────────────────┐
│                  データベース（Cloudflare D1 = SQLite on edge）      │
│  Player / GameProgress / JournalEntry / ChoiceLog               │
│  QuestionCard / StatusPoint / TitleAchievement / AccumulatedFlag │
│  Class / TeacherNote                                             │
└──────────────────────────────────────────────────────────────────┘
```

### 1-2. フロントエンド / バックエンド / 外部APIの関係

| コンポーネント | 役割 | 通信 |
|-------------|------|------|
| フロントエンド（PWA） | ゲームUI・インタラクション・状態管理・オートセーブ | HTTPS REST（Cloudflare Workers） |
| バックエンド（Hono） | 認証・データ永続化・LLMプロキシ・教員ダッシュボードAPI | 同上＋外部LLM API |
| Cloudflare D1 | ゲーム進行・ジャーナル・選択ログ・ステータスの永続保存 | Workers内部接続 |
| LLM API（Claude） | AIナビゲーターの「問い返し」生成（1ターン1疑問文） | Workers経由（クライアントAPIキー非公開） |

### 1-3. データの流れ（生徒入力→保存→教員閲覧）

```
[生徒の操作]
  テキスト読み進め / 選択肢タップ / ジャーナル記述 / 問いカード書き込み
        ↓ 即時（デバウンス3秒）
[フロントエンド Zustand]
  オートセーブ → IndexedDB（下書き）
        ↓ オンライン時にfetch
[バックエンド Hono]
  認証確認（JWT） → バリデーション → D1保存
        ↓ ジャーナル送信時のみ
[LLMプロキシ]
  player_id を乱数UUIDに置換 → Claude API呼び出し（system prompt適用）
  → 疑問文1文を返す
        ↓
[生徒画面]
  AIナビゲーターの問い返し表示
        ↓ 教員ログイン後
[教員ダッシュボード]
  クラス集計レーダーチャート / 個人ジャーナル閲覧（コメント追記可）
  指導要録補助ヒント文（自動生成→手動編集）
```

---

## 2. 技術スタック詳細

### 2-1. フロントエンド

#### React + TypeScript 構成：Vite vs. Next.js

**採用：Vite + React + TypeScript（SPA構成）**

| 観点 | Vite（SPA） | Next.js（App Router） |
|------|------------|---------------------|
| ビルド速度 | 非常に高速（esbuild） | やや遅い（Rust製Turbopack移行中） |
| PWA対応 | `vite-plugin-pwa`で簡単 | 設定複雑（App Routerと相性悪い） |
| 学習コスト | 低い（React標準） | 高い（RSC・Server Actions理解が必要） |
| 静的配信 | Cloudflare Pagesで完全対応 | Edgeランタイムが複雑 |
| ゲームUI向き | イベントドリブンなSPAが最適 | SSRの恩恵が薄い |
| 1人開発 | 設定シンプルで回しやすい | オーバーキル |

**根拠**：このゲームはSEO不要・認証後コンテンツ全体で、SSR/ISRの恩恵がほぼない。テキスト表示エンジン・選択肢UI・アニメーションはクライアント状態重視のSPAが最適。Chromebook（ChromeOS）でのPWAインストール体験も、Vite + `vite-plugin-pwa` 構成のほうが安定している。

#### ルーティング
- **React Router v7**（データローダー付き）
- ルート構成：
  ```
  /              → ランディング（ログイン前）
  /login         → 認証
  /play          → ゲームメイン画面
  /play/:chapterId/:sceneId → シーン直接リンク（セーブ復帰用）
  /journal       → ジャーナル閲覧・問いの進化ログ
  /profile       → レーダーチャート・称号一覧
  /teacher       → 教員ダッシュボード（認証要）
  /teacher/class/:classId → クラス詳細
  /teacher/student/:studentId → 個人詳細
  ```

#### 状態管理：Zustand（採用理由）

| ライブラリ | メリット | 採用判断 |
|-----------|---------|---------|
| **Zustand** | 軽量・boilerplate最小・TypeScript親和性高い | **採用** |
| Jotai | atom単位で細かい制御が可能 | ゲームループ全体のグローバル状態には過剰 |
| Redux Toolkit | 大規模向け・学習コスト高い | 1人開発には重すぎる |

**ストア分割**：
- `gameStore`：現在シーン・選択ログ・フラグ管理・プレイカウント
- `playerStore`：プレイヤー情報・ステータスポイント・称号
- `journalStore`：現在入力中のジャーナル・問いカード（下書き管理）
- `uiStore`：モーダル・アニメーション状態（揮発性）

#### スタイリング：Tailwind CSS v4（採用）
- CSS Modulesはコンポーネント数が多いと管理コストが増大
- Emotion/styled-componentsはランタイムコストあり（Chromebook低スペック考慮）
- Tailwind v4はCSS変数ベースでランタイムゼロ・カスタムデザイントークン設定容易

#### UIコンポーネント：shadcn/ui（採用）
- Radix UIプリミティブをベースにTailwindで実装済み
- アクセシビリティ（ARIA）標準対応
- コピー&カスタマイズ形式でフルコントロール可能
- Chromebook・Safariでの互換実績が豊富

#### アニメーション：Framer Motion（限定採用）
- **採用箇所**：問いカードの色変化・レーダーチャートの変形・シーン遷移
- **不使用箇所**：テキスト表示エンジン（独自実装でCSSアニメーション）
- Chromebookの低スペック端末（Celeron搭載機）を考慮し、`motion`の`reducedMotion`設定を必須化

#### PWA設定
- `vite-plugin-pwa` + Workbox
- Service Worker戦略：
  - 静的アセット（JS/CSS/画像）：`CacheFirst`
  - APIリクエスト：`NetworkFirst`（オフライン時はキャッシュ応答）
  - ジャーナル下書き：IndexedDB経由でオフライン保存→オンライン復帰時同期
- `manifest.json`：`display: standalone`・アイコン各種・`start_url: /play`
- Chromebook向けPWAインストールバナー：`beforeinstallprompt`イベント使用

#### ビルド/デプロイ
- **Cloudflare Pages**（静的SPA配信）
- GitHub Actionsで`main`ブランチへのpushで自動デプロイ
- プレビュー環境：PRごとに自動生成（Cloudflare Pagesのプレビュー機能）

---

### 2-2. バックエンド

#### 言語・FW：TypeScript + Hono on Cloudflare Workers（採用）

| 選択肢 | メリット | デメリット | 採用判断 |
|--------|---------|-----------|---------|
| **Hono on Cloudflare Workers** | サーバーレス・コールドスタートなし・D1と同一エッジ・日本リージョン対応 | Workersのランタイム制約あり | **採用** |
| Node.js + Express | 学習コスト低い・エコシステム豊富 | サーバー運用コスト・スケール時の対応 | 候補2 |
| Python + FastAPI | ML/AI処理が得意 | TypeScriptプロジェクトに言語分割が発生 | 不採用 |
| Supabase（BaaS） | バックエンド不要・リアルタイム対応 | 日本リージョン選択に制約・LLMプロキシ実装が別途必要 | 補助利用を検討 |

**根拠**：フロントエンドとTypeScriptで統一でき、Cloudflare D1・R2をWorkers内で直結できるため、1人開発でのオーバーヘッドが最小。LLMプロキシも同じWorkers内で実装でき、APIキーをクライアントに渡さずに済む。コールドスタートが実質ゼロでChromebook環境でのレスポンスが安定する。

**代替（チーム開発・将来規模拡大時）**：Cloudflare Workers → Node.js + Hono on Fly.io or Railway への移行は比較的容易（Honoは両環境対応）。

#### データベース：Cloudflare D1（SQLite on edge）

| 選択肢 | 特性 | 採用判断 |
|--------|------|---------|
| **Cloudflare D1** | エッジSQLite・Workersと同一ネットワーク・無料枠5GB・日本エッジ対応 | **採用** |
| Supabase PostgreSQL | フル機能PostgreSQL・RLS・リアルタイム | BaaS管理コスト・個人情報の保存場所確認が必要 |
| PlanetScale（MySQL） | スケールしやすい・ブランチ機能 | サービス縮小傾向・無料枠廃止実績 |
| Turso（libSQL） | SQLite互換・エッジ対応 | 比較的新しく実績が薄い |
| Firebase Firestore | NoSQL・リアルタイム | ジャーナルの全文検索・集計が複雑 |

**根拠**：GDDのデータモデルは全てリレーショナル設計（FK・JOIN必要）。SQLiteのクエリ能力で十分で、エッジ側で実行できるためレイテンシが最小。小中規模（〜10,000生徒）まで実績あり。

**ORM**：Drizzle ORM（TypeScript型安全・マイグレーション管理・D1完全対応）

#### 認証

**採用：Magic Link（メールOTP） + Google OAuth の2択提供**

| 方式 | 特性 | 採用場面 |
|------|------|---------|
| **Magic Link（メールOTP）** | アカウント作成不要・学校メールで運用可・パスワード管理なし | 生徒の一般ログイン（主力） |
| **Google OAuth（Google Workspace for Education）** | GIGA端末でのSSO・教員・学校管理者向け | 教員ログイン・Google導入校 |
| 独自JWT（ユーザー名+パスワード） | シンプルだがパスワード忘れ対応コスト | 教員のクラスコード管理のみに限定 |

**理由**：GIGA端末はGoogleアカウントで管理されているケースが多いが、学校によってはGoogleに個人情報を渡せない制約がある。Magic Linkはメールアドレス（学校付与のもの）のみでログインでき、GDPRや学校情報セキュリティポリシーへの対応が柔軟。

**実装**：Auth.js v5（旧NextAuth）の Cloudflare Workers adapter 使用、またはシンプルにHonoのJWT middleware + Resend（メール送信）で自前実装。

#### API設計：REST（tRPC見送り）

| 方式 | 判断 |
|------|------|
| **REST（JSON）** | **採用**：シンプル・デバッグしやすい・クライアント非依存 |
| tRPC | TypeScriptの型共有が強力だが、フロント・バックエンド同一リポジトリ前提。将来的に分離が必要になったとき移行コスト大 |
| GraphQL | 柔軟なクエリが強みだが、学習コスト・設定コストが1人開発には重い |

**エンドポイント設計（主要）**：
```
POST   /api/auth/magic-link          # Magic Link送信
POST   /api/auth/verify              # OTP検証・セッション発行
GET    /api/auth/session             # セッション確認

GET    /api/progress                 # 現在の進行状態取得
PUT    /api/progress                 # 進行状態更新（オートセーブ）

POST   /api/choice                   # 選択肢ログ保存
POST   /api/journal                  # ジャーナル保存 + AI問い返しトリガー
PUT    /api/journal/:entry_id        # ジャーナル更新

GET    /api/question-card            # 問いカード一覧（変遷ログ）
POST   /api/question-card            # 問いカード新規作成/書き換え

GET    /api/status                   # ステータスポイント取得
GET    /api/achievements             # 称号一覧

GET    /api/teacher/class/:classId   # クラス集計
GET    /api/teacher/student/:playerId # 個人データ（教員認証必須）
POST   /api/teacher/note             # 教員メモ保存
```

#### LLM API連携（AIナビゲーター）

**採用：Claude claude-3-5-haiku（claude-3-5-haiku-20241022）**

| モデル | コスト（1M token） | レイテンシ | ガードレール適合 | 採用判断 |
|--------|------------------|-----------|----------------|---------|
| **Claude claude-3-5-haiku** | Input $0.80 / Output $4.00 | 低 | 優秀（禁止パターン安定） | **採用** |
| GPT-4o mini | Input $0.15 / Output $0.60 | 低 | やや不安定（長文化傾向） | 候補2 |
| Gemini 2.0 Flash | Input $0.10 / Output $0.40 | 低 | 未検証 | 候補3 |

**根拠**：
- Claudeはシステムプロンプトへの遵守率が高く「1文・疑問文で終わる」という厳格なフォーマット制約が安定する
- GDDのガードレール要件（断定禁止・称賛禁止・正解提示禁止）との相性が最良
- Haikuは低コスト・低レイテンシで大量のジャーナル送信に対応できる

**LLMプロキシの実装仕様**：
```typescript
// ガードレール適用のシステムプロンプト（GDD §5-3・§7-4準拠）
const systemPrompt = `
あなたはゲーム内のAIナビゲーターです。
以下のルールを厳守してください。

## 絶対禁止
- 断定文（「○○ですね」「○○です」で終わる文）
- 称賛・評価（「すごい」「よく考えられています」等）
- 正解の提示・誘導
- 指示・アドバイス（「次は○○してください」）
- 2文以上の応答

## 必守ルール
- 疑問文1文のみで返す
- 30〜80字以内
- プレイヤーの記述の言葉をそのまま使う
- 「あなた自身」に向けた問いにする
`;

// レート制限: 1セッション3回まで・1ユーザー1日20回まで
// max_tokens: 120（安全マージンを考慮）
// temperature: 0.7
```

---

### 2-3. インフラ・運用

#### ホスティング：Cloudflare（フルスタック採用）

| サービス | 用途 | コスト |
|---------|------|--------|
| **Cloudflare Pages** | フロントエンド（PWA）配信・CDN | 無料（帯域無制限） |
| **Cloudflare Workers** | バックエンドAPI・LLMプロキシ | 無料枠10万req/日、超過後$0.30/100万req |
| **Cloudflare D1** | SQLiteデータベース | 無料枠5GB・1日500万read/10万write |
| **Cloudflare R2** | 画像・音声アセット保存 | 無料枠10GB、超過後$0.015/GB |
| **Cloudflare Workers KV** | セッション・レート制限カウンター | 無料枠100万read/1,000write |

**Vercel vs. Cloudflare の選定理由**：
- 学校導入時の信頼性：Cloudflare は文教省・自治体での利用実績があり、セキュリティ証明書の調達が容易
- 日本リージョン：Cloudflare はエッジが国内に複数あり、文科省の「データは国内保存推奨」に対応しやすい
- コスト：MVP規模（〜1,000ユーザー）は実質ゼロに近い。Vercelはサーバーレス関数の無料枠が小さい
- GIGA端末の学校ネットワーク：Cloudflare のIPアドレス範囲は多くの学校フィルタリングで許可済み

#### ドメイン・SSL・CDN
- ドメイン：Cloudflare Registrar（`lighthouse-game.jp`等）
- SSL：Cloudflare 自動管理（Let's Encrypt不要）
- CDN：Cloudflare Pages に組み込み済み

#### ログ・モニタリング
- **Cloudflare Analytics**：リクエスト数・レイテンシ・エラー率
- **Sentry**（Free tier）：フロントエンドのJS例外・パフォーマンス
- **Cloudflare Workers Logpush**：APIエラーログ（D1クエリエラー含む）

#### バックアップ
- **D1の定期エクスポート**：GitHub Actionsで毎日0時にSQLiteダンプをR2に保存（7日分保持）
- **ジャーナルデータは暗号化バックアップ**：AES-256-GCM（Cloudflare KMSまたはアプリ層暗号化）

#### 個人情報の日本リージョン制約
- Cloudflare D1のデータは原則エッジにレプリケーションされるが、**プライマリリージョンを`APAC`**に設定することで日本・東南アジア優先保存が可能
- 生徒のジャーナルデータ（要配慮情報）は`APAC`プライマリ固定を明示的に設定
- 学校・保護者への説明用：「データは国内および近隣リージョン（APAC）のデータセンターに保存されます」の記載をプライバシーポリシーに明記

---

## 3. データモデル設計

### 3-1. テーブル定義（GDD §9 を実装粒度で詳細化）

#### Player テーブル
```sql
CREATE TABLE players (
  player_id     TEXT PRIMARY KEY,              -- UUID v4
  display_name  TEXT,                          -- 任意。本名不要
  grade         TEXT CHECK(grade IN (
                  'chu2','chu3','high1','high2'
                )),
  join_motivation TEXT CHECK(join_motivation IN (
                  'fun','help','self_question','invited'
                )),
  character_type TEXT DEFAULT 'default',       -- 立ち絵パターン
  class_id      TEXT REFERENCES classes(class_id) ON DELETE SET NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_players_class ON players(class_id);
```

#### GameProgress テーブル
```sql
CREATE TABLE game_progress (
  progress_id   TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  current_part  INTEGER DEFAULT 0,             -- 0=プロローグ, 1-4=各部
  current_chapter INTEGER DEFAULT 1,
  current_scene INTEGER DEFAULT 1,             -- コマ番号
  play_count    INTEGER DEFAULT 1,             -- 周回数
  playtime_seconds INTEGER DEFAULT 0,
  empathy_count INTEGER DEFAULT 0,             -- 寄り添い選択累計（累積分岐用）
  deep_dig_count INTEGER DEFAULT 0,            -- 深掘り選択累計
  question_flag_deep_talk BOOLEAN DEFAULT FALSE, -- 御堂の追加セリフフラグ
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, play_count)               -- 周回ごとに1レコード
);
CREATE INDEX idx_progress_player ON game_progress(player_id);
```

#### ChoiceLog テーブル
```sql
CREATE TABLE choice_logs (
  log_id        TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  scene_id      TEXT NOT NULL,                 -- 例: 'ch1_s04'（第1章コマ4）
  choice_key    TEXT CHECK(choice_key IN ('A','B','C','D','free')),
  choice_reason TEXT,                          -- 選択理由の自由記述（nullable）
  play_count    INTEGER DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_choice_player_scene ON choice_logs(player_id, scene_id);
CREATE INDEX idx_choice_scene_key ON choice_logs(scene_id, choice_key); -- 集計用
```

#### JournalEntry テーブル
```sql
CREATE TABLE journal_entries (
  entry_id      TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  scene_id      TEXT NOT NULL,
  prompt_text   TEXT NOT NULL,                 -- AIが返した問い（または知深の問い）
  content       TEXT NOT NULL,                 -- プレイヤーの記述本文
  content_encrypted BLOB,                     -- AES-256-GCM暗号化（将来オプション）
  word_count    INTEGER DEFAULT 0,
  has_self_ref  BOOLEAN DEFAULT FALSE,         -- 「私は/自分が」含む判定
  ai_response   TEXT,                          -- AIが返した問い返し文
  play_count    INTEGER DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_journal_player ON journal_entries(player_id);
CREATE INDEX idx_journal_scene ON journal_entries(scene_id);
-- 教員閲覧ログ（プライバシー証跡）
CREATE TABLE journal_access_logs (
  id            TEXT PRIMARY KEY,
  teacher_id    TEXT NOT NULL,
  player_id     TEXT NOT NULL,
  accessed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### StatusPoint テーブル
```sql
CREATE TABLE status_points (
  status_id       TEXT PRIMARY KEY,
  player_id       TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE UNIQUE,
  question_power  INTEGER DEFAULT 0,           -- 問い力 (0-100)
  explore_power   INTEGER DEFAULT 0,           -- 探索力 (0-100)
  connect_power   INTEGER DEFAULT 0,           -- 繋ぐ力 (0-100)
  express_power   INTEGER DEFAULT 0,           -- 伝える力 (0-100)
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### QuestionCard テーブル
```sql
CREATE TABLE question_cards (
  card_id       TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  scene_id      TEXT NOT NULL,                 -- どのシーンで書いたか
  question_text TEXT NOT NULL,
  version       INTEGER DEFAULT 1,             -- 書き換えのたびにインクリメント
  is_current    BOOLEAN DEFAULT TRUE,          -- 最新版フラグ
  play_count    INTEGER DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK(LENGTH(question_text) >= 10)
);
CREATE INDEX idx_qcard_player ON question_cards(player_id, play_count);
CREATE INDEX idx_qcard_current ON question_cards(player_id, is_current);
```

#### TitleAchievement テーブル
```sql
CREATE TABLE title_achievements (
  achievement_id TEXT PRIMARY KEY,
  player_id      TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  title_key      TEXT NOT NULL,                -- 例: 'QUESTION_SCULPTOR'
  achieved_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, title_key)
);
```

#### AccumulatedFlag テーブル
```sql
CREATE TABLE accumulated_flags (
  flag_id    TEXT PRIMARY KEY,
  player_id  TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  flag_key   TEXT NOT NULL,                    -- 例: 'EMPATHY_COUNT', 'DEEP_DIG_COUNT'
  value      INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, flag_key)
);
```

#### Class / Teacher テーブル
```sql
CREATE TABLE teachers (
  teacher_id   TEXT PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  school_name  TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  class_id     TEXT PRIMARY KEY,
  teacher_id   TEXT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
  class_name   TEXT NOT NULL,
  school_year  INTEGER,                        -- 2026等
  join_code    TEXT UNIQUE,                    -- 生徒がクラスに参加するコード
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teacher_notes (
  note_id      TEXT PRIMARY KEY,
  teacher_id   TEXT NOT NULL,
  player_id    TEXT NOT NULL,
  content      TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_teacher_note ON teacher_notes(teacher_id, player_id);
```

### 3-2. リレーションシップ図

```
teachers ──< classes ──< players
               │              │
               │         ┌───┴──────────────────┐
               │         ▼                      ▼
               │    game_progress          status_points
               │         │
               │    ┌────┴──────────────────────────────┐
               │    ▼         ▼           ▼             ▼
               │  choice_  journal_   question_  title_
               │   logs     entries    cards    achievements
               │                │
               │           accumulated_flags
               │
               └──< teacher_notes（player_idを参照）
```

### 3-3. マイグレーション戦略

**ツール**：Drizzle Kit（`drizzle-kit push:sqlite`）

```
マイグレーションファイル管理：
  drizzle/
    0001_initial_schema.sql   # 全テーブル作成
    0002_add_content_encrypted.sql  # 暗号化カラム追加
    0003_...

開発環境：drizzle-kit push（D1ローカルエミュレーター）
本番環境：Cloudflare Wrangler経由（wrangler d1 migrations apply）
ロールバック：旧スキーマを保持したバックアップからの復元（D1スナップショット）
```

### 3-4. 個人情報の暗号化方針

| データ種別 | 暗号化 | 理由 |
|-----------|--------|------|
| ジャーナル本文（content） | **MVP: なし（HTTPS+アクセス制御で代替）** → **v2: AES-256-GCM** | MVP段階は設定コスト回避。v2でcontent_encryptedカラムを使用 |
| 問いカードテキスト | なし（公開範囲選択で対応） | 自己の問いは比較的センシティビティ低い |
| 選択ログ | なし | 選択肢A/B/C程度のデータは非機密 |
| player_id → AI送信時 | **乱数UUID置換**（必須） | プロセス上の個人識別情報除去 |
| 教員閲覧ログ | なし | 証跡記録が目的 |

**アクセス制御（暗号化の代替として）**：
- Row Level Securityに相当する処理をAPIレイヤーで実装
- 教員はクラスメンバーのデータのみ取得可能（`WHERE player.class_id = teacher.class_id`）
- クロスクラス・クロス学校のデータ閲覧は物理的に不可能な設計

---

## 4. ディレクトリ構成案

### 4-1. モノリポ構成（フロントエンド + バックエンド）

```
lighthouse-game/
├── apps/
│   ├── web/                          # フロントエンド（Vite + React）
│   │   ├── src/
│   │   │   ├── assets/               # 画像・フォント・音声
│   │   │   ├── components/           # 汎用UIコンポーネント
│   │   │   │   ├── ui/               # shadcn/ui派生（Button, Dialog等）
│   │   │   │   ├── game/             # ゲーム固有コンポーネント
│   │   │   │   │   ├── TextEngine/   # テキスト表示エンジン
│   │   │   │   │   ├── ChoicePanel/  # 選択肢UI
│   │   │   │   │   ├── CharacterSprite/ # キャラ立ち絵
│   │   │   │   │   ├── CorkBoard/    # コルクボードUI
│   │   │   │   │   ├── QuestionCard/ # 問いカードUI
│   │   │   │   │   └── RadarChart/   # レーダーチャート
│   │   │   │   └── layout/           # Header, Footer, PageWrapper
│   │   │   ├── features/             # 機能単位のディレクトリ
│   │   │   │   ├── auth/             # 認証フロー
│   │   │   │   ├── game/             # ゲームループ・シーン管理
│   │   │   │   ├── journal/          # ジャーナル・問い進化ログ
│   │   │   │   ├── profile/          # レーダーチャート・称号
│   │   │   │   └── teacher/          # 教員ダッシュボード
│   │   │   ├── hooks/                # カスタムフック
│   │   │   │   ├── useAutoSave.ts
│   │   │   │   ├── useOfflineSync.ts
│   │   │   │   └── useGameEngine.ts
│   │   │   ├── lib/                  # ユーティリティ・API クライアント
│   │   │   │   ├── api.ts            # fetch wrapper
│   │   │   │   ├── indexeddb.ts      # オフライン下書き管理
│   │   │   │   └── statusCalc.ts     # ステータスポイント計算ロジック
│   │   │   ├── scenarios/            # シナリオデータ（JSON/TypeScript）
│   │   │   │   ├── ch1/
│   │   │   │   │   ├── scene_01.ts   # コマ1データ
│   │   │   │   │   ├── scene_02.ts
│   │   │   │   │   └── ...
│   │   │   │   └── types.ts          # シーン型定義
│   │   │   ├── stores/               # Zustandストア
│   │   │   │   ├── gameStore.ts
│   │   │   │   ├── playerStore.ts
│   │   │   │   ├── journalStore.ts
│   │   │   │   └── uiStore.ts
│   │   │   ├── types/                # 共通型定義
│   │   │   │   ├── game.ts
│   │   │   │   ├── player.ts
│   │   │   │   └── api.ts
│   │   │   ├── pages/                # ルートコンポーネント
│   │   │   └── App.tsx
│   │   ├── public/
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   └── api/                          # バックエンド（Hono on Cloudflare Workers）
│       ├── src/
│       │   ├── routes/               # APIルート
│       │   │   ├── auth.ts
│       │   │   ├── progress.ts
│       │   │   ├── journal.ts
│       │   │   ├── choice.ts
│       │   │   ├── questionCard.ts
│       │   │   ├── status.ts
│       │   │   └── teacher.ts
│       │   ├── middleware/
│       │   │   ├── auth.ts           # JWT検証
│       │   │   ├── rateLimit.ts      # AIレート制限（KV使用）
│       │   │   └── privacy.ts        # 教員のアクセスクラス制限
│       │   ├── services/
│       │   │   ├── llm.ts            # Claude API呼び出し＆ガードレール
│       │   │   ├── statusCalc.ts     # ステータス計算（フロントと共有）
│       │   │   └── titleCheck.ts     # 称号獲得判定
│       │   ├── db/
│       │   │   ├── schema.ts         # Drizzle スキーマ定義
│       │   │   └── index.ts          # D1接続
│       │   └── index.ts              # Honoアプリケーション
│       └── wrangler.toml
│
├── packages/
│   └── shared/                       # フロント・バック共有型
│       └── src/
│           ├── types.ts
│           └── constants.ts
│
├── drizzle/                          # マイグレーションファイル
├── .github/workflows/                # CI/CDパイプライン
├── package.json                      # ワークスペース設定（pnpm）
└── pnpm-workspace.yaml
```

### 4-2. 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| Reactコンポーネント | PascalCase | `TextEngine`, `ChoicePanel` |
| カスタムフック | camelCase + `use`プレフィックス | `useAutoSave`, `useGameEngine` |
| Zustandストア | camelCase + `Store`サフィックス | `gameStore`, `playerStore` |
| APIルートファイル | camelCase | `progress.ts`, `journal.ts` |
| 型定義 | PascalCase + `Type`または`Interface` | `GameState`, `JournalEntry` |
| シーンID | `ch{章番号}_s{コマ番号}` | `ch1_s01`, `ch1_s04` |
| 称号キー | SCREAMING_SNAKE_CASE | `QUESTION_SCULPTOR`, `ROOT_DIGGER` |
| フラグキー | SCREAMING_SNAKE_CASE | `EMPATHY_COUNT`, `AKIRA_DEEP_TALK` |
| データベーステーブル | snake_case（複数形） | `journal_entries`, `choice_logs` |
| SQLカラム | snake_case | `player_id`, `word_count` |

---

## 5. 主要画面の実装優先度

| 画面 | 優先度 | 難度 | 説明 |
|------|--------|------|------|
| **認証（Magic Link）** | MVP必須 | M | メールOTP送受信、セッション管理 |
| **キャラクターカスタマイズ** | MVP必須 | S | 名前入力・立ち絵選択・動機4択 |
| **テキスト表示エンジン** | MVP必須 | L | P5スタイルのメッセージウィンドウ、キャラ立ち絵、タップ/スペース進行 |
| **選択肢UI** | MVP必須 | S | 2〜4択、選択理由記述フィールド付き |
| **自由記述ジャーナルUI** | MVP必須 | M | テキストエリア、下書き保存、送信後AIレスポンス表示 |
| **AIナビゲーター対話表示** | MVP必須 | M | API呼び出し、ローディング演出（「御堂が考えている」）、1文疑問表示 |
| **問いカードUI** | MVP必須 | M | 記入・書き換え・色変化アニメーション・変遷履歴 |
| **コルクボードUI** | MVP必須 | L | 情報カードのタップ配置（ドラッグはv2検討）、Chromebook/iPad両対応 |
| **探偵手帳UI** | MVP必須 | S | ページ追加演出、情報カード一覧 |
| **レーダーチャート・称号一覧** | MVP必須 | M | D3.jsまたはRecharts、過去自分との比較表示 |
| **問いの進化ログ** | MVP必須 | S | 問いカードの変遷を時系列表示 |
| **オートセーブ表示** | MVP必須 | S | ヘッダーの「保存済み」アイコン |
| **ダッシュボード（章選択・進捗）** | 後回し可 | S | MVP第1章のみなので不要。フェーズ2で実装 |
| **探偵事務所マップ** | 後回し可 | L | 第2章の「世界を広げる」フェーズで初登場が自然（GDD §10-2） |
| **教員管理画面（最小限）** | MVP必須 | L | クラス集計レーダー・個人ジャーナル閲覧・進捗確認・ルーブリックヒント |
| **2周目差分体験UI** | 後回し可 | M | 1周目プレイヤーが十分集まってから |
| **宿題モード・追加情報収集** | 後回し可 | M | UIは実装するがβ版以降で有効化 |

**難度定義**：S（1〜2人日）/ M（3〜5人日）/ L（5〜10人日以上）

---

## 6. 開発スケジュール（叩き）

### 6-1. フェーズ分割と想定工数

```
Phase 0：環境構築・設計確定（2週間）
  - リポジトリ構成・CI/CD・デプロイ環境構築
  - D1スキーマ作成・マイグレーション検証
  - デザイントークン（Tailwindカスタムカラー）確定
  - シナリオデータ型定義・コマ1〜6のJSONデータ作成（テキスト確定待ち）

Phase 1：データ層（2週間）
  - Drizzle ORM + D1 接続・基本CRUD
  - 認証（Magic Link + Google OAuth）
  - ゲームAPIルーター（progress, choice, journal, question-card）
  - ステータスポイント計算ロジック・称号判定ロジック

Phase 2：ゲームUI層（4週間）
  - テキスト表示エンジン（最重要・最大難度）
  - 選択肢UI・ジャーナルUI・問いカードUI
  - コルクボードUI（情報カード配置）
  - オートセーブ・IndexedDB下書き管理

Phase 3：AI連携・レーダーチャート（2週間）
  - Claudeプロキシ実装・ガードレール検証
  - レート制限（KV使用）
  - レーダーチャート（Recharts）・称号表示
  - 問いの進化ログ表示

Phase 4：教員管理画面（2週間）
  - 教員認証（Google OAuth）
  - クラス集計・個人ジャーナル閲覧
  - ルーブリックヒント文自動生成
  - 教員メモ機能

Phase 5：QA・調整・デプロイ（2週間）
  - 実機テスト（Chromebook・iPad）
  - ネットワーク制約下テスト（学校フィルタリング想定）
  - パフォーマンス最適化（低スペックChromebook対応）
  - プロトタイプ完成・パイロット準備
```

### 6-2. マイルストーン

| マイルストーン | 目標 | 含まれる機能 |
|-------------|------|------------|
| **α版（内部確認）** | Phase 1-2完了後 | 認証・コマ1〜3のテキスト/選択肢・ジャーナル基本動作 |
| **β版（限定プレイテスト）** | Phase 3完了後 | α版 + AIナビゲーター + レーダーチャート + 全6コマ |
| **プロトタイプ完成版** | Phase 4-5完了後 | β版 + 教員ダッシュボード + 全8コマ + 品質保証 |

### 6-3. 並行作業可能な部分

```
並行可能な作業ペア（依存関係なし）:
  A: テキスト表示エンジン実装
  B: D1スキーマ + Drizzle ORM設定
  C: シナリオデータ（JSON）の執筆・入力
  D: デザイントークン・カラーシステム設定

Phase 2中の並行:
  A: コルクボードUI（フロント）
  B: AIプロキシ事前実装（バックエンド）

Phase 3中の並行:
  A: レーダーチャート実装
  B: 教員ダッシュボード認証・スケルトン
```

### 6-4. 1人開発 vs. チーム開発の比較

#### 1人開発パターン（想定：フルタイム相当で週4〜5日稼働）

| フェーズ | 想定期間 | 累計 |
|---------|---------|------|
| Phase 0：環境構築 | 2週間 | 2週間 |
| Phase 1：データ層 | 3週間 | 5週間 |
| Phase 2：ゲームUI | 6週間 | 11週間 |
| Phase 3：AI連携・チャート | 3週間 | 14週間 |
| Phase 4：教員画面 | 3週間 | 17週間 |
| Phase 5：QA・調整 | 3週間 | **20週間（約5ヶ月）** |

**リスク**：テキスト表示エンジン・コルクボードUIで詰まった場合+2〜4週間。最悪6ヶ月。

#### チーム開発パターン（フロント1 + バックエンド1 = 2人体制）

| フェーズ | 想定期間 | 累計 |
|---------|---------|------|
| Phase 0：環境構築 | 1週間 | 1週間 |
| Phase 1 + 2：データ層・UI並行 | 4週間 | 5週間 |
| Phase 3：AI連携・チャート | 2週間 | 7週間 |
| Phase 4：教員画面 | 2週間 | 9週間 |
| Phase 5：QA・調整 | 2週間 | **11週間（約3ヶ月）** |

**現実的な着地点**：外注エンジニア（週2〜3日稼働のフリーランス1名）を追加するだけでPhase 2の並行作業が可能になり、4ヶ月以内が射程内に入る。

---

## 7. 開発環境・運用ルール

### 7-1. Git ブランチ戦略

```
main            ← 本番リリース（自動デプロイ to Cloudflare Pages）
  └── develop   ← 統合テスト・プレビュー確認
       ├── feature/text-engine          # テキスト表示エンジン
       ├── feature/journal-ui           # ジャーナルUI
       ├── feature/cork-board           # コルクボード
       ├── feature/llm-proxy            # AIナビゲーター
       ├── feature/teacher-dashboard    # 教員ダッシュボード
       └── fix/xxxx                     # バグ修正
```

- `main`への直接pushは禁止（PR必須）
- `develop`へのPRはCIパス（Lint + 型チェック + ユニットテスト）を必須条件
- 機能ブランチ命名：`feature/<機能名>` / `fix/<issue番号>-<説明>`

### 7-2. レビュー方針（1人開発）

- セルフレビューを必須化（1日以上間を置いてから自分でレビュー）
- 重要な設計判断はこのドキュメントに変更記録を残す
- AI（Verdent）を実装ペアプログラミングに活用
- チーム開発になった場合：全PRにレビュー1名必須、教員データ閲覧コードは必ずレビュー

### 7-3. テスト方針

| テスト種別 | 対象 | ツール | 優先度 |
|-----------|------|--------|--------|
| **型チェック** | 全TypeScriptファイル | tsc（strict mode） | 最高（CI必須） |
| **Lint** | 全ファイル | ESLint + Prettier | 最高（CI必須） |
| **ユニットテスト** | ステータス計算・称号判定・ガードレールロジック | Vitest | 高 |
| **コンポーネントテスト** | テキストエンジン・選択肢UI・問いカード | Vitest + @testing-library/react | 中 |
| **E2Eテスト** | コマ1〜3の基本フロー | Playwright | 中（β版以降） |
| **手動実機テスト** | Chromebook + iPad + iOS Safari | — | 最高（α版から） |

**「書かない」テスト**：シナリオデータのJSONバリデーション以外のコンテンツテスト、教員ダッシュボードのE2E（パイロット後に判断）

### 7-4. ドキュメンテーション

- **Storybook**：UIコンポーネントの動作確認（TextEngine・ChoicePanel・RadarChart）—Phase 2完了後に導入
- **README.md**：開発環境セットアップ手順・デプロイ手順
- **SCENARIO_SPEC.md**：シナリオデータ（JSON）の形式仕様
- **API仕様**：Honoの型システムとZodスキーマを自動ドキュメント化（Swagger UI）

---

## 8. リスクと対策

### 8-1. 技術的リスク

| リスク | 発生可能性 | 影響度 | 対策 |
|--------|-----------|--------|------|
| **LLM API障害時の体験劣化** | 中 | 高 | ①フォールバックメッセージプール（50パターン事前定義）②AIレスポンスなしでも進行可能な設計（AI応答は補助機能） |
| **Chromebook低スペック端末でのアニメーション遅延** | 高 | 中 | ①`prefers-reduced-motion`対応②Framer Motionの使用箇所を限定③Celeron N4020でのパフォーマンステストを必須化 |
| **コルクボードのドラッグUI問題（iPad）** | 高 | 中 | タップ選択型（選んで「貼り付ける」インタラクション）をデフォルトにし、ドラッグはv2で検討 |
| **学校ネットワークでのAPI遮断** | 中 | 高 | ①Cloudflare IPは許可リスト登録実績が高い②接続確認ツールをオンボーディングに含める③Service Workerでの静的コンテンツキャッシュで最低限の動作を保証 |
| **Claude APIのレイテンシ（1〜3秒）** | 高 | 低 | 「御堂が考えている」演出（アニメーション付きローディング）でカバー。GDDの世界観と整合 |
| **テキスト表示エンジンの実装工数超過** | 中 | 高 | Phase 2開始時に既存OSSの評用を先行検討（ADV.JS・Naninovel等）。自前実装は3週間以内に見切りをつけるルールを設ける |

### 8-2. 開発体制リスク

| リスク | 対策 |
|--------|------|
| **1人開発の認知的疲弊** | 週1回の進捗レビュー（AIとの壁打ちでも可）、タスクの粒度を1〜3人日以内に分割 |
| **シナリオ執筆の遅延** | シナリオ（テキスト・セリフ）と技術実装を並行できるよう、シナリオはJSONファイルで管理。執筆はベーやん・ライター担当、実装は別ラインで可能 |
| **外注エンジニアの品質リスク** | 最初の1週間はペアプログラミング形式で基準共有。型チェック・Lintを自動CI化してマージ前に品質ゲートを設ける |
| **個人情報関連の法的リスク** | MVPパイロット前に弁護士・学校情報セキュリティ専門家によるレビューを1回実施（必須）。確認前はジャーナルデータの外部公開・研究利用不可 |

### 8-3. スケジュール遅延リスクとバッファ戦略

**バッファ方針**：
- 各フェーズに20%バッファを見込む（上記スケジュールには含まれていない）
- テキスト表示エンジンは独立した「先行実装スパイク」を Phase 0 の最後2日間に実施し、難易度を事前確認する
- コルクボードUIはタップ選択型の「最小実装」で先にリリースし、ドラッグ型はユーザーテスト後に判断
- 教員ダッシュボードはβ版で最小機能（ジャーナル閲覧のみ）として先行リリース可能

**スコープ調整ライン（遅延時の切り捨て候補）**：
1. コマ7・8（フィールドワーク・自分の問い宣言）→ β版後に追加
2. 称号組み合わせシステム → フェーズ2
3. 教員ルーブリックヒント文 → プロトタイプ完成後
4. Storybook → テスト工数を先に充てる

---

## 9. コスト試算

### 9-1. 開発期間中の月額インフラコスト（LLM API除く）

| サービス | 月額目安（開発中・100ユーザー以下） |
|---------|--------------------------------|
| Cloudflare Pages | **$0**（無料枠） |
| Cloudflare Workers | **$0**（10万req/日無料枠内） |
| Cloudflare D1 | **$0**（5GB・1日500万read無料枠内） |
| Cloudflare R2 | **$0**（10GB無料枠内） |
| Cloudflare Workers KV | **$0**（100万read無料枠内） |
| Sentry（フロントエンドエラー） | **$0**（Freeプラン） |
| Resend（Magic Linkメール） | **$0**（月3,000通無料） |
| **合計（開発中）** | **$0 〜 $5/月（ドメイン代のみ）** |

### 9-2. 学校導入時の生徒1人あたり月額試算

**前提変数**：
- LLM API：1生徒あたり月20回のジャーナル送信、1回のAPIコール
- Claude claude-3-5-haiku：Input約200token + Output約80token = 約280token/コール
- 20コール × 280token = 5,600token/月/生徒

| 規模 | 生徒数 | LLM API月額（Claude Haiku） | Cloudflare Workers | Cloudflare D1 | 月額合計 | 1生徒/月 |
|------|--------|---------------------------|---------------------|---------------|---------|---------|
| **100名規模** | 100 | $0.045（Input 0.56M×$0.80/M + Output 0.24M×$4.0/M） | $0 | $0 | **約$0.5〜$1** | **0.5〜1円/月** |
| **1,000名規模** | 1,000 | $0.45 | $0（Workers無料枠超えず） | $0.50 | **約$1〜$5** | **約0.1〜0.5円/月** |
| **10,000名規模** | 10,000 | $4.50 | $3（Workers有料分） | $5 | **約$15/月** | **約0.15円/月** |

**追記**：年額換算（LLM込み・10,000名規模）= 約$180/年 = 約27,000円/年。1生徒あたり年額2.7円程度と試算（インフラのみ）。

### 9-3. スケールアップシミュレーション

| 規模 | 想定月間APIコール | 月額LLM | 月額Cloudflare | 月額合計（概算） |
|------|----------------|---------|---------------|----------------|
| 100名 | 2,000 | $0.06 | $0 | **$0.5〜1** |
| 1,000名 | 20,000 | $0.55 | $0〜$3 | **$1〜5** |
| 10,000名 | 200,000 | $5.50 | $5〜$15 | **$15〜25** |
| **100,000名** | 2,000,000 | $55 | $30〜$60 | **$90〜120** |

**コスト爆発リスクと対策**：
- LLM APIは**レート制限（1日20回/生徒・1セッション3回）** で上限を管理
- 異常なアクセスパターン（ボット等）は Workers KV のレート制限で遮断
- 月次コストアラート（$50超で通知）をCloudflare + Anthropicダッシュボードで設定
- 1,000名を超えるパイロット拡大時は月額$50以内で収まる計算（LLMコストが支配的）

---

## 10. 次のアクション

### 10-1. リポジトリ作成・初期コミットまでに決めるべき事項

| 項目 | 状態 | 判断者 | 期限目安 |
|------|------|--------|---------|
| **O-01：LLM選定（Claude確定か検討継続か）** | 本計画書でClaude Haikuを推奨。最終確定が必要 | べーやん + エンジニア | 着手前 |
| **O-02：認証方式（Magic Linkのみ / Google OAuth併用）** | 本計画書で両対応を推奨。優先度はMagic Link | べーやん | 着手前 |
| **O-03：教員ジャーナル閲覧範囲（全文/要約/生徒選択制）** | GDDではC案（生徒が公開範囲選択）が確定事項として挙げられている | べーやん（要法務確認） | Phase 4前 |
| **O-04：キャラクターイラスト方針（MVP：シルエット or 抽象表現）** | フルイラスト目標は別タスク。MVPではシルエット/CSS表現で進める | べーやん | Phase 2前 |
| **O-05：第1章シナリオの最終テキスト確定** | GDDの骨格はある。各コマのセリフ・情報カードテキストの確定が必要 | べーやん + ライター | Phase 2開始前（並行可能） |
| **リポジトリ名・組織名（GitHub）** | 未決定 | べーやん | 初日 |
| **独自ドメイン（`lighthouse-game.jp`等）** | 未取得 | べーやん | Phase 0中 |

### 10-2. 並行で進められるタスク一覧

```
[技術ライン（エンジニア）]
  □ モノリポセットアップ（pnpm workspace + Vite + Hono + Drizzle）
  □ Cloudflare Pages/Workers/D1 の開発環境構築
  □ D1スキーマ作成 + Drizzle マイグレーション
  □ テキスト表示エンジンのスパイク実装（2日間でプロトタイプ確認）
  □ Magic Link認証フロー実装

[コンテンツライン（べーやん + ライター）]
  □ コマ1〜6の全セリフ・選択肢テキスト確定（シナリオJSON形式で）
  □ 情報カード（コマ2）の3種類のテキスト内容確定
  □ 知深の内省ジャーナル質問文（コマ末2問×6コマ）確定
  □ キャラクタービジュアル方針確定（ライターとの連携）

[デザインライン（並行可能）]
  □ カラーシステム・タイポグラフィ確定（Tailwindトークン）
  □ コルクボードUIのモックアップ（低解像度でOK）
  □ 問いカードのビジュアル方針（色変化・フォント）

[法務・セキュリティライン]
  □ プライバシーポリシー草案作成
  □ 弁護士・学校情報セキュリティ専門家への確認依頼
  □ 利用規約草案（特に生徒データの取扱条項）
```

---

## 付録A：推奨スタック一行サマリー

> **Vite + React 19 + TypeScript / Zustand / Tailwind CSS + shadcn/ui / Hono on Cloudflare Workers / Cloudflare D1（Drizzle ORM）/ Magic Link 認証 / Claude Haiku（AIナビゲーター）/ Cloudflare Pages デプロイ**

---

## 付録B：採用見送り技術の記録

| 技術 | 見送り理由 |
|------|-----------|
| Next.js App Router | SSR不要・PWA設定が複雑・1人開発に対してオーバーキル |
| Redux Toolkit | 学習コスト・ボイラープレートが1人開発に不向き |
| Jotai | ゲーム全体のグローバル状態管理にはZustandのほうがシンプル |
| Supabase | 日本リージョン制約・個人情報データの保存場所確認コスト |
| PlanetScale | サービス縮小・無料枠廃止実績 |
| GraphQL | セットアップコストがREST比で高い・1エンジニアチームに不向き |
| tRPC | フロント・バックが常に同一リポジトリ前提の設計に縛られる |
| Python + FastAPI | TypeScript統一を崩す・1人開発コスト増 |
| Firebase（GCP） | 日本リージョン選択が煩雑・Firestoreの集計クエリが弱い |
| AWS（ECS/RDS） | 学校導入向けの設定・運用コストが過大 |
| Unity WebGL | Chromebook低スペック非対応・PWAインストール困難 |
| Electron | クロスプラットフォームPWAがあれば不要 |

---

## 付録C：オープン問題（GDD §11 引き継ぎ）

GDDで定義されたオープン問題のうち、本計画書で対応したもの・しなかったものを整理する。

| No. | 論点 | 本計画書での対応 |
|-----|------|----------------|
| O-01 | LLM選定 | **Claude Haiku を推奨**。最終確定はべーやん判断 |
| O-02 | 認証方式 | **Magic Link + Google OAuth 両対応を推奨**。Magic Link優先 |
| O-03 | 教員ジャーナル閲覧範囲 | **C案（生徒が公開範囲選択）をデータモデルで設計予約**。Phase 4前に法務確認後確定 |
| O-04 | キャラクターイラスト | **MVPはシルエット/CSS表現で進める**。フルイラストは別タスクの戦略に委ねる |
| O-05 | 第1章シナリオ最終確定 | **技術実装と並行可能なコンテンツラインとして分離**。シナリオJSONの形式を本計画書で定義 |

---

*作成: Verdent AI × LIGHTHOUSE探究RPGプロジェクト / 2026-05-18*  
*次回更新: オープン問題O-01〜O-05の決定後（Phase 0着手時）*  
*エンジニア引き継ぎ時の優先参照セクション: §2（技術スタック詳細）→ §3（データモデル）→ §4（ディレクトリ構成）→ §10（次のアクション）*
