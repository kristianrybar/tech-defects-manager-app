import { TDefect } from '../_types/TDefect'

export const prepareEnumsForInvestmentForm = (defects: TDefect[], investmentRequests) => {
    if (!defects.length || !investmentRequests.length) {
        return
    }
    console.log(investmentRequests)
    const municipalities: string[] = _findUniqueValues(defects, 'technicalObject.municipality') as string[]
    if (!municipalities) {
        return
    }
    
    const investmentReasonCodes: string[] = _findUniqueValues(investmentRequests, 'investmentReasonCode') as string[]
    if (!investmentReasonCodes) {
        return
    }

    const planningGroups: string[] = _findUniqueValues(investmentRequests, 'planningGroup') as string[]
    if (!planningGroups) {
        return
    }
    
    const technicalJustificationCodes = _findUniqueValues(investmentRequests, 'technicalJustificationCode') as string[]
    if (!technicalJustificationCodes) {
        return
    }

    return {
        municipalities,
        investmentReasonCodes,
        planningGroups,
        technicalJustificationCodes
    }
}

export const _findUniqueValues = (array, key) => {
    if (!array.length || !key) {
        return []
    }

    const arrayAllValues = array.map(item => _getNestedValue(item, key))
    if (!arrayAllValues.length) {
        return []
    }
    
    const uniqueArrayValues = [...new Set(arrayAllValues.filter(item => item))]
    if (!uniqueArrayValues.length) {
        return []
    }

    return uniqueArrayValues
}

const _getNestedValue = (obj, path) => {
    if (!path.includes('.')) {
        return obj[path]
    }
    
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

