import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useJournalStore } from "@/stores/journalStore";
import { useEvidenceStore } from "@/stores/evidenceStore";
import { api } from "@/lib/api";
import { CHAPTER1_SCENE_MAP as SCENE_MAP, CHAPTER1_START_SCENE } from "@/scenarios/ch1";
import type { SceneData, SceneMessage, CharacterId } from "shared-types";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import EvidenceBoardModal from "@/components/EvidenceBoardModal";
import { renderWithHighlights } from "@/components/HighlightSpan";

// ── キャラクター表示名 ──────────────────────────────────────────────────────
const CHAR_NAMES: Record<CharacterId, string> = {
  akira: "御堂 煌",
  yu: "灰島 遊",
  chifuka: "時坂 知深",
  minori: "みのり",
  ren: "明智 連",
};

// ── キャラクター名ラベル色（yoake tokens）──────────────────────────────────
const CHAR_COLORS: Record<CharacterId, string> = {
  akira:   "text-yoake-warm",
  yu:      "text-sky-400",
  chifuka: "text-yoake-bg",
  minori:  "text-rose-300",
  ren:     "text-emerald-400",
};

// ── 文字送り速度: 30文字/秒 ───────────────────────────────────────────────
const CHARS_PER_SEC = 30;

// ─────────────────────────────────────────────────────────────────────────────
// TypewriterText
// ─────────────────────────────────────────────────────────────────────────────
function TypewriterText({
  text,
  highlights,
  onComplete,
}: {
  text: string;
  highlights?: SceneMessage["highlights"];
  onComplete: () => void;
}) {
  const [displayed, setDisplayed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed(0);
    const interval = Math.floor(1000 / CHARS_PER_SEC);
    timerRef.current = setInterval(() => {
      setDisplayed((prev) => {
        if (prev >= text.length) {
          clearInterval(timerRef.current!);
          onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const showAll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayed(text.length);
    onComplete();
  }, [text, onComplete]);

  const nodes = renderWithHighlights(text, highlights, displayed);

  return (
    <span
      className="whitespace-pre-wrap"
      onClick={showAll}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && showAll()}
    >
      {nodes}
      {displayed < text.length && (
        <span className="opacity-0">.</span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EvidenceToast — brief animation when evidence is collected
// ─────────────────────────────────────────────────────────────────────────────
function EvidenceToast({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="fixed top-16 left-1/2 z-50 flex flex-col items-center pointer-events-none"
      style={{ transform: "translateX(-50%)" }}
    >
      <div
        className="px-4 py-2 text-xs font-ui tracking-widest text-center"
        style={{
          background: "#EDE3CF",
          border: "1px solid #C9805E",
          color: "#C9805E",
          borderRadius: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <span className="block font-serif text-yoake-text-muted text-xs mb-0.5">証拠を記録した!</span>
        「{title}」
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CharacterPortrait
// ─────────────────────────────────────────────────────────────────────────────
function CharacterPortrait({ charId }: { charId: CharacterId | undefined }) {
  if (!charId) return null;

  const imageSrc: string | null = (() => {
    switch (charId) {
      case "akira": return "/assets/characters/midou/midou_02_thinking.png";
      case "yu":    return "/assets/characters/yu/yu_01_neutral.png";
      case "chifuka": return "/assets/characters/chifuka/chifuka_01_neutral.png";
      case "minori":  return "/assets/characters/minori/minori_01_neutral.png";
      case "ren":     return "/assets/characters/ren/ren_01_neutral.png";
      default:        return null;
    }
  })();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={charId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 w-20 sm:w-28 md:w-36 self-end"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={CHAR_NAMES[charId]}
            className="w-full object-contain max-h-36 sm:max-h-44 md:max-h-52 opacity-90"
            style={{ filter: "sepia(0.15)" }}
          />
        ) : (
          <div
            className="w-full aspect-[2/3] bg-yoake-dialog-bg flex items-end justify-center pb-3"
            style={{ border: "1px solid #C9B99A" }}
          >
            <span className="text-yoake-text-muted text-xs text-center px-1 font-serif">
              {CHAR_NAMES[charId]}
            </span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PlayPage
// ─────────────────────────────────────────────────────────────────────────────
export default function PlayPage() {
  const { chapterId, sceneId } = useParams<{
    chapterId: string;
    sceneId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateStatus } = usePlayerStore();
  const { saveScene, currentSceneKey, addCollectedEvidenceId } = useGameStore();
  const { addEntry: addJournalEntry } = useJournalStore();
  const { addEvidence, collectedEvidences } = useEvidenceStore();

  // resume フラグ: ダッシュボードの「前回の続き」から来た場合
  const shouldResume =
    (location.state as { resume?: boolean } | null)?.resume === true;

  const resolvedSceneKey = (() => {
    if (shouldResume && currentSceneKey && SCENE_MAP[currentSceneKey]) {
      return currentSceneKey;
    }
    if (chapterId && sceneId) {
      const k = `ch${chapterId}_s0${sceneId}_narration`;
      return SCENE_MAP[k] ? k : CHAPTER1_START_SCENE;
    }
    return CHAPTER1_START_SCENE;
  })();

  const [sceneKey, setSceneKey] = useState<string>(resolvedSceneKey);
  const scene: SceneData | undefined = SCENE_MAP[sceneKey];

  const [msgIndex, setMsgIndex] = useState(0);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  // v2: evidence board open state
  const [evidenceBoardOpen, setEvidenceBoardOpen] = useState(false);

  // v2: toast for newly collected evidence
  const [toastTitle, setToastTitle] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevEvidenceCountRef = useRef(collectedEvidences.length);

  const currentMsg: SceneMessage | undefined = scene?.messages?.[msgIndex];

  // ── シーンキーをストアに保存（進捗永続化）──────────────────────────────
  useEffect(() => {
    if (sceneKey) {
      saveScene(sceneKey);
    }
  }, [sceneKey, saveScene]);

  // ── v2: auto_evidence — シーン入場時に自動付与 ────────────────────────
  useEffect(() => {
    if (scene?.auto_evidence && scene.auto_evidence.length > 0) {
      for (const id of scene.auto_evidence) {
        addEvidence(id);
        addCollectedEvidenceId(id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey]);

  // ── v2: watch for newly collected evidences → show toast ─────────────
  useEffect(() => {
    const current = collectedEvidences.length;
    if (current > prevEvidenceCountRef.current) {
      const newest = collectedEvidences[current - 1];
      if (newest) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToastTitle(newest.title);
        toastTimerRef.current = setTimeout(() => setToastTitle(null), 2500);
      }
    }
    prevEvidenceCountRef.current = current;
  }, [collectedEvidences]);

  useEffect(() => {
    setTypewriterDone(false);
    setJournalText("");
    setJournalSaved(false);
  }, [sceneKey]);

  useEffect(() => {
    setTypewriterDone(false);
  }, [msgIndex]);

  // choices with no pre-messages: immediately allow showing choices
  useEffect(() => {
    if (
      scene &&
      (scene.type === "choice" || scene.type === "cork_board") &&
      (!scene.messages || scene.messages.length === 0)
    ) {
      setTypewriterDone(true);
    }
  }, [scene]);

  const advanceMessage = useCallback(() => {
    if (!scene) return;

    if (!typewriterDone) {
      setTypewriterDone(true);
      return;
    }

    const msgs = scene.messages ?? [];
    if (msgIndex < msgs.length - 1) {
      setMsgIndex((i) => i + 1);
    } else if (
      scene.type !== "choice" &&
      scene.type !== "journal" &&
      scene.type !== "question_card" &&
      scene.type !== "cork_board"
    ) {
      if (scene.next_scene === "CHAPTER_END") {
        navigate("/dashboard");
      } else if (scene.next_scene && SCENE_MAP[scene.next_scene]) {
        setSceneKey(scene.next_scene);
        setMsgIndex(0);
      }
    }
  }, [scene, msgIndex, typewriterDone, navigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (evidenceBoardOpen) return;
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        advanceMessage();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advanceMessage, evidenceBoardOpen]);

  function handleChoice(choice: NonNullable<SceneData["choices"]>[number]) {
    if (choice.status_delta) {
      updateStatus(choice.status_delta);
    }
    if (choice.flag_updates) {
      for (const fu of choice.flag_updates) {
        if (fu.key.includes("QUESTION")) updateStatus({ question_power: fu.delta });
        else if (fu.key.includes("EXPLORE")) updateStatus({ explore_power: fu.delta });
      }
    }

    // v2: evidence_grants — add evidence when choice is made
    if (choice.evidence_grants && choice.evidence_grants.length > 0) {
      for (const id of choice.evidence_grants) {
        addEvidence(id);
        addCollectedEvidenceId(id);
      }
    }

    api.post("/api/choices", {
      scene_id: scene?.scene_id,
      choice_key: choice.key,
    }).catch(() => {});

    const next = choice.next_scene;
    if (next === "CHAPTER_END") {
      navigate("/dashboard");
    } else if (next && SCENE_MAP[next]) {
      setSceneKey(next);
      setMsgIndex(0);
    }
  }

  async function handleJournalSave() {
    if (!journalText.trim()) return;

    // ローカルstoreに保存（FB3対応: ジャーナル全文・問いの進化ログ表示用）
    addJournalEntry({
      entry_id: `local-${Date.now()}`,
      player_id: "local",
      scene_id: scene?.scene_id ?? "",
      prompt_text: scene?.journal_prompt ?? "",
      content: journalText,
      word_count: journalText.length,
      has_self_ref: false,
      ai_response: null,
      play_count: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // バックエンドへの保存（fire and forget、失敗してもUI継続）
    api.post("/api/journals", {
      scene_id: scene?.scene_id,
      content: journalText,
      prompt_text: scene?.journal_prompt ?? "",
    }).catch(() => {});

    setJournalSaved(true);
  }

  function handleOpenJournalChat() {
    try {
      navigate("/journal", {
        state: {
          initialMessage: journalText,
          sceneId: scene?.scene_id ?? "",
          chapterId: chapterId ?? "1",
          journalPrompt: scene?.journal_prompt ?? "",
          komaLabel,
        },
      });
    } catch (err) {
      console.error("[PlayPage] handleOpenJournalChat:", err);
    }
  }

  function handleContinueFromJournal() {
    if (scene?.next_scene === "CHAPTER_END") {
      navigate("/dashboard");
    } else if (scene?.next_scene && SCENE_MAP[scene.next_scene]) {
      setSceneKey(scene.next_scene!);
      setMsgIndex(0);
    }
    setJournalSaved(false);
    setJournalText("");
  }

  function handleSkipJournal() {
    setJournalSaved(false);
    setJournalText("");
    if (scene?.next_scene === "CHAPTER_END") {
      navigate("/dashboard");
    } else if (scene?.next_scene && SCENE_MAP[scene.next_scene]) {
      setSceneKey(scene.next_scene!);
      setMsgIndex(0);
    }
  }

  if (!scene) {
    return (
      <main className="min-h-screen bg-yoake-bg paper-texture flex items-center justify-center">
        <p className="text-yoake-text-muted font-serif text-sm">
          シーンデータが見つかりません
        </p>
      </main>
    );
  }

  const isNarration = scene.type === "narration";
  const isChoice = scene.type === "choice";
  const isJournal = scene.type === "journal";
  const isQuestionCard = scene.type === "question_card";
  const isCorkBoard = scene.type === "cork_board";
  const isInputScene = isJournal || isQuestionCard;

  // v2: requires_journal defaults to true for backward compat
  const requiresJournal = scene.requires_journal !== false;

  // Dynamic header: derive コマ number from sceneKey
  const komaLabel = (() => {
    if (sceneKey.includes("_s05_5")) return "第1章 · コマ5.5";
    const m = sceneKey.match(/ch1_s0?(\d+)/);
    if (m) return `第1章 · コマ${parseInt(m[1], 10)}`;
    return "第1章";
  })();

  const speakerChar = currentMsg?.character as CharacterId | undefined;
  const speakerName = speakerChar ? CHAR_NAMES[speakerChar] : null;
  const speakerColor = speakerChar ? CHAR_COLORS[speakerChar] : null;

  return (
    <main className="h-screen bg-yoake-bg flex flex-col select-none paper-texture overflow-hidden">
      {/* ── ヘッダー ── */}
      <header
        className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0 z-10 bg-yoake-bg-card"
        style={{ borderBottom: "1px solid #C9B99A" }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="text-yoake-text-muted hover:text-yoake-text-secondary text-xs transition-colors font-serif"
        >
          ← 事務所に戻る
        </button>
        <div className="text-xs text-yoake-text-muted font-serif">{komaLabel}</div>
        <div className="flex items-center gap-2">
          {/* v2: evidence badge */}
          <EvidenceBadge onOpen={() => setEvidenceBoardOpen(true)} />
          <div className="flex items-center gap-1 text-xs text-yoake-accent">
            <span
              className="w-1.5 h-1.5 bg-yoake-accent animate-pulse-soft"
              style={{ borderRadius: 0 }}
            />
            <span className="font-serif hidden sm:inline">保存済み</span>
          </div>
        </div>
      </header>

      {/* ── 証拠取得トースト ── */}
      <AnimatePresence>
        {toastTitle && <EvidenceToast key="evidence-toast" title={toastTitle} />}
      </AnimatePresence>

      {/* ── 背景エリア ── */}
      <div
        className="relative flex-1 flex flex-col overflow-hidden"
        onClick={() =>
          !isChoice && !isInputScene && !isCorkBoard && !evidenceBoardOpen && advanceMessage()
        }
        style={{
          cursor: isChoice || isInputScene || isCorkBoard || evidenceBoardOpen ? "default" : "pointer",
        }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(160deg, #1E1814 0%, #241C14 50%, #2C2218 100%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl"
          style={{ background: "#E8B4A0", borderRadius: "50%" }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 opacity-5 blur-3xl"
          style={{ background: "#C9805E", borderRadius: "50%" }}
        />

        {/* ── キャラクター & セリフエリア ── */}
        <div className="relative z-10 flex flex-col flex-1 max-w-2xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 overflow-y-auto">
          {/* キャラクター立ち絵 */}
          <div className="flex justify-end mb-3 sm:mb-4 min-h-[100px] sm:min-h-[140px] md:min-h-[160px]">
            <CharacterPortrait charId={speakerChar} />
          </div>

          {/* ── セリフボックス ── */}
          <AnimatePresence mode="wait">
            {(currentMsg ||
              (isChoice &&
                scene.messages &&
                scene.messages.length > 0)) && (
              <motion.div
                key={`${sceneKey}-${msgIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="dialog-dq p-5 mb-4"
              >
                {isNarration && currentMsg && (
                  <p
                    className="text-yoake-bg text-sm leading-loose italic"
                    style={{ fontFamily: "'DotGothic16', monospace", lineHeight: 2 }}
                  >
                    <TypewriterText
                      text={currentMsg.text}
                      highlights={currentMsg.highlights}
                      onComplete={() => setTypewriterDone(true)}
                    />
                  </p>
                )}

                {!isNarration && !isChoice && !isCorkBoard && currentMsg && (
                  <>
                    {speakerName && (
                      <p
                        className={`text-xs mb-2 pb-1 ${
                          speakerColor ?? "text-yoake-text-muted"
                        }`}
                        style={{
                          fontFamily: "'DotGothic16', monospace",
                          borderBottom: "1px solid rgba(201,185,154,0.4)",
                          letterSpacing: "0.12em",
                        }}
                      >
                        {speakerName}
                      </p>
                    )}
                    <p
                      className="text-yoake-bg text-sm leading-relaxed"
                      style={{
                        fontFamily: "'DotGothic16', monospace",
                        lineHeight: 1.9,
                      }}
                    >
                      <TypewriterText
                        text={currentMsg.text}
                        highlights={currentMsg.highlights}
                        onComplete={() => setTypewriterDone(true)}
                      />
                    </p>
                  </>
                )}

                {isChoice &&
                  scene.messages &&
                  scene.messages.length > 0 &&
                  currentMsg &&
                  !isInputScene && (
                    <>
                      {speakerName && (
                        <p
                          className={`text-xs mb-2 pb-1 ${
                            speakerColor ?? "text-yoake-text-muted"
                          }`}
                          style={{
                            fontFamily: "'DotGothic16', monospace",
                            borderBottom: "1px solid rgba(201,185,154,0.4)",
                            letterSpacing: "0.12em",
                          }}
                        >
                          {speakerName}
                        </p>
                      )}
                      <p
                        className="text-yoake-bg text-sm leading-relaxed"
                        style={{
                          fontFamily: "'DotGothic16', monospace",
                          lineHeight: 1.9,
                        }}
                      >
                        <TypewriterText
                          text={currentMsg.text}
                          highlights={currentMsg.highlights}
                          onComplete={() => setTypewriterDone(true)}
                        />
                      </p>
                    </>
                  )}

                {typewriterDone &&
                  !isChoice &&
                  !isInputScene &&
                  !isCorkBoard && (
                    <div className="mt-3 flex justify-end">
                      <span
                        className="text-yoake-warm text-xs animate-pulse-soft"
                        style={{ fontFamily: "'DotGothic16', monospace" }}
                      >
                        <span className="sm:hidden">タップ で次へ ▶</span>
                        <span className="hidden sm:inline">クリック / Enter で次へ ▶</span>
                      </span>
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── 選択肢 ── */}
          {isChoice && typewriterDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 mt-1"
            >
              {scene.choices?.map((choice) => {
                // v2: requiredEvidence check — disable button if evidence is missing
                const missingRequired =
                  choice.requiredEvidence && choice.requiredEvidence.length > 0
                    ? choice.requiredEvidence.some(
                        (id) => !collectedEvidences.some((e) => e.id === id)
                      )
                    : false;

                return (
                  <button
                    key={choice.key}
                    disabled={missingRequired}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!missingRequired) handleChoice(choice);
                    }}
                    className="w-full text-left bg-yoake-dialog-bg text-yoake-bg hover:bg-opacity-80 transition-all text-sm active:scale-95 px-4 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "'DotGothic16', monospace",
                      border: "2px solid #C9B99A",
                      outline: "1px solid #C9B99A",
                      outlineOffset: "-5px",
                      borderRadius: 0,
                      minHeight: "44px",
                    }}
                  >
                    <span
                      className="text-yoake-warm text-xs mr-2"
                      style={{ fontFamily: "'DotGothic16', monospace" }}
                    >
                      {choice.key}.
                    </span>
                    {choice.label}
                    {missingRequired && choice.hint && (
                      <span
                        className="block text-xs mt-1 italic"
                        style={{ color: "#8B9DAE" }}
                      >
                        {choice.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* ── 内省ジャーナル / 問いカード ── */}
          {isInputScene && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yoake-bg-card paper-texture p-5 mt-1"
              style={{ border: "2px solid #C9B99A", borderRadius: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {scene.journal_prompt && (
                <>
                  <p className="text-yoake-text-muted text-xs mb-1 tracking-wide font-ui">
                    {isQuestionCard ? "問いカード" : "内省ジャーナル"}
                    {!requiresJournal && (
                      <span className="ml-2 text-xs" style={{ color: "#8B9DAE" }}>
                        （任意）
                      </span>
                    )}
                  </p>
                  {/* ── コマ見出し + プロンプト固定表示（文脈明確化）── */}
                  <div
                    className="mb-3 px-3 py-2"
                    style={{
                      background: "rgba(201,185,154,0.08)",
                      border: "1px solid rgba(201,185,154,0.3)",
                      borderRadius: 0,
                    }}
                  >
                    <p className="text-yoake-text-muted text-xs mb-1 font-ui tracking-wider">
                      {komaLabel} の問い
                    </p>
                    <p className="text-yoake-text-secondary text-sm leading-relaxed font-serif italic">
                      {scene.journal_prompt}
                    </p>
                  </div>
                </>
              )}
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                rows={4}
                placeholder={
                  isQuestionCard
                    ? "問いを書いてみよう"
                    : "自分の考えを書いてみよう（何字でも大丈夫）"
                }
                className="w-full bg-yoake-bg border-b-2 border-yoake-border px-2 py-3 text-yoake-ink placeholder-yoake-text-muted focus:outline-none focus:border-yoake-accent resize-none text-sm transition-colors font-serif"
                style={{ borderRadius: 0 }}
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-yoake-text-muted text-xs font-serif">
                  {journalText.length}字
                </span>
                {!journalSaved ? (
                  <div className="flex items-center gap-2">
                    {/* v2: スキップボタン — requires_journal: false のシーンは常に表示 */}
                    {(!requiresJournal || isJournal) && (
                      <button
                        onClick={handleSkipJournal}
                        className="text-yoake-text-muted hover:text-yoake-text-secondary text-xs font-serif transition-colors"
                        style={{ minHeight: "44px", padding: "0 8px" }}
                      >
                        スキップ
                      </button>
                    )}
                    <button
                      disabled={journalText.trim().length === 0}
                      onClick={handleJournalSave}
                      className="bg-yoake-accent hover:bg-yoake-accent-hover text-yoake-bg text-sm px-5 py-2 transition-colors disabled:opacity-40 font-ui tracking-widest"
                      style={{ borderRadius: 0, minHeight: "44px" }}
                    >
                      {isQuestionCard ? "書く" : "記録する"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-end">
                    {isJournal && (
                      <button
                        onClick={handleOpenJournalChat}
                        className="bg-sky-700 hover:bg-sky-600 text-white text-xs px-4 py-2 transition-colors font-ui tracking-widest"
                        style={{ borderRadius: 0, minHeight: "44px" }}
                      >
                        灰島遊に話しかけてみる →
                      </button>
                    )}
                    <button
                      onClick={handleContinueFromJournal}
                      className="text-yoake-text-muted hover:text-yoake-text-secondary text-xs font-serif transition-colors"
                    >
                      {isQuestionCard ? "次へ" : "そのまま続ける"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── コルクボード ── */}
          {isCorkBoard && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yoake-bg-card paper-texture p-5 mt-1"
              style={{ border: "2px solid #C9B99A", borderRadius: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-yoake-text-muted text-xs mb-3 tracking-wide font-ui">
                コルクボード — 情報カード
              </p>
              <div className="space-y-2 mb-4">
                {scene.messages?.map((msg, i) => (
                  <div
                    key={i}
                    className="bg-yoake-bg px-3 py-2 text-yoake-text-secondary text-xs font-serif leading-relaxed"
                    style={{
                      border: "1px solid rgba(201,185,154,0.4)",
                      borderRadius: 0,
                    }}
                  >
                    · {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    updateStatus({ connect_power: 3 });
                    if (scene.next_scene && SCENE_MAP[scene.next_scene]) {
                      setSceneKey(scene.next_scene);
                      setMsgIndex(0);
                    }
                  }}
                  className="bg-yoake-accent hover:bg-yoake-accent-hover text-yoake-bg text-sm px-5 py-2 transition-colors font-ui tracking-widest"
                  style={{ borderRadius: 0, minHeight: "44px" }}
                >
                  情報を整理する
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── v2: 証拠ボードモーダル ── */}
      <EvidenceBoardModal
        isOpen={evidenceBoardOpen}
        onClose={() => setEvidenceBoardOpen(false)}
      />
    </main>
  );
}
