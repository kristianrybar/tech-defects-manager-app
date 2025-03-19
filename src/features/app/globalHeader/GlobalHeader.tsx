import { useLocation, useNavigate } from 'react-router-dom'
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
              ${location.pathname === '/tech-defects-manager' && css.active}
            `}
            onClick={() => navigate('/tech-defects-manager')}
          >
            Technické nedostatky
          </div>
          <span>|</span>
          <div
            onClick={() => navigate('/investment-requests-manager')}
            className={`
              ${location.pathname === '/investment-requests-manager' && css.active}
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