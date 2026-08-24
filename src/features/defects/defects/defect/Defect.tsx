
import { TDefect } from '../../_types/TDefect'
import { FaArrowRightLong } from "react-icons/fa6"
import { highlightText } from './_utils/highlightText'
import UiInput from '~/app_shared/ui_input/UiInput'
import SeverityLevelCircle from '~/app_shared/severityLevelCircle/SeverityLevelCircle'
import css from './Defect.module.css'

type Props = {
  defect: TDefect
  onOpenDetail?: () => void
  onCheckbox?: (e) => void
  searchQuery?: string
  checked?: boolean
  hideCheckbox?: boolean
  hideArrowIcon?: boolean
}

const Defect = (props: Props) => {
  const d = props.defect

  return (
    <div
      className={`
          ${css.defect}
          ${(props.hideCheckbox || props.hideArrowIcon) && css.normalizeRow}
      `}
    >
      {!props.hideCheckbox &&
        <div>
          <UiInput
            wrapperClassName='p-3 cursor-pointer'
            type='checkbox'
            checked={props.checked}
            onChange={props.onCheckbox || (() => { })}
            value=''
          />
        </div>
      }
      <div>
        <div>
          {highlightText(d.defectID, props.searchQuery || '')}
        </div>
      </div>
      <div>
        <div>
          {highlightText(d.technicalObject.technicalObjectName, props.searchQuery || '')}&nbsp;
          {highlightText(`${d.technicalObject.constructionYear ? '(' + d.technicalObject.constructionYear?.toString() + ')' : ''}`, props.searchQuery || '')}
        </div>
        <div className={css._truncate}> 
          <SeverityLevelCircle
            severityLevel={d.defectType.defaultSeverityLevel}
            severityLevelSpan={highlightText(`${d.defectType.defaultSeverityLevel ? + d.defectType.defaultSeverityLevel : ''}`, props.searchQuery || '')}
          />&nbsp;
          <span title={d.defectType.defectTypeName || ""}>
            - {highlightText(d.defectType.defectTypeName, props.searchQuery || '')}
          </span>
        </div>
      </div>
      <div>
        <div>{highlightText(d.defectState, props.searchQuery || '')}</div>
      </div>
      <div>
        <div>{highlightText(d.isPersistent ? 'Pretrváva' : 'Nepretrváva', props.searchQuery || '')}</div>
      </div>
      <div>
        <div>{highlightText(d.technicalObject.isCrucial ? 'Áno' : d.technicalObject.isCrucial == false ? 'Nie' : 'Bez určenia', props.searchQuery || '')}</div>
      </div>
      <div>
        <div>{highlightText(d.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName, props.searchQuery || '')}</div>
        <div>{highlightText(d.technicalObject.supervisor, props.searchQuery || '')}</div>
      </div>
      <div>
        <div>{highlightText(d.technicalObject.municipality, props.searchQuery || '')}</div>
        <div>{highlightText(d.createdDTime.toString().replace('T', ',\u00A0'), props.searchQuery || '')}</div>
      </div>
      {!props.hideArrowIcon &&
        <div
          className={css.arrowRight}
          onClick={props.onOpenDetail}
        >
          <FaArrowRightLong />
        </div>
      }
    </div>
  )
}

export default Defect