import { api } from '~/zzz_api/core/api'

type Params = {
    defectsIDs
    investmentRequestTypeIdentifier
    investmentName
    municipality
    expectedImplementationDate
    implementationDateJustification
    technicalJustificationCode
    planningGroup
    investmentReasonCode
    investmentReasonText
    estimatedInvestmentCosts
    proposedSolution
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

