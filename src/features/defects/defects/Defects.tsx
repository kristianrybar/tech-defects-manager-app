import { TDefect } from '../_types/TDefect'
import DefectItem from './defectItem/DefectItem'
import Map from '~/app_shared/map/Map'
import css from './Defects.module.css'


type Props = {
  listMode: 'table' | 'map'
  filteredDefects: TDefect[]
  searchQuery: string
  onOpenDetail: (defectID:string) => void
  onSelectDefect: (defect: TDefect, isChecked: boolean) => void
  isDefectChecked: (defectID: string) => boolean
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
                <DefectItem
                  key={d.defectID}
                  defect={d}
                  onOpenDetail={() => props.onOpenDetail(d.defectID)}
                  onCheckbox={(e) => props.onSelectDefect(e.target.checked, d)}
                  searchQuery={props.searchQuery}
                  checked={props.isDefectChecked(d.defectID)}
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
            defects={props.filteredDefects.filter(d => d.defectTypeIdentifier > '0')}
            onSelectDefect={(e, d: TDefect) => props.onSelectDefect(d, e.target.checked)}
            isDefectChecked={(defectID) => props.isDefectChecked(defectID)}
          />
        </div>
      }
    </div>
  )
}

export default Defects