import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { TDefect } from '~/defects/_types/TDefect'
import { useDefectsStore } from '~/defects/_stores/useDefectsStore'
import { useSelectedDefectsStore } from '~/defects/_stores/useSelectedDefectsStore'
import { isDefectChecked } from '~/defects/_utils/isDefectChecked'
import { routes } from '~/app_router/routes/routes'
import PageWrapper from '~/app_shared/pageWrapper/PageWrapper'
import Map from '~/app_shared/map/Map'
import css from './DefectDetail.module.css'


const DefectDetailPage = () => {
  const selectedDefects = useSelectedDefectsStore(s => s.selectedDefects)
  const selectDefect = useSelectedDefectsStore(s => s.selectDefect)
  const deselectDefect = useSelectedDefectsStore(s => s.deselectDefect)
   
  const { defects } = useDefectsStore()
  const [findedDefect, set_findedDefect] = useState<TDefect>()
  const { url_id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!url_id || !defects) {
      return
    }
    const _findedDefect = defects.find(d => d.defectID == url_id)
    if (!_findedDefect) {
      return
    }
    set_findedDefect(_findedDefect)
  }, [url_id, defects])
  
  const d = findedDefect

  return (
    <PageWrapper>
      <div className={css.defectDetail}>
        <div className={css.header}>
          <div 
            className={css.goBack}
            onClick={() => navigate(routes.techDefects.path)}
          >
            <FaArrowLeftLong />
            <span>Späť</span>
          </div>
          <div className={css.title}>
            Nedostatok - podrobnosti
          </div>
        </div>
        {!d
          ? <div>Defect not found. Something very wrong.</div>
          : <div className={css.content}>
            <div className={css.defectInfo}>
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
                isDefectChecked={(defectID) => isDefectChecked(defectID, selectedDefects)}
                onSelectDefect={(e, d) => {
                  const isChecked = e.target.checked
                  if (isChecked) {
                    selectDefect(d)
                  } else {
                    deselectDefect(d.defectID)
                  }
                }}
              />
            </div>
          </div>
        }
      </div>
    </PageWrapper>
  )
}

export default DefectDetailPage
