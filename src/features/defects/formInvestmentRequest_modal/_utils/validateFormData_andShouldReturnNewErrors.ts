import { defaultFormData } from "./defaultFormData"


export const validateFormData_andShouldReturnNewErrors = (formData: typeof defaultFormData) => {
    if (!formData) {
        return { error: 'Form data not provided' }
    }

    const errorMessage = 'This field is required'
    const newErrors = {
        investmentRequestTypeIdentifier: formData.investmentRequestTypeIdentifier ? '' : errorMessage,
        investmentName: formData.investmentName ? '' : errorMessage,
        municipality: formData.municipality ? '' : errorMessage,
        expectedImplementationDate: formData.expectedImplementationDate ? '' : errorMessage,
        implementationDateJustification: formData.implementationDateJustification ? '' : errorMessage,
        technicalJustificationCode: formData.technicalJustificationCode ? '' : errorMessage,
        planningGroup: formData.planningGroup ? '' : errorMessage,
        investmentReasonCode: formData.investmentReasonCode ? '' : errorMessage,
        investmentReasonText: formData.investmentReasonText ? '' : errorMessage,
        estimatedInvestmentCosts: formData.estimatedInvestmentCosts > 0 ? '' : 'Investment costs must be greater than 0',
        proposedSolution: formData.proposedSolution ? '' : errorMessage,
        defectsIDs: formData.defectsIDs.length > 0 ? '' : 'At least one defect ID must be provided'
    }
    
    const areFormDataOk = Object.values(newErrors).every((error) => error == '')
    if (!areFormDataOk) {
        return {
            error: 'Error occured',
            newErrors: newErrors,
        }
    }

    return { newErrors: newErrors }
}