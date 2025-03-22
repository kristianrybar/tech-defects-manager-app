import { useInvestmentRequestsStore } from '../_stores/useInvestmentRequestsStore'
import InvestmentRequest from './investmentRequest/InvestmentRequest'
import css from './InvestmentRequests.module.css'


const InvestmentRequests = () => {
  const { investmentRequests } = useInvestmentRequestsStore()
  console.log(investmentRequests)
  
  return (
    <>
      {investmentRequests.length > 0 && 
        <div>
          Investments
          {
            investmentRequests.map((investmentRequest) => 
              <InvestmentRequest
                key={investmentRequest.investmentRequestID}
                investmentRequest={investmentRequest}
              />
            ) 
          }
        </div>
      }
    </>
  )
}

export default InvestmentRequests