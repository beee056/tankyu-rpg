-- Local dev seed: anonymous player required for journal_entries FK
-- Run: npx wrangler d1 execute lighthouse-db --local --file=drizzle/seed_local.sql
INSERT OR IGNORE INTO players (player_id, display_name) VALUES ('anonymous', 'Anonymous');
