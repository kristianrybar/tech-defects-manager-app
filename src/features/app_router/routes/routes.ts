import DefectDetailPage from "~/defectDetail/DefectDetailPage"
import DefectsPage from "~/defects/DefectsPage"
import InvestmentRequestsPage from "~/investmentRequests/InvestmentRequestsPage"


const _techDefectsRoute = {
  path: '/tech-defects',
  title: 'Technické nedostatky',
  element: DefectsPage,
}

const _techDefectRoute = {
  path: '/tech-defect/:defect_id',
  createPath: (defect_id: string) => `/tech-defect/${defect_id}`,
  title: '',
  element: DefectDetailPage,
}

const _investmentRequestsRoute = {
  path: '/investment-requests-manager',
  title: 'Investičné požiadavky',
  element: InvestmentRequestsPage,
}

export const routes = {
  techDefect: _techDefectRoute,
  techDefects: _techDefectsRoute,
  investmentRequests: _investmentRequestsRoute,
}
