import { useEffect, useState } from 'react'
import { TDefect } from '../_types/TDefect'
import { TInvestmentRequestType } from '../../investmentRequests/_types/TInvestmentRequestType'
import { prepareEnumsForInvestmentForm } from '../_utils/prepareEnumsForInvestmentForm'
import { TInvestmentRequest } from '../../investmentRequests/_types/TInvestmentRequest'
import { useDefectsStore } from '../_stores/useDefectsStore'
import { useInvestmentRequestsStore } from '~/investmentRequests/_stores/useInvestmentRequestsStore'


const useFormEnums = () => {
  const { defects } = useDefectsStore()
  const { investmentRequests, investmentRequestsTypes } = useInvestmentRequestsStore()

  const [formEnums, set_formEnums] = useState({
    municipalities: [] as string[], 
    investmentRequestTypes: [] as TInvestmentRequestType[],
    technicalJustificationCodes: [] as string[],
    planningGroups: [] as string[],
    investmentReasonCodes: [] as string[],
  })

  const prepareFormEnums = (
    defects: TDefect[], 
    investmentRequests: TInvestmentRequest[], 
    investmentRequestTypes: TInvestmentRequestType[]
  ) => {    
    const enums = prepareEnumsForInvestmentForm(defects, investmentRequests)
    if (!enums) {
      return
    }
    
    set_formEnums(prev => ({
      ...prev,
      investmentRequestTypes: investmentRequestTypes,
      technicalJustificationCodes: enums.technicalJustificationCodes,
      investmentReasonCodes: enums.investmentReasonCodes,
      municipalities: enums.municipalities,
      planningGroups: enums.planningGroups,
    }))
  }

  useEffect(() => {
    console.log('useFormEnums useEffect')
    if (!defects.length || !investmentRequests.length || !investmentRequestsTypes.length) {
      return
    }
    prepareFormEnums(defects, investmentRequests, investmentRequestsTypes)
  }, [defects, investmentRequests, investmentRequestsTypes])

  return {
    formEnums,
    prepareFormEnums
  }
}

export default useFormEnums