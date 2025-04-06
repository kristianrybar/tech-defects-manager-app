import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from '~/app_router/routes/routes'
import css from './GlobalHeader.module.css'

const GlobalHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <div className={css.globalHeaderWrapper}>
      <div className={css.container}>
        <div className={css.brand}>
          <h1> 
            <span >Tech Defects Manager</span>
            <span >Tech Defects Manager</span>
          </h1>
        </div>
        <div className={css.pageLinks}>
          <div
            className={`
              ${location.pathname === routes.techDefectsManager.path && css.active}
            `}
            onClick={() => navigate(routes.techDefectsManager.path)}
          >
            Technické nedostatky
          </div>
          <span>|</span>
          <div
            onClick={() => navigate(routes.investmentRequestsManager.path)}
            className={`
              ${location.pathname === routes.investmentRequestsManager.path && css.active}
            `}
          >
            Investičné požiadavky
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalHeader