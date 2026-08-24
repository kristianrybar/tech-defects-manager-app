import DefectDetail from "~/defectDetail/DefectDetail"
import DefectsManager from "~/defectsManager/DefectsManager"
import InvestmentRequestsManager from "~/investmentRequestsManager/InvestmentRequestsManager"


const _techDefectsRoute = {
  path: '/tech-defects',
  title: 'Technické nedostatky',
  element: DefectsManager,
}

const _techDefectRoute = {
  path: (url_id?: string) => `/tech-defect/${url_id ? url_id : ':url_id'}`,
  title: '',
  element: DefectDetail,
}

const _investmentRequestsRoute = {
  path: '/investment-requests-manager',
  title: 'Investičné požiadavky',
  element: InvestmentRequestsManager,
}

export const routes = {
  techDefect: _techDefectRoute,
  techDefects: _techDefectsRoute,
  investmentRequests: _investmentRequestsRoute,
}
