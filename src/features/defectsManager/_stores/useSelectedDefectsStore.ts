import { create } from 'zustand'
import { TDefect } from '../_types/TDefect'

type State = {
  selectedDefects: TDefect[]
  selectDefect: (defect: TDefect) => void
  deselectDefect: (defect_id: string) => void
}

export const useSelectedDefectsStore = create<State>((set) => ({
  selectedDefects: [],

  selectDefect: (defect: TDefect) => {
    if (!defect) {
      return
    }
    set((state) => ({ 
      selectedDefects: [defect, ...state.selectedDefects]
    }))
  },

  deselectDefect: (defect_id) => {
    if (!defect_id) {
      return
    }
    set((state) => ({
      selectedDefects: state.selectedDefects.filter(defect => defect.defectID !== defect_id)
    }))
  }
}))