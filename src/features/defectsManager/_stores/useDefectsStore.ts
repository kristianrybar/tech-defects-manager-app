import { create } from 'zustand'
import { TDefect } from '../_types/TDefect'

type State = {
  defects: TDefect[]
  set_defects: (newDefects: TDefect[]) => void
}

export const useDefectsStore = create<State>((set) => ({
  defects: [],

  set_defects: (newDefects) => {
    set(() => ({ 
      defects: newDefects
    }))
  }
}))