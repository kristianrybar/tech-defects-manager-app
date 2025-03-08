import { filterByConstructionYear } from '../_utils/filterByConstructionYear'
import { filterByCruciality } from '../_utils/filterByCruciality'
import { filterByDateRange } from '../_utils/filterByDateRange'
import { filterByDefectState } from '../_utils/filterByDefectState'
import { filterByMunicipality } from '../_utils/filterByMunicipality'
import { filterByPersistenceStatus } from '../_utils/filterByPersistenceStatus'
import { filterBySearchQuery } from '../_utils/filterBySearchQuery'
import { filterBySeverityLevel } from '../_utils/filterBySeverityLevel'
import { filterBySupervisor } from '../_utils/filterBySupervisor'
import { filterByVoltageLevel } from '../_utils/filterByVoltageLevel'
import { sortByDate } from '../_utils/sortByDate'

const useDefectsFiltering = (filters) => {

  const filterDefects = (defects, dropdownQuery, searchQuery, dateFilter) => {
    const filteredDefects = defects
      .sort((a, b) => sortByDate(a, b, dropdownQuery))
      .filter(defect => filterByDateRange(dateFilter, defect.createdDTime))
      .filter(defect => filterBySearchQuery(defect, searchQuery))
      .filter(defect => filterByPersistenceStatus(defect, _findAndReturnFilterByName('Pretrvávanie nedostatku')))
      .filter(defect => filterBySeverityLevel(defect, _findAndReturnFilterByName('Úroveň závažnosti')))
      .filter(defect => filterByVoltageLevel(defect, _findAndReturnFilterByName('Úroveň napätia')))
      .filter(defect => filterByConstructionYear(defect, _findAndReturnFilterByName('Rok výstavby')))
      .filter(defect => filterByCruciality(defect, _findAndReturnFilterByName('Významný technický objekt')))
      .filter(defect => filterBySupervisor(defect, _findAndReturnFilterByName('Zodpovedná osoba')))
      .filter(defect => filterByMunicipality(defect, _findAndReturnFilterByName('Obec')))
      .filter(defect => filterByDefectState(defect, _findAndReturnFilterByName('Stav nedostatku')))

      return filteredDefects
  }

  const _findAndReturnFilterByName = (filterName) => {
    return filters.find(f => f.filterName == filterName)
  }
  
  return {
    filterDefects
  }
}

export default useDefectsFiltering