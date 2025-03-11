import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LayoutWrapper from '~/app_shared/layoutWrapper/LayoutWrapper'
import DefectsManager from '~/defectsManager/DefectsManager'
import GlobalHeader from '../globalHeader/GlobalHeader'

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <GlobalHeader />
      
      <LayoutWrapper> 
        <Routes>
          <Route path='/' element={<Navigate to='tech-defects-manager' />} />
          <Route path='/tech-defects-manager' element={<DefectsManager />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  )
}

export default RouteSwitch