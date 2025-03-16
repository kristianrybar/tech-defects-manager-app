export type TInvestmentRequest = {
  investmentRequestID: string
  spiInvestmentID: string
  investmentRequestTypeIdentifier: string
  investmentName: string
  municipality: string
  expectedImplementationDate: Date
  technicalJustificationCode: string
  planningGroup: string
  implementationDateJustification: string
  estimatedInvestmentCosts: number
  processorID: string
  investmentReasonCode: string
  investmentReasonText: string
  currentStateDescription: string
  proposedSolution: string
  defectIDs: number[]
  investmentRequestStateIdentifier: string
}