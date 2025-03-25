import { useInvestmentRequestsStore } from './_stores/useInvestmentRequestsStore'
// import InvestmentRequests from './investmentRequests/InvestmentRequests'
import css from './InvestmentRequestsManager.module.css'

const InvestmentRequestsManager = () => {
  const { investmentRequests } = useInvestmentRequestsStore()
  console.log(investmentRequests)

  return (
    <div className={css.investmentRequestsManagerContainer}>
      Na stránke sa pracuje. 
      {/* <InvestmentRequests investmentRequests={investmentRequests} /> */}
    </div>
  )
}

export default InvestmentRequestsManager