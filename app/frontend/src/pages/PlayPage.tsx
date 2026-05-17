import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { usePlayerStore } from "@/stores/playerStore";
import { SCENE_MAP, CHAPTER1_START_SCENE } from "@/scenarios/ch1/scene_01";
import type { SceneData, SceneMessage, CharacterId } from "shared-types";

// ── キャラクター表示名 ──────────────────────────────────────────────────────
const CHAR_NAMES: Record<CharacterId, string> = {
  akira: "御堂 煌",
  yu: "灰島 遊",
  chifuka: "長岡 知深",
  minori: "みのり",
  ren: "蓮",
};

// ── キャラクター名ラベル色 ──────────────────────────────────────────────────
const CHAR_COLORS: Record<CharacterId, string> = {
  akira: "text-lighthouse-gold",
  yu: "text-sky-400",
  chifuka: "text-slate-300",
  minori: "text-rose-300",
  ren: "text-emerald-400",
};

// ── 文字送り速度: 30文字/秒 ───────────────────────────────────────────────
const CHARS_PER_SEC = 30;

// ─────────────────────────────────────────────────────────────────────────────
// TypewriterText: 1文字ずつ表示するコンポーネント
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
        <span className="opacity-0">.</span> // reserve layout
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CharacterPortrait: キャラクター立ち絵
// ─────────────────────────────────────────────────────────────────────────────
function CharacterPortrait({ charId }: { charId: CharacterId | undefined }) {
  if (!charId) return null;

  // 御堂のみ実在画像あり（midou_02_thinking.png）
  const imageSrc =
    charId === "akira"
      ? "/assets/characters/midou/midou_02_thinking.png"
      : null;

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
          />
        ) : (
          // CSS プレースホルダー
          <div className="w-full aspect-[2/3] bg-lighthouse-bg-card border border-lighthouse-border rounded-xl flex items-end justify-center pb-3">
            <span className="text-lighthouse-text-muted text-xs text-center px-1">
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

  // シーン識別子: ルートパラメータが "1" ならコマ1の先頭
  const resolvedSceneKey =
    chapterId && sceneId
      ? `ch${chapterId}_s0${sceneId}_narration`
      : CHAPTER1_START_SCENE;

  const [sceneKey, setSceneKey] = useState<string>(
    SCENE_MAP[resolvedSceneKey] ? resolvedSceneKey : CHAPTER1_START_SCENE
  );
  const scene: SceneData | undefined = SCENE_MAP[sceneKey];

  // 複数メッセージのインデックス
  const [msgIndex, setMsgIndex] = useState(0);
  const [typewriterDone, setTypewriterDone] = useState(false);

  // ジャーナル
  const [journalText, setJournalText] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);

  // 現在表示するメッセージ
  const currentMsg: SceneMessage | undefined = scene?.messages?.[msgIndex];

  // ── メッセージ or シーンが変わったらリセット ────────────────────────────
  useEffect(() => {
    setTypewriterDone(false);
  }, [sceneKey, msgIndex]);

  // ── メッセージ送り ────────────────────────────────────────────────────────
  const advanceMessage = useCallback(() => {
    if (!scene) return;

    // タイプライター中: まずすべて表示
    if (!typewriterDone) {
      setTypewriterDone(true);
      return;
    }

    const msgs = scene.messages ?? [];
    if (msgIndex < msgs.length - 1) {
      // 次のメッセージへ
      setMsgIndex((i) => i + 1);
    } else if (scene.type !== "choice" && scene.type !== "journal") {
      // 次のシーンへ
      if (scene.next_scene && SCENE_MAP[scene.next_scene]) {
        setSceneKey(scene.next_scene);
        setMsgIndex(0);
      } else if (scene.next_scene === "ch1_s02") {
        navigate("/dashboard");
      }
    }
  }, [scene, msgIndex, typewriterDone, navigate]);

  // ── キーボード / クリック ─────────────────────────────────────────────────
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

  // ── 選択肢選択 ───────────────────────────────────────────────────────────
  function handleChoice(choice: NonNullable<SceneData["choices"]>[number]) {
    // ステータスデルタ反映
    if (choice.status_delta) {
      updateStatus(choice.status_delta);
    }
    // flag_updates も statusPoints に反映（question/explore に加算するシンプルマッピング）
    if (choice.flag_updates) {
      for (const fu of choice.flag_updates) {
        if (fu.key.includes("QUESTION")) updateStatus({ question_power: fu.delta });
        else if (fu.key.includes("EXPLORE")) updateStatus({ explore_power: fu.delta });
      }
    }

    // バックエンドへのログ送信（ノンブロッキング）
    fetch("/api/choices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scene_id: scene?.scene_id,
        choice_key: choice.key,
      }),
    }).catch(() => {
      // ローカル開発時は失敗しても無視
    });

    const next = choice.next_scene;
    if (next && SCENE_MAP[next]) {
      setSceneKey(next);
      setMsgIndex(0);
    }
  }

  // ── ジャーナル保存 ────────────────────────────────────────────────────────
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
    // ジャーナル保存後に次のシーンへ
    if (scene?.next_scene === "ch1_s02") {
      setTimeout(() => navigate("/dashboard"), 800);
    } else if (scene?.next_scene && SCENE_MAP[scene.next_scene]) {
      setTimeout(() => {
        setSceneKey(scene.next_scene!);
        setMsgIndex(0);
      }, 600);
    }
  }

  if (!scene) {
    return (
      <main className="min-h-screen bg-lighthouse-bg flex items-center justify-center">
        <p className="text-lighthouse-text-muted">シーンデータが見つかりません</p>
      </main>
    );
  }

  const isNarration = scene.type === "narration";
  const isChoice = scene.type === "choice";
  const isJournal = scene.type === "journal";
  const speakerChar = currentMsg?.character as CharacterId | undefined;
  const speakerName = speakerChar ? CHAR_NAMES[speakerChar] : null;
  const speakerColor = speakerChar ? CHAR_COLORS[speakerChar] : null;

  return (
    <main className="min-h-screen bg-lighthouse-bg flex flex-col select-none">
      {/* ── ヘッダー ── */}
      <header className="border-b border-lighthouse-border px-4 py-3 flex items-center justify-between flex-shrink-0 z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-lighthouse-text-muted hover:text-lighthouse-text-secondary text-xs transition-colors"
        >
          ← 事務所に戻る
        </button>
        <div className="text-xs text-lighthouse-text-muted">
          第1章 · コマ1
        </div>
        <div className="flex items-center gap-1 text-xs text-lighthouse-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-lighthouse-accent animate-pulse-soft" />
          保存済み
        </div>
      </header>

      {/* ── 背景エリア（事務所内・夜明け） ── */}
      <div
        className="relative flex-1 flex flex-col overflow-hidden"
        onClick={() => !isChoice && !isJournal && advanceMessage()}
        style={{ cursor: isChoice || isJournal ? "default" : "pointer" }}
      >
        {/* 背景 CSS グラデーション（夜明けの事務所） */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(160deg, #0d1420 0%, #111827 50%, #1a1f2e 100%)",
          }}
        />
        {/* 仮の窓光演出 */}
        <div
          className="absolute top-0 right-0 w-48 h-48 opacity-5 rounded-full blur-3xl"
          style={{ background: "#d4a847" }}
        />

        {/* ── キャラクター & セリフエリア ── */}
        <div className="relative z-10 flex flex-col flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {/* キャラクター立ち絵 */}
          <div className="flex justify-end mb-4 min-h-[120px] sm:min-h-[160px]">
            <CharacterPortrait charId={speakerChar} />
          </div>

          {/* セリフボックス */}
          <AnimatePresence mode="wait">
            {(currentMsg || (isChoice && scene.messages && scene.messages.length > 0)) && (
              <motion.div
                key={`${sceneKey}-${msgIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-lighthouse-bg-card bg-opacity-90 border border-lighthouse-border rounded-xl p-5 mb-4 backdrop-blur-sm"
              >
                {/* ナレーション表示 */}
                {isNarration && currentMsg && (
                  <p className="text-lighthouse-text-secondary text-sm leading-loose italic">
                    <TypewriterText
                      text={currentMsg.text}
                      onComplete={() => setTypewriterDone(true)}
                    />
                  </p>
                )}

                {/* 通常セリフ */}
                {!isNarration && !isChoice && currentMsg && (
                  <>
                    {speakerName && (
                      <p className={`text-xs font-semibold mb-2 ${speakerColor ?? "text-lighthouse-text-muted"}`}>
                        {speakerName}
                      </p>
                    )}
                    <p className="text-lighthouse-text-primary text-sm leading-relaxed">
                      <TypewriterText
                        text={currentMsg.text}
                        onComplete={() => setTypewriterDone(true)}
                      />
                    </p>
                  </>
                )}

                {/* 選択肢シーンの前置きセリフ */}
                {isChoice && scene.messages && scene.messages.length > 0 && currentMsg && !isJournal && (
                  <>
                    {speakerName && (
                      <p className={`text-xs font-semibold mb-2 ${speakerColor ?? "text-lighthouse-text-muted"}`}>
                        {speakerName}
                      </p>
                    )}
                    <p className="text-lighthouse-text-primary text-sm leading-relaxed">
                      <TypewriterText
                        text={currentMsg.text}
                        onComplete={() => setTypewriterDone(true)}
                      />
                    </p>
                  </>
                )}

                {/* 次へ表示 */}
                {typewriterDone && !isChoice && !isJournal && (
                  <div className="mt-3 flex justify-end">
                    <span className="text-lighthouse-text-muted text-xs animate-pulse-soft">
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
                  className="w-full text-left bg-lighthouse-bg-surface border border-lighthouse-border hover:border-lighthouse-accent rounded-xl px-4 py-3 text-lighthouse-text-secondary hover:text-lighthouse-text-primary transition-all text-sm active:scale-95"
                >
                  <span className="text-lighthouse-text-muted text-xs mr-2">
                    {choice.key}.
                  </span>
                  {choice.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* ── 内省ジャーナル ── */}
          {isJournal && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-lighthouse-bg-card border border-lighthouse-border rounded-xl p-5 mt-1"
              onClick={(e) => e.stopPropagation()}
            >
              {scene.journal_prompt && (
                <>
                  <p className="text-lighthouse-text-muted text-xs mb-1 tracking-wide">
                    内省ジャーナル
                  </p>
                  <p className="text-lighthouse-text-secondary text-sm mb-3 leading-relaxed">
                    {scene.journal_prompt}
                  </p>
                </>
              )}
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                rows={4}
                placeholder="自分の考えを書いてみよう（何字でも大丈夫）"
                className="w-full bg-lighthouse-bg-surface border border-lighthouse-border rounded-lg px-4 py-3 text-lighthouse-text-primary placeholder-lighthouse-text-muted focus:outline-none focus:border-lighthouse-accent resize-none text-sm transition-colors"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lighthouse-text-muted text-xs">
                  {journalText.length}字
                </span>
                <button
                  disabled={journalText.trim().length === 0 || journalSaved}
                  onClick={handleJournalSave}
                  className="bg-lighthouse-accent hover:bg-lighthouse-accent-hover text-white text-sm px-5 py-2 rounded-lg transition-colors disabled:opacity-40"
                >
                  {journalSaved ? "保存しました" : "記録する"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
