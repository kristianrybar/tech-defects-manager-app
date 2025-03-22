import { TInvestmentRequest } from '~/investmentRequestsManager/_types/TInvestmentRequest'
import css from './InvestmentRequest.module.css'

type Props = {
  investmentRequest: TInvestmentRequest
}

const InvestmentRequest = (props: Props) => {
  const ir = props.investmentRequest

  return (
    <div className={css.investmentRequest}>
      {ir.investmentName} {ir.currentStateDescription}
    </div>
  )
}

export default InvestmentRequest