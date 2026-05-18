import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { CHAPTER1_SCENE_MAP as SCENE_MAP, CHAPTER1_START_SCENE } from "@/scenarios/ch1";
import type { SceneData, SceneMessage, CharacterId } from "shared-types";

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
  onComplete,
}: {
  text: string;
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

  return (
    <span
      className="whitespace-pre-wrap"
      onClick={showAll}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && showAll()}
    >
      {text.slice(0, displayed)}
      {displayed < text.length && (
        <span className="opacity-0">.</span>
      )}
    </span>
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
      case "yu":    return "/assets/characters/yu/yu_placeholder.svg";
      case "chifuka": return "/assets/characters/chifuka/chifuka_placeholder.svg";
      case "minori":  return "/assets/characters/minori/minori_placeholder.svg";
      case "ren":     return "/assets/characters/ren/ren_placeholder.svg";
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
        className="flex-shrink-0 w-28 sm:w-36 self-end"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={CHAR_NAMES[charId]}
            className="w-full object-contain max-h-52 opacity-90"
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
  const { updateStatus } = usePlayerStore();
  void useGameStore; // suppress unused import warning

  const resolvedSceneKey =
    chapterId && sceneId
      ? `ch${chapterId}_s0${sceneId}_narration`
      : CHAPTER1_START_SCENE;

  const [sceneKey, setSceneKey] = useState<string>(
    SCENE_MAP[resolvedSceneKey] ? resolvedSceneKey : CHAPTER1_START_SCENE
  );
  const scene: SceneData | undefined = SCENE_MAP[sceneKey];

  const [msgIndex, setMsgIndex] = useState(0);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  const currentMsg: SceneMessage | undefined = scene?.messages?.[msgIndex];

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
    } else if (scene.type !== "choice" && scene.type !== "journal" && scene.type !== "question_card" && scene.type !== "cork_board") {
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
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        advanceMessage();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advanceMessage]);

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

    fetch("/api/choices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scene_id: scene?.scene_id,
        choice_key: choice.key,
      }),
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
    fetch("/api/journals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scene_id: scene?.scene_id,
        content: journalText,
        prompt_text: scene?.journal_prompt ?? "",
      }),
    }).catch(() => {});
    setJournalSaved(true);
    // 次のシーン遷移はあえて自動実行しない — 灰島遊に話しかけるボタンを表示する
  }

  function handleOpenJournalChat() {
    navigate("/journal", {
      state: {
        initialMessage: journalText,
        sceneId: scene?.scene_id ?? "",
        chapterId: chapterId ?? "1",
      },
    });
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

  if (!scene) {
    return (
      <main className="min-h-screen bg-yoake-bg paper-texture flex items-center justify-center">
        <p className="text-yoake-text-muted font-serif text-sm">シーンデータが見つかりません</p>
      </main>
    );
  }

  const isNarration = scene.type === "narration";
  const isChoice = scene.type === "choice";
  const isJournal = scene.type === "journal";
  const isQuestionCard = scene.type === "question_card";
  const isCorkBoard = scene.type === "cork_board";
  const isInputScene = isJournal || isQuestionCard;

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
    <main className="min-h-screen bg-yoake-bg flex flex-col select-none paper-texture">
      {/* ── ヘッダー ── */}
      <header
        className="px-4 py-3 flex items-center justify-between flex-shrink-0 z-10 bg-yoake-bg-card"
        style={{ borderBottom: "1px solid #C9B99A" }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="text-yoake-text-muted hover:text-yoake-text-secondary text-xs transition-colors font-serif"
        >
          ← 事務所に戻る
        </button>
        <div className="text-xs text-yoake-text-muted font-serif">
          {komaLabel}
        </div>
        <div className="flex items-center gap-1 text-xs text-yoake-accent">
          <span className="w-1.5 h-1.5 bg-yoake-accent animate-pulse-soft" style={{ borderRadius: 0 }} />
          <span className="font-serif">保存済み</span>
        </div>
      </header>

      {/* ── 背景エリア（事務所内・夜明け）── */}
      <div
        className="relative flex-1 flex flex-col overflow-hidden"
        onClick={() => !isChoice && !isInputScene && !isCorkBoard && advanceMessage()}
        style={{ cursor: isChoice || isInputScene || isCorkBoard ? "default" : "pointer" }}
      >
        {/* 背景: 夜明けの事務所（温かみのある暗め） */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(160deg, #1E1814 0%, #241C14 50%, #2C2218 100%)",
          }}
        />
        {/* 窓光演出 — 朝の光（琥珀色） */}
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl"
          style={{ background: "#E8B4A0", borderRadius: "50%" }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 opacity-5 blur-3xl"
          style={{ background: "#C9805E", borderRadius: "50%" }}
        />

        {/* ── キャラクター & セリフエリア ── */}
        <div className="relative z-10 flex flex-col flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {/* キャラクター立ち絵 */}
          <div className="flex justify-end mb-4 min-h-[120px] sm:min-h-[160px]">
            <CharacterPortrait charId={speakerChar} />
          </div>

          {/* ── セリフボックス（ドラクエ風：DotGothic16 + 二重枠） ── */}
          <AnimatePresence mode="wait">
            {(currentMsg || (isChoice && scene.messages && scene.messages.length > 0)) && (
              <motion.div
                key={`${sceneKey}-${msgIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="dialog-dq p-5 mb-4"
              >
                {/* ナレーション */}
                {isNarration && currentMsg && (
                  <p
                    className="text-yoake-bg text-sm leading-loose italic"
                    style={{ fontFamily: "'DotGothic16', monospace", lineHeight: 2 }}
                  >
                    <TypewriterText
                      text={currentMsg.text}
                      onComplete={() => setTypewriterDone(true)}
                    />
                  </p>
                )}

                {/* 通常セリフ（journal/question_card の前置きセリフ含む） */}
                {!isNarration && !isChoice && !isCorkBoard && currentMsg && (
                  <>
                    {speakerName && (
                      <p
                        className={`text-xs mb-2 pb-1 ${speakerColor ?? "text-yoake-text-muted"}`}
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
                      style={{ fontFamily: "'DotGothic16', monospace", lineHeight: 1.9 }}
                    >
                      <TypewriterText
                        text={currentMsg.text}
                        onComplete={() => setTypewriterDone(true)}
                      />
                    </p>
                  </>
                )}

                {/* 選択肢前置きセリフ */}
                {isChoice && scene.messages && scene.messages.length > 0 && currentMsg && !isInputScene && (
                  <>
                    {speakerName && (
                      <p
                        className={`text-xs mb-2 pb-1 ${speakerColor ?? "text-yoake-text-muted"}`}
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
                      style={{ fontFamily: "'DotGothic16', monospace", lineHeight: 1.9 }}
                    >
                      <TypewriterText
                        text={currentMsg.text}
                        onComplete={() => setTypewriterDone(true)}
                      />
                    </p>
                  </>
                )}

                {/* 次へ */}
                {typewriterDone && !isChoice && !isInputScene && !isCorkBoard && (
                  <div className="mt-3 flex justify-end">
                    <span
                      className="text-yoake-warm text-xs animate-pulse-soft"
                      style={{ fontFamily: "'DotGothic16', monospace" }}
                    >
                      クリック / Enter で次へ ▶
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
              {scene.choices?.map((choice) => (
                <button
                  key={choice.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoice(choice);
                  }}
                  className="w-full text-left bg-yoake-dialog-bg text-yoake-bg hover:bg-opacity-80 transition-all text-sm active:scale-95 px-4 py-3"
                  style={{
                    fontFamily: "'DotGothic16', monospace",
                    border: "2px solid #C9B99A",
                    outline: "1px solid #C9B99A",
                    outlineOffset: "-5px",
                    borderRadius: 0,
                  }}
                >
                  <span
                    className="text-yoake-warm text-xs mr-2"
                    style={{ fontFamily: "'DotGothic16', monospace" }}
                  >
                    {choice.key}.
                  </span>
                  {choice.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* ── 内省ジャーナル / 問いカード（共通入力UI） ── */}
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
                  </p>
                  <p className="text-yoake-text-secondary text-sm mb-3 leading-relaxed font-serif italic">
                    {scene.journal_prompt}
                  </p>
                </>
              )}
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                rows={4}
                placeholder={isQuestionCard ? "問いを書いてみよう" : "自分の考えを書いてみよう（何字でも大丈夫）"}
                className="w-full bg-yoake-bg border-b-2 border-yoake-border px-2 py-3 text-yoake-ink placeholder-yoake-text-muted focus:outline-none focus:border-yoake-accent resize-none text-sm transition-colors font-serif"
                style={{ borderRadius: 0 }}
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-yoake-text-muted text-xs font-serif">
                  {journalText.length}字
                </span>
                {!journalSaved ? (
                  <button
                    disabled={journalText.trim().length === 0}
                    onClick={handleJournalSave}
                    className="bg-yoake-accent hover:bg-yoake-accent-hover text-yoake-bg text-sm px-5 py-2 transition-colors disabled:opacity-40 font-ui tracking-widest"
                    style={{ borderRadius: 0 }}
                  >
                    {isQuestionCard ? "書く" : "記録する"}
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 items-end">
                    {isJournal && (
                      <button
                        onClick={handleOpenJournalChat}
                        className="bg-sky-700 hover:bg-sky-600 text-white text-xs px-4 py-2 transition-colors font-ui tracking-widest"
                        style={{ borderRadius: 0 }}
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

          {/* ── コルクボード（情報カード一覧 + 整理ボタン） ── */}
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
                    style={{ border: "1px solid rgba(201,185,154,0.4)", borderRadius: 0 }}
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
                  style={{ borderRadius: 0 }}
                >
                  情報を整理する
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
