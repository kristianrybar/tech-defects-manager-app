import { useInvestmentRequestsStore } from './_stores/useInvestmentRequestsStore'
// import InvestmentRequests from './investmentRequests/InvestmentRequests'
import PageWrapper from '~/app_shared/pageWrapper/PageWrapper'
import css from './InvestmentRequestsManager.module.css'

const InvestmentRequestsManager = () => {
  const { investmentRequests } = useInvestmentRequestsStore()
  console.log(investmentRequests)

  return (
    <PageWrapper>
      <div className={css.investmentRequestsManagerContainer}>
        Na stránke sa pracuje. 
        {/* <InvestmentRequests investmentRequests={investmentRequests} /> */}
      </div>
    </PageWrapper>
  )
}

export default InvestmentRequestsManager