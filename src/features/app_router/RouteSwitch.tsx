import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LayoutWrapper from '~/app_shared/layoutWrapper/LayoutWrapper'
import InitialLoadMockData from '~/app_shared/initialLoadMockData/InitialLoadMockData'
import GlobalHeader from '~/app/globalHeader/GlobalHeader'
import { routes } from './routes/routes'

const DefectsManagerPage = routes.techDefectsManager.element
const DefectDetailPage = routes.techDefect.element
const InvestmentRequestsManagerPage = routes.investmentRequestsManager.element

const RouteSwitch = () => {
  
  return (
    <BrowserRouter>
      <InitialLoadMockData />

      <GlobalHeader />
      
      <LayoutWrapper> 
        <Routes>
          <Route path='/' element={<Navigate to={routes.techDefectsManager.path} />} />

          <Route path={routes.techDefectsManager.path} element={<DefectsManagerPage />} />
          <Route path={routes.techDefect.path()} element={<DefectDetailPage />} />
          <Route path={routes.investmentRequestsManager.path} element={<InvestmentRequestsManagerPage />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  )
}

export default RouteSwitch