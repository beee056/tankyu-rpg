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

  // Actions
  advanceScene: () => void;
  setPart: (part: number) => void;
  incrementEmpathy: () => void;
  incrementDeepDig: () => void;
  setDeepTalkFlag: () => void;
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

      resetProgress: () => set(initialState),
    }),
    {
      name: "lighthouse-game-progress",
    }
  )
);
