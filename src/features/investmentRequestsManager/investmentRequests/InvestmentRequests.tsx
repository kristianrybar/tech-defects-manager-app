import { TInvestmentRequest } from '../_types/TInvestmentRequest'
import InvestmentRequest from './investmentRequest/InvestmentRequest'
// import css from './InvestmentRequests.module.css'

type Props = {
  investmentRequests: TInvestmentRequest[]
}

const InvestmentRequests = (props: Props) => {
  return (
    <>
      {props.investmentRequests.length > 0 && 
        <div>
          Investments
          {
            props.investmentRequests.map((investmentRequest) => 
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