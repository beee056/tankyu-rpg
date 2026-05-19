import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JournalEntry, QuestionCard } from "shared-types";

interface JournalState {
  draft: string;
  currentQuestionCard: string;
  entries: JournalEntry[];
  questionCards: QuestionCard[];

  // Actions
  setDraft: (text: string) => void;
  clearDraft: () => void;
  setQuestionCard: (text: string) => void;
  addEntry: (entry: JournalEntry) => void;
  addQuestionCard: (card: QuestionCard) => void;
  clearAll: () => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      draft: "",
      currentQuestionCard: "",
      entries: [],
      questionCards: [],

      setDraft: (text) => set({ draft: text }),
      clearDraft: () => set({ draft: "" }),
      setQuestionCard: (text) => set({ currentQuestionCard: text }),

      addEntry: (entry) =>
        set((state) => ({ entries: [...state.entries, entry] })),

      addQuestionCard: (card) =>
        set((state) => ({ questionCards: [...state.questionCards, card] })),

      clearAll: () =>
        set({ draft: "", currentQuestionCard: "", entries: [], questionCards: [] }),
    }),
    {
      name: "yoake-journal-store",
    }
  )
);
