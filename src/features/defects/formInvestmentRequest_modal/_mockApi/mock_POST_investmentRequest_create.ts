import { api } from '~/zzz_api/core/api'


type Params = {
    defectsIDs: string[]
    investmentRequestTypeIdentifier: string
    investmentName: string
    municipality: string
    expectedImplementationDate: string
    implementationDateJustification: string
    technicalJustificationCode: string
    planningGroup: string
    investmentReasonCode: string
    investmentReasonText: string
    estimatedInvestmentCosts: number
    proposedSolution: string
}

export const mock_POST_investmentRequest_create = (p: Params) => {
    return api.post_m('/api/investmentRequest/create', {
        defectsIDs: p.defectsIDs,
        investmentRequestTypeIdentifier: p.investmentRequestTypeIdentifier,
        investmentName: p.investmentName,
        municipality: p.municipality,
        expectedImplementationDate: p.expectedImplementationDate,
        implementationDateJustification: p.implementationDateJustification,
        technicalJustificationCode: p.technicalJustificationCode,
        planningGroup: p.planningGroup,
        investmentReasonCode: p.investmentReasonCode,
        investmentReasonText: p.investmentReasonText,
        estimatedInvestmentCosts: p.estimatedInvestmentCosts,
        proposedSolution: p.proposedSolution,
    })
}

