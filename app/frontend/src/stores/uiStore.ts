import { create } from "zustand";

interface UiState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  isAnimating: boolean;
  isSaving: boolean;

  // Actions
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setAnimating: (val: boolean) => void;
  setSaving: (val: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  isModalOpen: false,
  modalContent: null,
  isAnimating: false,
  isSaving: false,

  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  setAnimating: (val) => set({ isAnimating: val }),
  setSaving: (val) => set({ isSaving: val }),
}));
