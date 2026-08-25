import { TDefect } from '../_types/TDefect'


export const isDefectChecked = (defectID: TDefect['defectID'], selectedDefects: TDefect[]) => {
  if (!defectID || !selectedDefects || !selectedDefects.length) {
    return false
  }   
  
  const checkedDefect = selectedDefects.find(d => d.defectID == defectID)
  if (!checkedDefect) {
    return false
  } 
      
  return true
}