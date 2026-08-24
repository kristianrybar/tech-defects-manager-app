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
            Tech Defects Manager
          </h1>
        </div>
        <div className={css.pageLinks}>
          <div
            className={`
              ${location.pathname === routes.techDefects.path && css.active}
            `}
            onClick={() => navigate(routes.techDefects.path)}
          >
            Technické nedostatky
          </div>
          <span>|</span>
          <div
            onClick={() => navigate(routes.investmentRequests.path)}
            className={`
              ${location.pathname === routes.investmentRequests.path && css.active}
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