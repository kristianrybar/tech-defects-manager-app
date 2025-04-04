import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LayoutWrapper from '~/app_shared/layoutWrapper/LayoutWrapper'
import InitialLoadMockData from '~/app_shared/initialLoadMockData/InitialLoadMockData'
import GlobalHeader from '../globalHeader/GlobalHeader'
import DefectsManager from '~/defectsManager/DefectsManager'
import DefectDetail from '~/defectDetail/DefectDetail'
import InvestmentRequestsManager from '~/investmentRequestsManager/InvestmentRequestsManager'

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <InitialLoadMockData />

      <GlobalHeader />
      
      <LayoutWrapper> 
        <Routes>
          <Route path='/' element={<Navigate to='tech-defects-manager' />} />
          <Route path='/tech-defects-manager' element={<DefectsManager />} />
          <Route path='/tech-defect/:url_id' element={<DefectDetail />} />
          <Route path='/investment-requests-manager' element={<InvestmentRequestsManager />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  )
}

export default RouteSwitch