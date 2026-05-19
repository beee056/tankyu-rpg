// ============================================================
// Player
// ============================================================
export type Grade = "chu2" | "chu3" | "high1" | "high2";
export type JoinMotivation = "fun" | "help" | "self_question" | "invited";
export type CharacterType = "default" | "type_a" | "type_b" | "type_c";

export interface Player {
  player_id: string;
  display_name: string | null;
  grade: Grade;
  join_motivation: JoinMotivation;
  character_type: CharacterType;
  class_id: string | null;
  created_at: string;
}

// ============================================================
// GameProgress
// ============================================================
export interface GameProgress {
  progress_id: string;
  player_id: string;
  current_part: number;
  current_chapter: number;
  current_scene: number;
  play_count: number;
  playtime_seconds: number;
  empathy_count: number;
  deep_dig_count: number;
  question_flag_deep_talk: boolean;
  updated_at: string;
}

// ============================================================
// Choice
// ============================================================
export type ChoiceKey = "A" | "B" | "C" | "D" | "free";

export interface ChoiceLog {
  log_id: string;
  player_id: string;
  scene_id: string;
  choice_key: ChoiceKey;
  choice_reason: string | null;
  play_count: number;
  created_at: string;
}

// ============================================================
// Journal
// ============================================================
export interface JournalEntry {
  entry_id: string;
  player_id: string;
  scene_id: string;
  prompt_text: string;
  content: string;
  word_count: number;
  has_self_ref: boolean;
  ai_response: string | null;
  play_count: number;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Status
// ============================================================
export interface StatusPoint {
  status_id: string;
  player_id: string;
  question_power: number;
  explore_power: number;
  connect_power: number;
  express_power: number;
  updated_at: string;
}

// ============================================================
// QuestionCard
// ============================================================
export interface QuestionCard {
  card_id: string;
  player_id: string;
  scene_id: string;
  question_text: string;
  version: number;
  is_current: boolean;
  play_count: number;
  created_at: string;
}

// ============================================================
// Title / Achievement
// ============================================================
export type TitleKey =
  | "QUESTION_SCULPTOR"
  | "MAP_MAKER"
  | "THREAD_PULLER"
  | "WORD_PICKER"
  | "ROOT_DIGGER"
  | "LIGHTHOUSE_KEEPER"
  | "DEEP_ABYSS_DETECTIVE"
  | "OCEAN_SWIMMER"
  | "ROOT_DIG_TRIPLE"
  | "SECOND_LIGHT"
  | "QUESTION_SPROUT"
  | "QUESTION_ARCHITECT";

export interface TitleAchievement {
  achievement_id: string;
  player_id: string;
  title_key: TitleKey;
  achieved_at: string;
}

// ============================================================
// AccumulatedFlag
// ============================================================
export type FlagKey =
  | "EMPATHY_COUNT"
  | "DEEP_DIG_COUNT"
  | "AKIRA_DEEP_TALK";

export interface AccumulatedFlag {
  flag_id: string;
  player_id: string;
  flag_key: FlagKey | string;
  value: number;
  updated_at: string;
}

// ============================================================
// Class / Teacher
// ============================================================
export interface Teacher {
  teacher_id: string;
  email: string;
  display_name: string;
  school_name: string | null;
  created_at: string;
}

export interface Class {
  class_id: string;
  teacher_id: string;
  class_name: string;
  school_year: number | null;
  join_code: string | null;
  created_at: string;
}

export interface TeacherNote {
  note_id: string;
  teacher_id: string;
  player_id: string;
  content: string;
  created_at: string;
}

// ============================================================
// Scenario / Scene (frontend data model)
// ============================================================
export type SceneType =
  | "narration"
  | "dialogue"
  | "choice"
  | "journal"
  | "question_card"
  | "cork_board"
  | "radar_chart"
  | "title_reveal"
  | "deduction_mini";

export type CharacterId = "akira" | "yu" | "chifuka" | "minori" | "ren";

// ============================================================
// v2: Evidence system
// ============================================================
export type EvidenceType = "dialogue" | "observation" | "item" | "hidden";

export interface Evidence {
  id: string;
  sceneId: string;
  type: EvidenceType;
  title: string;
  snippet: string;
  icon?: string;
  obtainedAt?: number;
  tags: string[];
  source: {
    speaker?: string;
    line?: number;
  };
}

// ============================================================
// v2: Hypothesis system
// ============================================================
export interface Hypothesis {
  id: string;
  requiredEvidence: string[];
  optionalEvidence?: string[];
  title: string;
  description: string;
  leadsTo: string;
  truthScore: number;
  hint?: string;
}

// ============================================================
// v2: Ending system
// ============================================================
export interface EndingDialogue {
  character?: CharacterId | "inner_voice";
  text: string;
}

export interface EndingData {
  id: string;
  title: string;
  dialogues: EndingDialogue[];
  innerVoice: string;
  endingCard: string;
  achievement?: string;
  retryEnabled: boolean;
  hint?: string;
}

// ============================================================
// v2: Highlight (keyword tap to collect evidence)
// ============================================================
export interface HighlightDef {
  word: string;
  evidenceId: string;
  tooltip?: string;
}

export interface SceneMessage {
  character?: CharacterId;
  text: string;
  pose?: string;
  highlights?: HighlightDef[];
}

export interface SceneChoice {
  key: ChoiceKey;
  label: string;
  status_delta?: Partial<Pick<StatusPoint, "question_power" | "explore_power" | "connect_power" | "express_power">>;
  flag_updates?: Array<{ key: FlagKey | string; delta: number }>;
  next_scene?: string;
  evidence_grants?: string[];
  requiredEvidence?: string[];
  hint?: string;
}

export interface SceneData {
  scene_id: string;
  type: SceneType;
  messages?: SceneMessage[];
  choices?: SceneChoice[];
  journal_prompt?: string;
  requires_journal?: boolean;
  requires_question_card?: boolean;
  next_scene?: string;
  auto_evidence?: string[];
}

export interface Chapter {
  chapter_id: string;
  title: string;
  scenes: SceneData[];
}

// ============================================================
// API response helpers
// ============================================================
export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: string;
  code?: number;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
