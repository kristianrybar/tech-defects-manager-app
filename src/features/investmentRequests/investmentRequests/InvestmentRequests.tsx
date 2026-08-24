import { TInvestmentRequest } from '../_types/TInvestmentRequest'
import InvestmentRequestItem from './investmentRequestItem/InvestmentRequestItem'
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
              <InvestmentRequestItem
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