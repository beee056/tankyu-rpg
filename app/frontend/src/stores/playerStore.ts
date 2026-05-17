import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Player, StatusPoint, TitleAchievement } from "shared-types";

interface PlayerState {
  player: Player | null;
  statusPoints: Omit<StatusPoint, "status_id" | "player_id" | "updated_at"> | null;
  achievements: TitleAchievement[];

  // Actions
  setPlayer: (player: Player) => void;
  updateStatus: (
    delta: Partial<Omit<StatusPoint, "status_id" | "player_id" | "updated_at">>
  ) => void;
  addAchievement: (achievement: TitleAchievement) => void;
  clearPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      player: null,
      statusPoints: {
        question_power: 0,
        explore_power: 0,
        connect_power: 0,
        express_power: 0,
      },
      achievements: [],

      setPlayer: (player) => set({ player }),

      updateStatus: (delta) =>
        set((state) => ({
          statusPoints: {
            question_power: Math.min(
              100,
              (state.statusPoints?.question_power ?? 0) +
                (delta.question_power ?? 0)
            ),
            explore_power: Math.min(
              100,
              (state.statusPoints?.explore_power ?? 0) +
                (delta.explore_power ?? 0)
            ),
            connect_power: Math.min(
              100,
              (state.statusPoints?.connect_power ?? 0) +
                (delta.connect_power ?? 0)
            ),
            express_power: Math.min(
              100,
              (state.statusPoints?.express_power ?? 0) +
                (delta.express_power ?? 0)
            ),
          },
        })),

      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [...state.achievements, achievement],
        })),

      clearPlayer: () =>
        set({
          player: null,
          statusPoints: {
            question_power: 0,
            explore_power: 0,
            connect_power: 0,
            express_power: 0,
          },
          achievements: [],
        }),
    }),
    {
      name: "lighthouse-player-data",
    }
  )
);
