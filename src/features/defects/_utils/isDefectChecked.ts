export const isDefectChecked = (defectID, selectedDefects) => {
  if (!defectID || !selectedDefects || !selectedDefects.length) {
    return false
  }   
  
  const checkedDefect = selectedDefects.find(d => d.defectID == defectID)
  if (!checkedDefect) {
    return false
  } 
      
  return true
}