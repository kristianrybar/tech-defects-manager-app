import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Option } from 'react-dropdown'
import { validateFormData_andShouldReturnNewErrors } from './_utils/validateFormData_andShouldReturnNewErrors'
import { TDefect } from '../_types/TDefect'
import { PiSpinner } from 'react-icons/pi'
import useInvestmentRequestCreating from './_hooks/useInvestmentRequestCreating'
import Defect from '../defects/defectItem/DefectItem'
import UiModalContainer from '~/app_shared/ui_modalContainer/UiModalContainer'
import UiButton from '~/app_shared/ui_button/UiButton'
import UiInput from '~/app_shared/ui_input/UiInput'
import UiDropdown from '~/app_shared/ui_dropdown/UiDropdown'
import css from './FormInvestmentRequest_modal.module.css'
import { sleep } from '~/zzz_react/sleep/sleep'

type Props = {
  onClose: () => void
  selectedDefects: TDefect[]
  formEnums
  onSuccessSubmit: () => void
}

const FormInvestmentRequest_modal = (props: Props) => {
  const [errorAPI, set_errorAPI] = useState('')
  const [proccesing, set_processing] = useState<boolean>(false)
  const [showSelectedDefects, set_showSelectedDefects] = useState<boolean>(false)
  const { createInvestmentRequest } = useInvestmentRequestCreating()
  const [formData, set_formData] = useState({
    investmentRequestTypeIdentifier: '',
    investmentName: '',
    municipality: '',
    expectedImplementationDate: '',
    implementationDateJustification: '',
    technicalJustificationCode: '',
    planningGroup: '',
    investmentReasonCode: '',
    investmentReasonText: '',
    estimatedInvestmentCosts: 0,
    proposedSolution: '',
    defectsIDs: [] as string[],
  })

  const [errors, set_errors] = useState({
    investmentRequestTypeIdentifier: '',
    investmentName: '',
    municipality: '',
    expectedImplementationDate: '',
    implementationDateJustification: '',
    technicalJustificationCode: '',
    planningGroup: '',
    investmentReasonCode: '',
    investmentReasonText: '',
    estimatedInvestmentCosts: '',
    proposedSolution: '',
    defectsIDs: ''
  })

  const transformedInvestmentRequestTypes: Option[] = props.formEnums.investmentRequestTypes.map(item => ({
    value: item.investmentRequestTypeIdentifier,
    label: item.investmentRequestTypeName
  }))

  const onSubmit = async (e) => {
    e.preventDefault()
    set_processing(true)
    set_errorAPI('')

    const result: any = validateFormData_andShouldReturnNewErrors(formData)
    if (result.error) {
      if (result.newErrors) {
        set_errors(result.newErrors)
      }
      set_processing(false)
      return
    }
    set_errors(result.newErrors)

    await sleep() // mock loading delay
    const resp = await createInvestmentRequest(formData)
    if (resp.error) {
      set_errorAPI(resp.error)
      set_processing(false)
      return
    }
    
    set_processing(false)
    props.onSuccessSubmit()
  }

  useEffect(() => {
    if (!props.selectedDefects.length) {
      return
    }
    
    set_formData(prev => ({...prev, defectsIDs: props.selectedDefects.map(d => d.defectID)}))
  }, [])

  return (
    <UiModalContainer
      maxHeight='90%'
      maxWidth='1100px'
      zIndex={1001}
    >
      <header className={css.header}>
        <h1>Vytvorenie investičnej požiadavky</h1>
        <p>Vyplňte formulár a odošlite pre vytvorenie investičnej požiadavky</p>
  
        <div
          className={css.iconClose}
          onClick={props.onClose}
        >
          <IoClose />
        </div>
      </header>

      <form
        className={css.formInvestmentRequest}
        onSubmit={onSubmit}
      >
          <div className={css.selectedDefects}>
            <UiButton
              className={css.toggleButton}
              onClick={() => set_showSelectedDefects(prev => !prev)}
            >
              {showSelectedDefects ? 'Skry Vybrané nedostatky' : 'Ukáž Vybrané nedostatky'} ({props.selectedDefects.length})
            </UiButton>
            {errors.defectsIDs &&
              <div className={css.error}>{errors.defectsIDs}</div>
            }

            {showSelectedDefects &&
              <div>
                {props.selectedDefects.map(d => 
                  <Defect
                    key={d.defectID}
                    defect={d}
                    hideArrowIcon={true}
                    hideCheckbox={true}
                  />
                )}
              </div>
            }
          </div>
          <div className={css.inputs}>
            <div>
              <UiDropdown
                label='Type investičnej požiadavky'
                options={transformedInvestmentRequestTypes}
                onChange={(e) => {
                  set_errors(prev => ({...prev, investmentRequestTypeIdentifier: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, investmentRequestTypeIdentifier: e.value}))
                }}
                placeholder='Vybrať...'
                error={errors.investmentRequestTypeIdentifier}
              />
              <UiInput
                label='Názov investície'
                value={formData.investmentName}
                onChange={(e) => {
                  set_errors(prev => ({...prev, investmentName: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, investmentName: e.target.value}))
                }}
                placeholder=' '
                error={errors.investmentName}
              />
            </div>
            <div>
              <UiDropdown
                label='Obec'
                options={props.formEnums.municipalities}
                onChange={(e) => {
                  set_errors(prev => ({...prev, municipality: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, municipality: e.value}))
                }}
                placeholder='Vybrať...'
                error={errors.municipality}
              />
              <UiInput
                label='Predpokladaný termín realizácie'
                type='date'
                value={formData.expectedImplementationDate}
                onChange={(e) => {
                  set_errors(prev => ({...prev, expectedImplementationDate: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, expectedImplementationDate: e.target.value}))
                }}
                error={errors.expectedImplementationDate}
              />
            </div>
            <UiInput
              label='Zdôvodnenie termínu realizácie'
              value={formData.implementationDateJustification}
              onChange={(e) => {
                set_errors(prev => ({...prev, implementationDateJustification: ''}))
                set_errorAPI('')
                set_formData(prev => ({...prev, implementationDateJustification: e.target.value}))
              }}
              placeholder=' '
              error={errors.implementationDateJustification}
            />
            <div>
              <UiDropdown
                label='Kód technického prevedenia'
                value={formData.technicalJustificationCode}
                options={props.formEnums.technicalJustificationCodes}
                onChange={(e) => {
                  set_errors(prev => ({...prev, technicalJustificationCode: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, technicalJustificationCode: e.value}))}
                }  
                placeholder='Vybrať...'
                error={errors.technicalJustificationCode}
              />
              <UiDropdown
                label='Plánovacia skupina'
                value={formData.planningGroup}
                options={props.formEnums.planningGroups}
                onChange={(e) => {
                  set_errors(prev => ({...prev, planningGroup: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, planningGroup: e.value}))}
                } 
                placeholder='Vybrať...'
                error={errors.planningGroup}
              />
            </div>
            <div>
              <UiDropdown
                label='Dôvod(y) investície - kód'
                value={formData.investmentReasonCode}
                options={props.formEnums.investmentReasonCodes}
                onChange={(e) => {
                  set_errors(prev => ({...prev, investmentReasonCode: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, investmentReasonCode: e.value}))}
                } 
                placeholder='Vybrať...'
                error={errors.investmentReasonCode}
              />
              <UiInput
                label='Predpokladané investičné náklady (€)'
                type='number'
                value={formData.estimatedInvestmentCosts}
                onChange={(e) => {
                  set_errors(prev => ({...prev, estimatedInvestmentCosts: ''}))
                  set_errorAPI('')
                  set_formData(prev => ({...prev, estimatedInvestmentCosts: e.target.value}))}
                } 
                min={0}
                placeholder=' '
                error={errors.estimatedInvestmentCosts}
              />
            </div>

            <UiInput
              label='Dôvod(y) investície - text'
              value={formData.investmentReasonText}
              onChange={(e) => {
                set_errors(prev => ({...prev, investmentReasonText: ''}))
                set_errorAPI('')
                set_formData(prev => ({...prev, investmentReasonText: e.target.value}))}
              } 
              placeholder=' '
              error={errors.investmentReasonText}
            />
            <UiInput
              label='Navrhované riešenie'
              value={formData.proposedSolution}
              onChange={(e) => {
                set_errors(prev => ({...prev, proposedSolution: ''}))
                set_errorAPI('')
                set_formData(prev => ({...prev, proposedSolution: e.target.value}))}
              } 
              placeholder=' '
              error={errors.proposedSolution}
            />
          </div>

        <footer className={css.footer}>
          <div className={css.error}>{errorAPI ? errorAPI : ''}</div>
          <UiButton onClick={props.onClose}>
            Zrušiť
          </UiButton>
          <UiButton
            className={css.submitButton}
            type='submit'
          >
            {!proccesing 
              ? 'Odoslať' 
              : <PiSpinner size={25} className={css.animation} 
            />}
          </UiButton>
        </footer>
      </form>
    </UiModalContainer>
  )
}

export default FormInvestmentRequest_modal