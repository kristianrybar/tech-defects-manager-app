import { TDefect } from '../_types/TDefect'
import { TFilter } from '../_types/TFilter'
import { TFilterOption } from '../filterControlSideBar/_types/TFilterOption'

export const createInitialFilters = (defects: TDefect[]) => {
  const filters: TFilter[] = [
    {
      filterName: 'Rok výstavby',
      filterOptions: [] as TFilterOption[]
    },
    {
      filterName: 'Zodpovedná osoba',
      filterOptions: [] as TFilterOption[]
    },
    {
      filterName: 'Obec',
      filterOptions: [] as TFilterOption[]
    },
    {
      filterName: 'Stav nedostatku',
      filterOptions: [] as TFilterOption[]
    },
  ]
  
  // cruciality
  filters.push(_getCountByCruciality_andCreateOptions(defects))
  // voltage level
  filters.unshift(_getCountByVoltageLevel_andCreateOptions(defects))
  // severity level
  filters.unshift(_getCountBySeverityLevel_andCreateOptions(defects))
  // persistence
  filters.unshift(_getCountByPersistence_andCreateOptions(defects))
  
  defects.forEach(d => {
    // construction year
    _createFilterOptions(filters, 'Rok výstavby', d.technicalObject.constructionYear, defects, 'constructionYear')
    filters.find(f => f.filterName == 'Rok výstavby')?.filterOptions.sort((a: any, b: any) => b.name - a.name) // construction year - sort zostupne podla roka

    // supervisor
    _createFilterOptions(filters, 'Zodpovedná osoba', d.technicalObject.supervisor, defects, 'supervisor')

    // municapility
    _createFilterOptions(filters, 'Obec', d.technicalObject.municipality, defects, 'municipality')

    // defect state
    _createFilterOptions(filters, 'Stav nedostatku', d.defectState, defects, 'defectsState')
  })

  return filters
}


const _findObjectWithSameValue = (array, filterName, comparisonValue) => {
  if (!array || !array.length) {
    return
  }
  if (!comparisonValue || !filterName) {
    return
  } 
  
  const findedFilter = array.find(obj => obj.filterName == filterName)
  if (!findedFilter) {
    return
  }

  const objectWithSameValue = findedFilter.filterOptions.find(obj => obj.name == comparisonValue)
  if (!objectWithSameValue) {
    return
  }
  
  return objectWithSameValue
}

const _getCountByPersistence_andCreateOptions = (defects) => {
  return {
    filterName: 'Pretrvávanie nedostatku',
    filterOptions:[
      {
        name: 'Pretrváva',
        isActive: false,
        countDefects: defects.filter(defect => defect.isPersistent).length
      },
      {
        name: 'Nepretrváva',
        isActive: false,
        countDefects: defects.filter(defect => !defect.isPersistent).length
      }
    ],
  }
}

const _getCountBySeverityLevel_andCreateOptions = (defects) => {
  return {
    filterName: 'Úroveň závažnosti',
    filterOptions: [
      {
        name: '1',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '1').length
      },
      {
        name: '2',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '2').length
      },
      {
        name: '3',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '3').length
      },
      {
        name: '4',
        isActive: false,
        countDefects: defects.filter(defect => defect.defectType.defaultSeverityLevel == '4').length
      },
    ]
  }
}

const _getCountByVoltageLevel_andCreateOptions = (defects) => {
  return  {
    filterName: 'Úroveň napätia',
    filterOptions: [
      {
        name: 'NN Vedenia',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'NN').length
      },
      {
        name: 'VN Vedenia',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'VN').length
      },
      {
        name: 'VVN Vedenia',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'VVN').length
      },
      {
        name: 'Trafostanice',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'TS').length
      },
      {
        name: 'Elektrické stanice',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelIdentifier == 'EST').length
      },
    ]
  } 
}

const _getCountByCruciality_andCreateOptions = (defects) => {
  return{
    filterName: 'Významný technický objekt',
    filterOptions: [
      {
        name: 'Áno',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.isCrucial).length
      },
      {
        name: 'Nie',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.isCrucial == false).length
      },
      {
        name: 'Bez určenia',
        isActive: false,
        countDefects: defects.filter(defect => defect.technicalObject.isCrucial == null).length
      },
    ]
  }
}

const _createFilterOptions = (filters, filterName, value, defects, comparisonKey) => {
  if (!value || !filterName || !comparisonKey) {
    return
  }
  if (!filters.length || !defects.length) {
    return
  } 

  const objectWithSameValue = _findObjectWithSameValue(filters, filterName, value)
  if (objectWithSameValue) {
    return
  } 

  const countDefects = defects.filter(def => def.technicalObject[comparisonKey] == value).length
  const filterOption = {
    name: value,
    isActive: false,
    countDefects: countDefects,
  }

  const targetFilter = filters.find(f => f.filterName == filterName)
  if (!targetFilter) {
    return
  }
  
  targetFilter.filterOptions.push(filterOption)
}
