import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes/routes'
import LayoutWrapper from '~/app_shared/layoutWrapper/LayoutWrapper'
import InitialLoadMockData from '~/app_shared/initialLoadMockData/InitialLoadMockData'
import GlobalHeader from '~/app/globalHeader/GlobalHeader'


const DefectsManagerPage = routes.techDefects.element
const DefectDetailPage = routes.techDefect.element
const InvestmentRequestsManagerPage = routes.investmentRequests.element

const RouteSwitch = () => {
  
  return (
    <BrowserRouter>
      <InitialLoadMockData />

      <GlobalHeader />
      
      <LayoutWrapper> 
        <Routes>
          <Route path='/' element={<Navigate to={routes.techDefects.path} />} />

          <Route path={routes.techDefects.path} element={<DefectsManagerPage />} />
          <Route path={routes.techDefect.path} element={<DefectDetailPage />} />
          <Route path={routes.investmentRequests.path} element={<InvestmentRequestsManagerPage />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  )
}

export default RouteSwitch