import { TDefect } from '../_types/TDefect'
import Defect from './defect/Defect'
import Map from '~/app_shared/map/Map'
import css from './Defects.module.css'

type Props = {
  listMode: 'table' | 'map'
  filteredDefects: TDefect[]
  searchQuery: string
  onOpenDetail: (defectID) => void
  onSelectDefect: (defect, isChecked) => void
  isDefectchecked: (defectID) => boolean
}

const Defects = (props: Props) => {
  return (
    <div className={css.defects}>
      {props.listMode == 'table' &&
        <div className={css.defectsList}>
          {props.filteredDefects.length
            ? <>
              <div className={css.labels}>
                <div></div>
                <div>ID</div>
                <div>tech. objekt (rok výstavby)<hr />úroveň závažnosti - typ nedostatku</div>
                <div>stav nedostatku</div>
                <div>pretrvávanie nedostatku</div>
                <div>významný tech. objekt</div>
                <div>úroveň napätia<hr className='!max-w-[117px]' />zodpovedná osoba</div>
                <div>obec<hr className='!max-w-[112px]' />dátum vytvorenia</div>
                <div></div>
              </div>

              {props.filteredDefects.map(d =>
                <Defect
                  key={d.defectID}
                  defect={d}
                  onOpenDetail={() => props.onOpenDetail(d.defectID)}
                  onCheckbox={(e) => props.onSelectDefect(e.target.checked, d)}
                  searchQuery={props.searchQuery}
                  checked={props.isDefectchecked(d.defectID)}
                />
              )}
            </>
            : <div className={css.noDefects}>Žiadne výsledky</div>
          }
        </div>
      }
      {props.listMode == 'map' &&
        <div className={css.defectsMap}>
          <Map
            zoom={14}
            defects={props.filteredDefects.filter(d => d.defectTypeIdentifier > '0')}
            onCheckbox={(e, d: TDefect) => props.onSelectDefect(e.target.checked, d)}
            checked={(defectID) => props.isDefectchecked(defectID)}
          />
        </div>
      }
    </div>
  )
}

export default Defects