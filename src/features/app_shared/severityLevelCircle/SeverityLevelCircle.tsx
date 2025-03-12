import { ReactNode } from 'react'
import css from './SeverityLevelCircle.module.css'

type Props = {
  severityLevel: string
  severityLevelSpan?: ReactNode
}

const SeverityLevelCircle = (props: Props) => {

  const returnSeverityLevelAsWord = () => {
    if (props.severityLevel == "1") return "one"
    if (props.severityLevel == "2") return "two"
    if (props.severityLevel == "3") return "three"
    if (props.severityLevel == "4") return "four"
    return "error"
  }

  return (
    <div className={css.severityLevelCircle}>
      <div className={css[returnSeverityLevelAsWord()]}>
        {props.severityLevelSpan || props.severityLevel || ""}
      </div>
    </div>
  )
}

export default SeverityLevelCircle