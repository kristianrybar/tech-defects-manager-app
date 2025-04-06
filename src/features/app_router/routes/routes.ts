import DefectDetail from "~/defectDetail/DefectDetail"
import DefectsManager from "~/defectsManager/DefectsManager"
import InvestmentRequestsManager from "~/investmentRequestsManager/InvestmentRequestsManager"

const _techDefectsManagerRoute = {
  path: '/tech-defects-manager',
  title: 'Technické nedostatky',
  element: DefectsManager,
}

const _techDefectRoute = {
  path: (url_id?) => `/tech-defect/${url_id ? url_id : ':url_id'}`,
  title: '',
  element: DefectDetail,
}

const _investmentRequestsManagerRoute = {
  path: '/investment-requests-manager',
  title: 'Investičné požiadavky',
  element: InvestmentRequestsManager,
}

export const routes = {
  techDefect: _techDefectRoute,
  techDefectsManager: _techDefectsManagerRoute,
  investmentRequestsManager: _investmentRequestsManagerRoute,
}
