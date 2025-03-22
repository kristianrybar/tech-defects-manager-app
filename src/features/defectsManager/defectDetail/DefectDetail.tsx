import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { TDefect } from '../_types/TDefect'
import Map from '~/app_shared/map/Map'
import css from './DefectDetail.module.css'

type Props = {
  onGoBack: () => void
  defects: TDefect[]
  isDefectChecked: (d) => boolean
  onSelectDefect: (checked, d: TDefect) => void
}

const DefectDetail = (props: Props) => {
  const [findedDefect, set_findedDefect] = useState<TDefect>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    console.log('TODO: DefectDetail useEffect - skontrolovať tento useEffect');
    const defectId = searchParams.get('defectId')
    if (!defectId) {
      return
    }
    if (!props.defects.length) {
      return
    }
    
    const _findedDefect = props.defects.find(d => d.defectID == defectId)
    if (!_findedDefect) {
      return
    } 
    
    set_findedDefect(_findedDefect)
  }, [])
  
  const d = findedDefect
  return (
    <div className={css.defectDetail}>
      <div className={css.header}>
        <div className={css.title}>
          Nedostatok - podrobnosti
        </div>
        <div 
          className={css.goBack}
          onClick={props.onGoBack}
        >
          <FaArrowLeftLong />
          <span>Späť</span>
        </div>
      </div>
      {!d
        ? <div>Defect not found. Something very wrong.</div>
        : <>
          <div className={css.content}>
            <div>
              <h3>Nedostatok</h3>
              <div>ID: {d.defectID}</div>
              <div>Stav: {d.defectState}</div>
              <div>Vytvorený: {d.createdDTime.toString().replace('T', ', ')}</div>
              <div>Popis: {d.description || 'Bez popisu'}</div>
              <div>Pretrvávanie nedostatku: {d.isPersistent ? 'Pretrváva' : 'Nepretrváva'}</div>
            </div>

            <div>
              <h3>Typ nedostatku</h3>
              <div>Identifikátor: {d.defectType.defectTypeIdentifier}</div>
              <div>Názov: {d.defectType.defectTypeName}</div>
              <div>Úroveň závažnosti: {d.defectType.defaultSeverityLevel}</div>
            </div>

            <div>
              <h3>Technický objekt</h3>
              <div>ID: {d.technicalObject.technicalObjectID}</div>
              <div>Názov: {d.technicalObject.technicalObjectName}</div>
              <div>Rok výstavby: {d.technicalObject.constructionYear}</div>
              <div>Významný technický objekt: {d.technicalObject.isCrucial ? 'Áno' : d && d.technicalObject.isCrucial == null ? 'Bez určenia' : 'Nie'}</div>
              <div>Zodpovedná osoba: {d.technicalObject.supervisor}</div>
              <div>Obec: {d.technicalObject.municipality}</div>
            </div>

            <div>
              <h3>Typ tech. objektu</h3>
              <div>Identifikátor: {d.technicalObject.technicalObjectType?.technicalObjectTypeIdentifier}</div>
              <div>Názov: {d.technicalObject.technicalObjectType?.technicalObjectTypeName}</div>
              <div>Úroveň napätia: {d.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName}</div>
            </div>
          </div>

          <div className={css.map}>
            <Map
              zoom={14}
              defects={[findedDefect]}
              isDefectChecked={(defectID) => props.isDefectChecked(defectID)}
              onCheckbox={(e, d: TDefect) => props.onSelectDefect(e.target.checked, d)}
            />
          </div>
        </>
      }

    </div>
  )
}

export default DefectDetail
