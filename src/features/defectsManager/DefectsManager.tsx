import { useEffect, useState } from 'react'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { TFilter } from './_types/TFilter'
import { TInvestmentRequestType } from './_types/TInvestmentRequestType'
import { mock_GET_mockData } from './_mockApi/mock_GET_mockData'
import { TDefect } from './_types/TDefect'
import { sleep } from '~/zzz_react/sleep/sleep'
import { resetAllFilters } from './_utils/resetAllFilters'
import { toggleOffOnFilterOption } from './_utils/toggleOffOnFilterOption'
import { createInitialFilters } from './_utils/createInitialFilters'
import { prepareEnumsForInvestmentForm } from './_utils/prepareEnumsForInvestmentForm'
import { updateFiltersOptionsCountDefects } from './_utils/updateFiltersOptionsCountDefects'
import { isDefectChecked } from './_utils/isDefectChecked'
import useDefectsSelecting from './_hooks/useDefectsSelecting'
import LoadingCircle from '~/app_shared/loadingCircle/LoadingCircle'
import FormInvestmentRequest_modal from './formInvestmentRequest_modal/FormInvestmentRequest_modal'
import FilterControlSideBar from './filterControlSideBar/FilterControlSideBar.module'
import Defects from './defects/Defects'
import DefectDetail from './defectDetail/DefectDetail'
import css from './DefectsManager.module.css'


const PageDefectsManager = () => {
  const [mockApiProcessing, set_mockApiProcessing] = useState<boolean>(false)
  const [defects, set_defects] = useState<TDefect[]>([])
  const [filters, set_filters] = useState<TFilter[]>([])
  const [mode, set_mode] = useState<'list' | 'detail'>('list')
  const [isOpenForm, set_isOpenForm] = useState<boolean>(false)
  const [formEnums, set_formEnums] = useState({
    municipalities: [] as string[], 
    investmentRequestTypes: [] as TInvestmentRequestType[],
    technicalJustificationCodes: [] as string[],
    planningGroups: [] as string[],
    investmentReasonCodes: [] as string[],
  })

  const { selectedDefects, selectDefect, deselectDefect } = useDefectsSelecting()

  const navigate = useNavigate()
  const location = useLocation()

  const getMockCoreData_andPrepareFormEnums = async () => {
    set_mockApiProcessing(true)
    await sleep() // mock loading delay

    const resp = await mock_GET_mockData()
    if (resp.error) {
      set_mockApiProcessing(false)
      alert(resp.error)
      return 
    }

    set_defects(resp.finalDefects)
    
    const enums = prepareEnumsForInvestmentForm(resp.finalDefects, resp.investmentRequests)
    if (!enums) {
      set_mockApiProcessing(false)
      return
    }
    
    set_formEnums(prev => ({
      ...prev,
      investmentRequestTypes: resp.investmentRequestTypes,
      technicalJustificationCodes: enums.technicalJustificationCodes,
      investmentReasonCodes: enums.investmentReasonCodes,
      municipalities: enums.municipalities,
      planningGroups: enums.planningGroups,
    }))

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
    if (!defects.length) {
      return
    }
      
    const initialFilters = createInitialFilters(defects)
    if (!initialFilters) {
      return
    }
      
    set_filters(initialFilters)
  }, [defects])

  useEffect(() => {
    // prevent body scroll if form is open
    if (!isOpenForm) {
      return
    }
    
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpenForm])
  
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
                    : set_isOpenForm(true)
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
        
        {isOpenForm &&
          <FormInvestmentRequest_modal
            onClose={() => set_isOpenForm(false)}
            selectedDefects={selectedDefects}
            formEnums={formEnums}
            onSuccessSubmit={async () => {
              set_isOpenForm(false)
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