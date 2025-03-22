import InvestmentRequests from './investmentRequests/InvestmentRequests'
import css from './InvestmentRequestsManager.module.css'

const InvestmentRequestsManager = () => {
  return (
    <div className={css.investmentRequestsManagerContainer}>
      Na stránke sa pracuje. 
      <InvestmentRequests />
    </div>
  )
}

export default InvestmentRequestsManager