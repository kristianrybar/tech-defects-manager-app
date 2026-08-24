import { TInvestmentRequest } from '~/investmentRequests/_types/TInvestmentRequest'
import css from './InvestmentRequest.module.css'

type Props = {
  investmentRequest: TInvestmentRequest
}

const InvestmentRequestItem = (props: Props) => {
  const ir = props.investmentRequest

  return (
    <div className={css.investmentRequest}>
      {ir.investmentName} {ir.currentStateDescription}
    </div>
  )
}

export default InvestmentRequestItem