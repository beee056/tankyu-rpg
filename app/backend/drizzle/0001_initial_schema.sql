-- Migration 0001: Initial schema for LIGHTHOUSE探究RPG
-- Based on GDD §9 / implementation-plan §3

-- ── Teachers ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teachers (
  teacher_id   TEXT PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  school_name  TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Classes ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS classes (
  class_id     TEXT PRIMARY KEY,
  teacher_id   TEXT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
  class_name   TEXT NOT NULL,
  school_year  INTEGER,
  join_code    TEXT UNIQUE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Players ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS players (
  player_id     TEXT PRIMARY KEY,
  display_name  TEXT,
  grade         TEXT CHECK(grade IN ('chu2','chu3','high1','high2')),
  join_motivation TEXT CHECK(join_motivation IN ('fun','help','self_question','invited')),
  character_type TEXT DEFAULT 'default',
  class_id      TEXT REFERENCES classes(class_id) ON DELETE SET NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_players_class ON players(class_id);

-- ── Auth tokens (Magic Link OTP) ──────────────────────────────
-- Note: short-lived OTPs are stored in KV, not D1.
-- This table stores permanent session records.
CREATE TABLE IF NOT EXISTS auth_sessions (
  session_id   TEXT PRIMARY KEY,
  player_id    TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  email        TEXT NOT NULL,
  expires_at   TIMESTAMP NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_sessions_player ON auth_sessions(player_id);
CREATE INDEX IF NOT EXISTS idx_sessions_email ON auth_sessions(email);

-- ── Game Progress ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS game_progress (
  progress_id   TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  current_part  INTEGER DEFAULT 0,
  current_chapter INTEGER DEFAULT 1,
  current_scene INTEGER DEFAULT 1,
  play_count    INTEGER DEFAULT 1,
  playtime_seconds INTEGER DEFAULT 0,
  empathy_count INTEGER DEFAULT 0,
  deep_dig_count INTEGER DEFAULT 0,
  question_flag_deep_talk INTEGER DEFAULT 0,  -- boolean as int (SQLite)
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, play_count)
);
CREATE INDEX IF NOT EXISTS idx_progress_player ON game_progress(player_id);

-- ── Choice Logs ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS choice_logs (
  log_id        TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  scene_id      TEXT NOT NULL,
  choice_key    TEXT CHECK(choice_key IN ('A','B','C','D','free')),
  choice_reason TEXT,
  play_count    INTEGER DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_choice_player_scene ON choice_logs(player_id, scene_id);
CREATE INDEX IF NOT EXISTS idx_choice_scene_key ON choice_logs(scene_id, choice_key);

-- ── Journal Entries ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journal_entries (
  entry_id      TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  scene_id      TEXT NOT NULL,
  prompt_text   TEXT NOT NULL,
  content       TEXT NOT NULL,
  content_encrypted BLOB,
  word_count    INTEGER DEFAULT 0,
  has_self_ref  INTEGER DEFAULT 0,  -- boolean as int
  ai_response   TEXT,
  play_count    INTEGER DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_journal_player ON journal_entries(player_id);
CREATE INDEX IF NOT EXISTS idx_journal_scene ON journal_entries(scene_id);

-- Teacher access log (privacy audit trail)
CREATE TABLE IF NOT EXISTS journal_access_logs (
  id            TEXT PRIMARY KEY,
  teacher_id    TEXT NOT NULL,
  player_id     TEXT NOT NULL,
  accessed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Status Points ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS status_points (
  status_id       TEXT PRIMARY KEY,
  player_id       TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE UNIQUE,
  question_power  INTEGER DEFAULT 0,
  explore_power   INTEGER DEFAULT 0,
  connect_power   INTEGER DEFAULT 0,
  express_power   INTEGER DEFAULT 0,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Question Cards ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS question_cards (
  card_id       TEXT PRIMARY KEY,
  player_id     TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  scene_id      TEXT NOT NULL,
  question_text TEXT NOT NULL,
  version       INTEGER DEFAULT 1,
  is_current    INTEGER DEFAULT 1,  -- boolean as int
  play_count    INTEGER DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK(LENGTH(question_text) >= 10)
);
CREATE INDEX IF NOT EXISTS idx_qcard_player ON question_cards(player_id, play_count);
CREATE INDEX IF NOT EXISTS idx_qcard_current ON question_cards(player_id, is_current);

-- ── Title Achievements ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS title_achievements (
  achievement_id TEXT PRIMARY KEY,
  player_id      TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  title_key      TEXT NOT NULL,
  achieved_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, title_key)
);

-- ── Accumulated Flags ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS accumulated_flags (
  flag_id    TEXT PRIMARY KEY,
  player_id  TEXT NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  flag_key   TEXT NOT NULL,
  value      INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(player_id, flag_key)
);

-- ── Teacher Notes ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS teacher_notes (
  note_id      TEXT PRIMARY KEY,
  teacher_id   TEXT NOT NULL,
  player_id    TEXT NOT NULL,
  content      TEXT NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_teacher_note ON teacher_notes(teacher_id, player_id);
