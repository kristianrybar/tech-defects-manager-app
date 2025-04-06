import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sleep } from '~/zzz_react/sleep/sleep'
import { turnOffAllFilters } from './_utils/turnOffAllFilters'
import { toggleOffOnFilterOption } from './_utils/toggleOffOnFilterOption'
import { updateFiltersOptionsCountDefects } from './_utils/updateFiltersOptionsCountDefects'
import { isDefectChecked } from './_utils/isDefectChecked'
import { useDefectsStore } from './_stores/useDefectsStore'
import { usePreventBodyScroll } from '~/zzz_react/preventBodyScroll/usePreventBodyScroll'
import { useSelectedDefectsStore } from './_stores/useSelectedDefectsStore'
import useFormEnums from './_hooks/useFormEnums'
import useDefectsFiltering from './defects/_hooks/useDefectsFiltering'
import useFilterControlBar from './filterControlBar/_hooks/useFilterControlBar'
import useFilters from './_hooks/useFilters'
import FormInvestmentRequest_modal from './formInvestmentRequest_modal/FormInvestmentRequest_modal'
import FilterControlSideBar from './filterControlSideBar/FilterControlSideBar.module'
import Defects from './defects/Defects'
import DisplayControlBar from './displayControlBar/DisplayControlBar'
import FilterControlBar from './filterControlBar/FilterControlBar'
import PageWrapper from '~/app_shared/pageWrapper/PageWrapper'
import css from './DefectsManager.module.css'
import { routes } from '~/app_router/routes/routes'


const DefectsManager = () => {
  const selectedDefects = useSelectedDefectsStore(s => s.selectedDefects)
  const selectDefect = useSelectedDefectsStore(s => s.selectDefect)
  const deselectDefect = useSelectedDefectsStore(s => s.deselectDefect) 

  const [listMode, set_listMode] = useState<'table' | 'map'>('table')

  const [isOpenFormModal, set_isOpenFormModal] = useState<boolean>(false)
  const { defects } = useDefectsStore()
  
  const { searchQuery, set_searchQuery, dropdownQuery,
    set_dropdownQuery, dateQuery, selectDateQuery_withValidation } = useFilterControlBar()

  const { formEnums } = useFormEnums()
  const { filters, set_filters } = useFilters(defects)
  const { filteredDefects } = useDefectsFiltering(defects, filters, searchQuery, dropdownQuery, dateQuery)

  // iba navrh const { filteredDefects, filters, set_filters } = useFiltration()

  const navigate = useNavigate()

  usePreventBodyScroll(isOpenFormModal)

  useEffect(() => {
    if (!filteredDefects || !filteredDefects.length) {
      return
    }
    set_filters(updateFiltersOptionsCountDefects(filteredDefects))
  }, [filteredDefects])
  
  return (
    <>
      <PageWrapper>
          {defects.length > 0 &&
            <>
              <div className={css.filterControlSideBarWrapper}>
                <FilterControlSideBar
                  filters={filters}
                  onCheckbox={(optionIndex, filterName) => set_filters(toggleOffOnFilterOption(filterName, optionIndex))}
                  onTurnOffAllFilters={() => set_filters(turnOffAllFilters())}
                />
              </div>
              
              <div className={css.defectsAreaWrapper}>
                <DisplayControlBar
                  onOpenForm={() => {
                    !selectedDefects.length
                      ? alert('Nie su vybrané žiadne nedostatky')
                      : set_isOpenFormModal(true)
                  }}
                  listMode={listMode}
                  onClickTable={() => set_listMode('table')}
                  onClickMap={() => set_listMode('map')}
                  countSelectedDefects={selectedDefects.length}
                />

                <FilterControlBar
                  // date from/to
                  onSelectStartDate={(e) => selectDateQuery_withValidation(e, 'startDate')}
                  onSelectEndDate={(e) => selectDateQuery_withValidation(e, 'endDate')}
                  // searchbar
                  onSearchQuery={(e) => set_searchQuery(e.target.value)}
                  searchQuery={searchQuery}
                  // dropdown
                  onChangeDropdown={(e) => set_dropdownQuery(e.value)}
                  dropdownQuery={dropdownQuery}
                  dropdownOptions={['Najnovšie', 'Najstaršie']}
                  onClearOption={() => set_dropdownQuery('')}
                />

                <Defects
                  listMode={listMode}
                  filteredDefects={filteredDefects}
                  onOpenDetail={(defectID) => navigate(routes.techDefect.path(defectID))}
                  onSelectDefect={(checked, d) => {
                    checked
                      ? selectDefect(d)
                      : deselectDefect(d.defectID)
                  }}
                  isDefectChecked={(defectID) => isDefectChecked(defectID, selectedDefects)}
                  searchQuery={searchQuery}
                />
              </div>
            </>
          }
      </PageWrapper>

      {isOpenFormModal &&
        <FormInvestmentRequest_modal
          onClose={() => set_isOpenFormModal(false)}
          selectedDefects={selectedDefects}
          formEnums={formEnums}
          onSuccessSubmit={async () => {
            set_isOpenFormModal(false)
            await sleep() // mock loading delay
            alert('Investičná požiadavka bola úspešne vytvorená')
          }}
        />
      }
    </>
  )
}

export default DefectsManager