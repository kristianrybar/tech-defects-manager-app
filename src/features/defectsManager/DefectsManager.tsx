import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { mock_GET_mockData } from './_mockApi/mock_GET_mockData'
import { TDefect } from './_types/TDefect'
import { sleep } from '~/zzz_react/sleep/sleep'
import { resetAllFilters } from './_utils/resetAllFilters'
import { toggleOffOnFilterOption } from './_utils/toggleOffOnFilterOption'
import { updateFiltersOptionsCountDefects } from './_utils/updateFiltersOptionsCountDefects'
import { isDefectChecked } from './_utils/isDefectChecked'
import useDefectsSelecting from './_hooks/useDefectsSelecting'
import useFormEnums from './_hooks/useFormEnums'
import useFilters from './_hooks/useFilters'
import LoadingCircle from '~/app_shared/loadingCircle/LoadingCircle'
import FormInvestmentRequest_modal from './formInvestmentRequest_modal/FormInvestmentRequest_modal'
import FilterControlSideBar from './filterControlSideBar/FilterControlSideBar.module'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import css from './DefectsManager.module.css'


const PageDefectsManager = () => {
  const [mockApiProcessing, set_mockApiProcessing] = useState<boolean>(false)
  const [defects, set_defects] = useState<TDefect[]>([])
  const [mode, set_mode] = useState<'list' | 'detail'>('list')
  const [isOpenFormModal, set_isOpenFormModal] = useState<boolean>(false)

  const { selectedDefects, selectDefect, deselectDefect } = useDefectsSelecting()
  const { formEnums, prepareFormEnums } = useFormEnums()
  const { filters, set_filters } = useFilters(defects)

  const navigate = useNavigate()
  const location = useLocation()

  const getMockCoreData_andPrepareFormEnums = async () => {
    set_mockApiProcessing(true)
    const resp = await mock_GET_mockData()
    await sleep() // mock loading delay
    if (resp.error) {
      set_mockApiProcessing(false)
      alert(resp.error)
      return 
    }

    set_defects(resp.finalDefects)
    prepareFormEnums(resp.finalDefects, resp.investmentRequestTypes, resp.investmentRequests)
    set_mockApiProcessing(false)
  }
  
  const openDefectDetail_andCreateUrlSearchParams = (defectId) => {
    if (!defectId) {
      return
    }

    navigate({
      pathname: '/tech-defects-manager',
      search: createSearchParams({
        defectId
      }).toString()
    })
    set_mode('detail')
  }

  const openDefectsList_andClearUrlSearchParams = () => {
    navigate(location.pathname)
    set_mode('list')
  }

  useEffect(() => {
    getMockCoreData_andPrepareFormEnums()
  }, [])

  useEffect(() => {
    // prevent body scroll if form is open
    if (!isOpenFormModal) {
      return
    }
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpenFormModal])
  
  return (
    <>
      {mockApiProcessing && 
        <LoadingCircle
          size={5}
          loadingColor='green'
        />
      }

      <div className={css.defectsManagerContainer}>
        {mode == 'list' && !mockApiProcessing &&
          <>
            <div className={css.filterControlSideBarWrapper}>
              <FilterControlSideBar
                filters={filters}
                onCheckbox={(optionIndex, filterName) => set_filters((prev) => toggleOffOnFilterOption(prev, filterName, optionIndex))}
                onResetFilters={() => set_filters(resetAllFilters())}
              />
            </div>
            
            <div className={css.defectsWrapper}>
              <Defects
                defects={defects}
                filters={filters}
                selectedDefects={selectedDefects}
                onOpenDetail={(defectID) => openDefectDetail_andCreateUrlSearchParams(defectID)}
                onFilterDefects={(filteredDefects) => set_filters(updateFiltersOptionsCountDefects(filteredDefects))}
                onOpenForm={() => {
                  !selectedDefects.length
                    ? alert('Nie su vybrané žiadne nedostatky')
                    : set_isOpenFormModal(true)
                }}
                onSelectDefect={(checked, d) => {
                  checked
                    ? selectDefect(d)
                    : deselectDefect(d.defectID)
                }}
                checked={(defectID) => isDefectChecked(defectID, selectedDefects)}
              />
            </div>
          </>
        }
        {mode == 'detail' && !mockApiProcessing &&
          <div className={css.defectDetailWrapper}>
            <DefectDetail
              onGoBack={openDefectsList_andClearUrlSearchParams}
              defects={defects}
              checked={(defectID) => isDefectChecked(defectID, selectedDefects)}
              onSelectDefect={(checked, d) => {
                checked
                  ? selectDefect(d)
                  : deselectDefect(d.defectID)
              }}
            />
          </div>
        }
        
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
      </div>
    </>
  )
}

export default PageDefectsManager