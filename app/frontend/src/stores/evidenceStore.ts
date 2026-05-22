import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Evidence } from "shared-types";
import { CH1_EVIDENCES } from "../scenarios/ch1/evidences";

// ============================================================
// AssociationResult — result of associateEvidence()
// ============================================================
export type AssociationResult =
  | { type: "hypothesis_unlocked"; hypothesisId: string; message: string }
  | { type: "hint"; message: string };

// ============================================================
// EvidenceState
// ============================================================
interface EvidenceState {
  collectedEvidences: Evidence[];
  hasNewEvidence: boolean;
  isBoardOpen: boolean;
  selectedIds: string[];

  // Actions
  addEvidence: (id: string) => void;
  removeEvidence: (id: string) => void;
  clearNewFlag: () => void;
  openBoard: () => void;
  closeBoard: () => void;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
  associateEvidence: () => AssociationResult;
  clearAll: () => void;
}

// ============================================================
// Store
// ============================================================
export const useEvidenceStore = create<EvidenceState>()(
  persist(
    (set, get) => ({
      collectedEvidences: [],
      hasNewEvidence: false,
      isBoardOpen: false,
      selectedIds: [],

      addEvidence: (id: string) =>
        set((state) => {
          if (state.collectedEvidences.some((e) => e.id === id)) {
            return state;
          }
          const master = CH1_EVIDENCES[id];
          if (!master) {
            return state;
          }
          return {
            collectedEvidences: [
              ...state.collectedEvidences,
              { ...master, obtainedAt: Date.now() },
            ],
            hasNewEvidence: true,
          };
        }),

      removeEvidence: (id: string) =>
        set((state) => ({
          collectedEvidences: state.collectedEvidences.filter((e) => e.id !== id),
          selectedIds: state.selectedIds.filter((s) => s !== id),
        })),

      clearNewFlag: () => set({ hasNewEvidence: false }),

      openBoard: () => set({ isBoardOpen: true }),

      closeBoard: () => set({ isBoardOpen: false }),

      toggleSelect: (id: string) =>
        set((state) => {
          const sel = state.selectedIds;
          if (sel.includes(id)) {
            return { selectedIds: sel.filter((s) => s !== id) };
          }
          if (sel.length >= 3) return state;
          return { selectedIds: [...sel, id] };
        }),

      clearSelection: () => set({ selectedIds: [] }),

      // stub — full logic wired in Subtask 2/3
      associateEvidence: (): AssociationResult => {
        const { collectedEvidences, selectedIds } = get();
        const selected = collectedEvidences.filter((e) =>
          selectedIds.includes(e.id)
        );
        const allTags = new Set(selected.flatMap((e) => e.tags));

        // association definitions (ch1)
        const ASSOC_DEFS: Array<{
          requiredTags: string[];
          hypothesisId: string;
          message: string;
        }> = [
          {
            requiredTags: ["みのり", "投稿", "傷つき"],
            hypothesisId: "hyp_ch1_A",
            message: "「友達の投稿」と「みのりの傷つき」が繋がった。仮説Aが解放された。",
          },
          {
            requiredTags: ["桐嶋", "疲れ", "隠す"],
            hypothesisId: "hyp_ch1_B",
            message: "桐嶋の「疲れ」と「隠す」行動が繋がった。仮説Bが解放された。",
          },
          {
            requiredTags: ["みのり", "桐嶋", "傷つき", "隠す"],
            hypothesisId: "hyp_ch1_C",
            message: "みのりと桐嶋、双方の問いが見えてきた。仮説Cが解放された。",
          },
          {
            requiredTags: ["桐嶋", "家", "隠す", "謝罪"],
            hypothesisId: "hyp_ch1_D",
            message: "桐嶋の家庭事情と謝罪が繋がった。真相仮説Dが解放された。",
          },
          // Cルート SNS投稿タップ仮説（sns_* タグ）
          {
            requiredTags: ["sns_school", "sns_place"],
            hypothesisId: "hyp_ch1_sns_A",
            message: "仮説：学校に居場所がない。物理的でなく、心理的な『どこか』を探していた",
          },
          {
            requiredTags: ["sns_school", "sns_isolation"],
            hypothesisId: "hyp_ch1_sns_B",
            message: "仮説：学校で透を孤立させた何か（誰か）がいる。透はそれを知っている",
          },
          {
            requiredTags: ["sns_place", "sns_isolation"],
            hypothesisId: "hyp_ch1_sns_C",
            message: "仮説：誰かに伝わるのを恐れていた。これは助けの呼び方だが、宛先は誰でもよくない",
          },
          {
            requiredTags: ["sns_late", "sns_isolation"],
            hypothesisId: "hyp_ch1_sns_D",
            message: "仮説：23時47分。眠れない夜に書いて、朝までに非公開化した。\n　書いてしまった自分を、すぐに恥じた。あるいは、誰かに見つけられるのが怖くなった",
          },
          // v2.5: クロスルート仮説（ルートA/B/C 横断）
          {
            requiredTags: ["home_lie", "school_nurse", "sns_isolation"],
            hypothesisId: "hyp_ch1_I",
            message:
              "仮説I：透は何かを抱え、学校でも家でも本当のことを話せていない。保健室の先生だけが気づいていたかもしれない",
          },
          {
            requiredTags: ["home_car", "school_meeting", "sns_late"],
            hypothesisId: "hyp_ch1_II",
            message:
              "仮説II：夜中の車、放課後の約束、深夜投稿。透は何度か『どこかへ行こうとしていた』",
          },
          {
            requiredTags: ["home_sound", "school_teacher", "sns_place"],
            hypothesisId: "hyp_ch1_III",
            message:
              "仮説III：家族と学校が共謀して透を隠している。透は『見つからない場所』にすでに居る",
          },
          {
            requiredTags: ["home_car", "school_nurse", "sns_school"],
            hypothesisId: "hyp_ch1_IV",
            message:
              "仮説IV：透は学校に来るつもりだったはずなのに、誰かに止められた。その誰かは家の中にいる",
          },
        ];

        for (const def of ASSOC_DEFS) {
          const reqSet = new Set(def.requiredTags);
          const allMatch = [...reqSet].every((t) => allTags.has(t));
          if (allMatch) {
            return {
              type: "hypothesis_unlocked",
              hypothesisId: def.hypothesisId,
              message: def.message,
            };
          }
        }

        return {
          type: "hint",
          message: "何かが繋がりかけている。もう少し証拠が必要かもしれない。",
        };
      },

      clearAll: () =>
        set({
          collectedEvidences: [],
          hasNewEvidence: false,
          isBoardOpen: false,
          selectedIds: [],
        }),
    }),
    {
      name: "yoake-evidence-store-v2.5",
    }
  )
);
