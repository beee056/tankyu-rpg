import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useEvidenceStore } from "@/stores/evidenceStore";
import { api } from "@/lib/api";
import { CHAPTER1_SCENE_MAP as SCENE_MAP, CHAPTER1_START_SCENE } from "@/scenarios/ch1";
import type { SceneData, SceneMessage, CharacterId } from "shared-types";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import EvidenceBoardModal from "@/components/EvidenceBoardModal";
import { renderWithHighlights } from "@/components/HighlightSpan";
import { SceneBackground } from "@/components/SceneBackground";
import { CharacterSprite } from "@/components/CharacterSprite";
import type { SpriteEntry } from "@/components/CharacterSprite";
import { ChapterTitle } from "@/components/ChapterTitle";
import { useAudio } from "@/hooks/useAudio";

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

// ── 句読点ウェイト ────────────────────────────────────────────────────────────
const DEFAULT_COMMA_WAIT_MS  = 120;
const DEFAULT_PERIOD_WAIT_MS = 240;
const CHARS_PER_SEC          = 30;
const BASE_INTERVAL_MS       = Math.floor(1000 / CHARS_PER_SEC); // ~33ms

// ─────────────────────────────────────────────────────────────────────────────
// TypewriterText — with punctuation wait support
// ─────────────────────────────────────────────────────────────────────────────
function TypewriterText({
  text,
  highlights,
  onComplete,
  commaWaitMs = DEFAULT_COMMA_WAIT_MS,
  periodWaitMs = DEFAULT_PERIOD_WAIT_MS,
}: {
  text: string;
  highlights?: SceneMessage["highlights"];
  onComplete: () => void;
  commaWaitMs?: number;
  periodWaitMs?: number;
}) {
  const [displayed, setDisplayed] = useState(0);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayedRef = useRef(0);
  const completeRef  = useRef(onComplete);
  completeRef.current = onComplete;

  const scheduleNext = useCallback(
    (current: number, fullText: string) => {
      if (current >= fullText.length) {
        completeRef.current();
        return;
      }
      const nextChar = fullText[current - 1] ?? "";
      let delay = BASE_INTERVAL_MS;
      if (nextChar === "。" || nextChar === "！" || nextChar === "？" || nextChar === "…") {
        delay += periodWaitMs;
      } else if (nextChar === "、" || nextChar === "，") {
        delay += commaWaitMs;
      }
      timerRef.current = setTimeout(() => {
        const next = current + 1;
        displayedRef.current = next;
        setDisplayed(next);
        scheduleNext(next, fullText);
      }, delay);
    },
    [commaWaitMs, periodWaitMs]
  );

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    displayedRef.current = 0;
    setDisplayed(0);
    // Start at 1 to show the first char immediately
    const first = 1;
    displayedRef.current = first;
    setDisplayed(first);
    scheduleNext(first, text);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const showAll = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    displayedRef.current = text.length;
    setDisplayed(text.length);
    completeRef.current();
  }, [text]);

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
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-16 right-4 z-[60] flex flex-col pointer-events-none"
      style={{ maxWidth: 192 }}
    >
      <div
        className="px-3 py-2 text-xs font-ui tracking-widest text-center"
        style={{
          background: "#EDE3CF",
          border: "1px solid #C9805E",
          color: "#C9805E",
          borderRadius: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        <span className="block font-serif text-yoake-text-muted text-xs mb-0.5">証拠を記録した!</span>
        「{title}」
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VolumeControl — small BGM/SE mute toggles in bottom-right
// ─────────────────────────────────────────────────────────────────────────────
function VolumeControl({
  bgmMuted, onBgmToggle,
  seMuted, onSeToggle,
}: {
  bgmMuted: boolean; onBgmToggle: () => void;
  seMuted: boolean; onSeToggle: () => void;
}) {
  return (
    <div
      className="fixed bottom-3 right-3 z-[55] flex gap-1"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onBgmToggle}
        title={bgmMuted ? "BGM ON" : "BGM OFF"}
        className="flex items-center justify-center w-8 h-8 text-xs font-ui transition-opacity"
        style={{
          background: bgmMuted ? "rgba(40,30,20,0.7)" : "rgba(60,45,30,0.8)",
          border: "1px solid #C9B99A",
          borderRadius: 0,
          color: bgmMuted ? "#8B9DAE" : "#EDE3CF",
          opacity: 0.85,
          minWidth: 0,
        }}
      >
        {bgmMuted ? "♪✕" : "♪"}
      </button>
      <button
        onClick={onSeToggle}
        title={seMuted ? "SE ON" : "SE OFF"}
        className="flex items-center justify-center w-8 h-8 text-xs font-ui transition-opacity"
        style={{
          background: seMuted ? "rgba(40,30,20,0.7)" : "rgba(60,45,30,0.8)",
          border: "1px solid #C9B99A",
          borderRadius: 0,
          color: seMuted ? "#8B9DAE" : "#EDE3CF",
          opacity: 0.85,
          minWidth: 0,
        }}
      >
        {seMuted ? "SE✕" : "SE"}
      </button>
    </div>
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
  const { addEvidence, collectedEvidences } = useEvidenceStore();

  // ── Audio ──────────────────────────────────────────────────────────────────
  const {
    setBgm, playSe,
    bgmMuted, setBgmMuted,
    seMuted, setSeMuted,
  } = useAudio();

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

  // v2: evidence board open state
  const [evidenceBoardOpen, setEvidenceBoardOpen] = useState(false);

  // v2: toast for newly collected evidence
  const [toastTitle, setToastTitle] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevEvidenceCountRef = useRef(collectedEvidences.length);

  // ── v2.5: direction layer state ────────────────────────────────────────────
  const [currentBg, setCurrentBg] = useState<string | null>(null);
  const [bgTint, setBgTint] = useState<string | undefined>(undefined);
  const [sprites, setSprites] = useState<SpriteEntry[]>([]);
  const [chapterTitleText, setChapterTitleText] = useState<string | null>(null);

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
        // Play SE on evidence collect
        playSe("/assets/audio/se_evidence.mp3");
      }
    }
    prevEvidenceCountRef.current = current;
  }, [collectedEvidences, playSe]);

  useEffect(() => {
    setTypewriterDone(false);
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

  // ── v2.5: fire direction effects on message change ────────────────────
  useEffect(() => {
    if (!currentMsg) return;

    // Background
    if (currentMsg.background !== undefined) {
      setCurrentBg(currentMsg.background || null);
      // "research room" tint detection via path
      if (currentMsg.background && currentMsg.background.includes("office_research")) {
        setBgTint("brightness(0.85) saturate(0.9)");
      } else {
        setBgTint(undefined);
      }
    }

    // BGM — parse directive: "start bgm_main ..." / "ramp ..." / "duck ..." / "fadeOut ..."
    if (currentMsg.bgm !== undefined) {
      const bgmDir = currentMsg.bgm;
      if (!bgmDir) {
        setBgm(null);
      } else {
        // Extract track name if directive starts with "start "
        const startMatch = bgmDir.match(/^start\s+(\S+)/);
        if (startMatch) {
          setBgm(`/assets/audio/${startMatch[1]}.mp3`);
        } else if (/^fadeOut/i.test(bgmDir)) {
          setBgm(null);
        }
        // "ramp" / "duck" directives are volume changes — ignore for now (no vol control API needed)
      }
    }

    // SE — resolve name to path
    if (currentMsg.se) {
      const seVal = currentMsg.se;
      const sePath = seVal.startsWith("/") ? seVal : `/assets/audio/${seVal}.mp3`;
      playSe(sePath);
    }

    // Character action
    if (currentMsg.character_action) {
      const ca = currentMsg.character_action;
      setSprites((prev) => {
        if (ca.action === "fadeOut") {
          // actor === "all" → clear all sprites; otherwise remove just the named actor
          if (ca.actor === "all") return [];
          return prev.filter((s) => s.actor !== ca.actor);
        }
        // Remove existing entry for this actor, then add new one
        const without = prev.filter((s) => s.actor !== ca.actor);
        const newEntry: SpriteEntry = {
          actor: ca.actor,
          position: ca.position ?? "center",
          action: ca.action,
        };
        return [...without, newEntry];
      });
    }

    // Chapter title
    if (currentMsg.chapter_title) {
      setChapterTitleText(currentMsg.chapter_title);
    }

  }, [currentMsg, setBgm, playSe]);

  // ── v2: special next_scene routing helper ─────────────────────────────
  const navigateToNextScene = useCallback(
    (nextScene: string | undefined) => {
      if (!nextScene) return;
      if (nextScene === "CHAPTER_END") {
        navigate("/dashboard");
      } else if (nextScene === "deduction_ch1") {
        navigate("/deduction/ch1");
      } else if (SCENE_MAP[nextScene]) {
        setSceneKey(nextScene);
        setMsgIndex(0);
      }
    },
    [navigate]
  );

  // ── v2.5: "To be continued" ダッシュボード戻るボタン表示判定 ─────────
  const isToBeContinued = sceneKey === "ch1_s02_to_be_continued";

  const advanceMessage = useCallback(() => {
    if (!scene) return;

    if (!typewriterDone) {
      setTypewriterDone(true);
      return;
    }

    // SE on advance (click sound)
    playSe("/assets/audio/se_click.mp3");

    const msgs = scene.messages ?? [];
    if (msgIndex < msgs.length - 1) {
      setMsgIndex((i) => i + 1);
    } else if (
      scene.type !== "choice" &&
      scene.type !== "cork_board"
    ) {
      navigateToNextScene(scene.next_scene);
    }
  }, [scene, msgIndex, typewriterDone, navigateToNextScene, playSe]);

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

    playSe("/assets/audio/se_click.mp3");

    api.post("/api/choices", {
      scene_id: scene?.scene_id,
      choice_key: choice.key,
    }).catch(() => {});

    navigateToNextScene(choice.next_scene);
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
  const isCorkBoard = scene.type === "cork_board";

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

  // v2.5: text pacing from currentMsg
  const commaWait  = currentMsg?.text_pace?.punctuation_wait_ms ?? DEFAULT_COMMA_WAIT_MS;
  const periodWait = currentMsg?.text_pace?.line_pause_ms       ?? DEFAULT_PERIOD_WAIT_MS;

  return (
    <main className="h-screen bg-yoake-bg flex flex-col select-none paper-texture overflow-hidden">
      {/* ── ヘッダー ── */}
      <header
        className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0 z-20 bg-yoake-bg-card"
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
          !isChoice && !isCorkBoard && !evidenceBoardOpen && advanceMessage()
        }
        style={{
          cursor: isChoice || isCorkBoard || evidenceBoardOpen ? "default" : "pointer",
        }}
      >
        {/* ── v2.5: 背景レイヤー (z-0 ~ z-[1]) ── */}
        <SceneBackground src={currentBg} tint={bgTint} />

        {/* ── v2.5: 立ち絵レイヤー (z-[5]) — 話者1人モード: 最後に登場したキャラのみ ── */}
        <CharacterSprite sprites={sprites.slice(-1)} />

        {/* ── v2.5: 章タイトルオーバーレイ (z-[50]) ── */}
        <ChapterTitle
          title={chapterTitleText}
          onComplete={() => {
            setChapterTitleText(null);
            // 章タイトル表示後、自動で次へ進める
            if (scene?.messages && msgIndex < scene.messages.length - 1) {
              setMsgIndex((i) => i + 1);
            } else if (scene?.next_scene) {
              navigateToNextScene(scene.next_scene);
            }
          }}
        />

        {/* ── キャラクター & セリフエリア (z-10) ── */}
        <div className={`relative z-10 flex flex-col flex-1 max-w-2xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 overflow-y-auto transition-opacity duration-300 ${chapterTitleText ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {/* キャラクター立ち絵スペース（既存の上端空白を維持しつつ新レイヤーに委譲） */}
          <div className="flex justify-end mb-3 sm:mb-4 min-h-[100px] sm:min-h-[140px] md:min-h-[160px]" />

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
                      commaWaitMs={commaWait}
                      periodWaitMs={periodWait}
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
                        commaWaitMs={commaWait}
                        periodWaitMs={periodWait}
                      />
                    </p>
                  </>
                )}

                {isChoice &&
                  scene.messages &&
                  scene.messages.length > 0 &&
                  currentMsg && (
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
                          commaWaitMs={commaWait}
                          periodWaitMs={periodWait}
                        />
                      </p>
                    </>
                  )}

                {typewriterDone &&
                  !isChoice &&
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
                    navigateToNextScene(scene.next_scene);
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

        {/* ── v2.5: To be continued ダッシュボードに戻るボタン ── */}
        {isToBeContinued && typewriterDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 left-0 right-0 flex justify-center z-[60] pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="text-yoake-bg text-sm px-8 py-3 font-ui tracking-widest transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "#C9805E",
                border: "2px solid #C9B99A",
                borderRadius: 0,
                boxShadow: "2px 2px 0 #B56B49",
                minHeight: "48px",
              }}
            >
              ダッシュボードに戻る →
            </button>
          </motion.div>
        )}
      </div>

      {/* ── v2.5: ボリュームコントロール（右下、小さめ）── */}
      <VolumeControl
        bgmMuted={bgmMuted}
        onBgmToggle={() => setBgmMuted(!bgmMuted)}
        seMuted={seMuted}
        onSeToggle={() => setSeMuted(!seMuted)}
      />

      {/* ── v2: 証拠ボードモーダル ── */}
      <EvidenceBoardModal
        isOpen={evidenceBoardOpen}
        onClose={() => setEvidenceBoardOpen(false)}
      />
    </main>
  );
}
