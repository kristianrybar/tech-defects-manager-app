import { mock_POST_investmentRequest_create } from '../_mockApi/mock_POST_investmentRequest_create'


const useInvestmentRequestCreating = () => {

    const createInvestmentRequest = async (formData) => {
        const resp = await mock_POST_investmentRequest_create({
            defectsIDs: formData.defectsIDs,
            investmentRequestTypeIdentifier: formData.investmentRequestTypeIdentifier,
            investmentName: formData.investmentName,
            municipality: formData.municipality,
            expectedImplementationDate: formData.expectedImplementationDate,
            implementationDateJustification: formData.implementationDateJustification,
            technicalJustificationCode: formData.technicalJustificationCode,
            planningGroup: formData.planningGroup,
            investmentReasonCode: formData.investmentReasonCode,
            investmentReasonText: formData.investmentReasonText,
            estimatedInvestmentCosts: formData.estimatedInvestmentCosts,
            proposedSolution: formData.proposedSolution,
        })
        if (resp.error) {
            return resp
        }
        
        return resp
    }

    return {
        createInvestmentRequest
    }
}

export default useInvestmentRequestCreating