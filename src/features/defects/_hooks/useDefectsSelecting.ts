import { useState } from "react"
import { TDefect } from "../_types/TDefect"


const useDefectsSelecting = () => {
  const [selectedDefects, set_selectedDefects] = useState<TDefect[]>([])
  
  const selectDefect = (defect: TDefect) => {
    if (!defect) {
      return
    }
    set_selectedDefects(prev => ([...prev, defect]))
  }

  const deselectDefect = (defectID: string) => {
    if (!defectID) {
      return
    }
    set_selectedDefects(prev => prev.filter(defect => defect.defectID != defectID))
  }

  return {
    selectedDefects,
    selectDefect,
    deselectDefect,
  }
}

export default useDefectsSelecting