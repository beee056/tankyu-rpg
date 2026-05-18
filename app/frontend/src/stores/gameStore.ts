import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  currentPart: number;
  currentChapter: number;
  currentScene: number;
  playCount: number;
  playtimeSeconds: number;
  empathyCount: number;
  deepDigCount: number;
  questionFlagDeepTalk: boolean;

  /** シーンキー文字列（例: "ch1_s01_journal"）— リロード時の再開に使用 */
  currentSceneKey: string;
  /** 最終更新日時 ISO string */
  lastUpdatedAt: string;

  // Actions
  advanceScene: () => void;
  setPart: (part: number) => void;
  incrementEmpathy: () => void;
  incrementDeepDig: () => void;
  setDeepTalkFlag: () => void;
  saveScene: (sceneKey: string) => void;
  resetProgress: () => void;
}

const initialState = {
  currentPart: 0,
  currentChapter: 1,
  currentScene: 1,
  playCount: 1,
  playtimeSeconds: 0,
  empathyCount: 0,
  deepDigCount: 0,
  questionFlagDeepTalk: false,
  currentSceneKey: "",
  lastUpdatedAt: "",
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      advanceScene: () =>
        set((state) => ({
          currentScene: state.currentScene + 1,
        })),

      setPart: (part) => set({ currentPart: part }),

      incrementEmpathy: () =>
        set((state) => ({ empathyCount: state.empathyCount + 1 })),

      incrementDeepDig: () =>
        set((state) => ({ deepDigCount: state.deepDigCount + 1 })),

      setDeepTalkFlag: () => set({ questionFlagDeepTalk: true }),

      saveScene: (sceneKey: string) =>
        set((state) => {
          // コマ番号を更新（ch1_s02... → scene 2）
          const m = sceneKey.match(/ch\d+_s0?(\d+)/);
          const sceneNum = m ? parseInt(m[1], 10) : state.currentScene;
          return {
            currentSceneKey: sceneKey,
            currentScene: sceneNum,
            lastUpdatedAt: new Date().toISOString(),
          };
        }),

      resetProgress: () => set(initialState),
    }),
    {
      name: "yoake-game-progress",
    }
  )
);
