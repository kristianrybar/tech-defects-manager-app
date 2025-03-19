import { useState } from "react"
import { TDefect } from "../_types/TDefect"
import { TInvestmentRequestType } from "../../investmentsManager/_types/TInvestmentRequestType"
import { prepareEnumsForInvestmentForm } from "../_utils/prepareEnumsForInvestmentForm"
import { TInvestmentRequest } from "../../investmentsManager/_types/TInvestmentRequest"

const useFormEnums = () => {
  const [formEnums, set_formEnums] = useState({
    municipalities: [] as string[], 
    investmentRequestTypes: [] as TInvestmentRequestType[],
    technicalJustificationCodes: [] as string[],
    planningGroups: [] as string[],
    investmentReasonCodes: [] as string[],
  })

  const prepareFormEnums = (
    defects: TDefect[], 
    investmentRequests: TInvestmentRequest, 
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

  return {
    formEnums,
    prepareFormEnums
  }
}

export default useFormEnums