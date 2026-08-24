import { TDefect } from "~/defects/_types/TDefect"
import { TFilter } from "~/defects/filterControlSideBar/_types/TFilter"


export const filterByMunicipality = (defect: TDefect, filter: TFilter | undefined) => {
    if (!defect || !filter) {
       return true 
    }
        
    const activeOptions = filter.filterOptions.filter(option => option.isActive)
    if (!activeOptions.length) {
        return true 
    }
    if (activeOptions.length == filter.filterOptions.length) {
        return defect.technicalObject.municipality
    }
        
    return activeOptions.some(option => option.name == defect.technicalObject.municipality)
}