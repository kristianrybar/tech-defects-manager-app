import { useEffect, useState } from 'react'
import { TDefect } from '../_types/TDefect'
import { TFilter } from '../_types/TFilter'
import { isValidDateFormat } from './_utils/isValidDateFormat'
import useDefectsFiltering from './_hooks/useDefectsFiltering'
import DisplayControlBar from './displayControlBar/DisplayControlBar'
import FilterControlBar from './filterControlBar/FilterControlBar'
import Defect from './defect/Defect'
import Map from '~/app_shared/map/Map'
import css from './Defects.module.css'


type Props = {
    selectedDefects: TDefect[]
    defects: TDefect[]
    filters: TFilter[]
    onOpenDetail: (defectID) => void
    onFilterDefects: (filteredDefects) => void
    onOpenForm: () => void
    onSelectDefect: (defect, isChecked) => void
    checked: (defectID) => boolean
}

const Defects = (props: Props) => {
    const [listMode, set_listMode] = useState<'table' | 'map'>('table')
    const [filteredDefects, set_filteredDefects] = useState<TDefect[]>(props.defects || [])
    const [searchQuery, set_searchQuery] = useState<string>('')
    const [dropdownQuery, set_dropdownQuery] = useState<string>('')
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: '',
    })

    const { filterDefects } = useDefectsFiltering(props.filters)


    const selectDate = (e, key: 'startDate' | 'endDate') => {
        setDateFilter(prev => ({...prev, [key]: ''})) // clear

        const value = e?.target?.value
        if (!value) {
            return
        }
        const isValid = isValidDateFormat(value)
        if (!isValid) {
            alert('Neplatný formát dátumu. Zadajte dátum v správnom formáte.')
            return
        }

        setDateFilter(prev => ({...prev, [key]: value}))
    }

    // EFFECTS
    useEffect(() => {
        const _filteredDefects = filterDefects(props.defects, dropdownQuery, searchQuery, dateFilter)
        if (!_filteredDefects) {
            alert('Filtering defects failed')
            return
        }    
        set_filteredDefects(_filteredDefects)
    }, [searchQuery, dropdownQuery, dateFilter, props.defects, props.filters])

    useEffect(() => {
        props.onFilterDefects(filteredDefects)
    }, [filteredDefects])

    return (
        <div className={css.defects}>
            <DisplayControlBar
                onOpenForm={props.onOpenForm}
                listMode={listMode}
                onClickTable={() => set_listMode('table')}
                onClickMap={() => set_listMode('map')}
                countSelectedDefects={props.selectedDefects.length}
            />

            <FilterControlBar
                // date from/to
                onSelectStartDate={(e) => selectDate(e, 'startDate')}
                onSelectEndDate={(e) => selectDate(e, 'endDate')}
                // searchbar
                onSearchQuery={(e) => set_searchQuery(e.target.value)}
                searchQuery={searchQuery}
                // dropdown
                onChangeDropdown={(e) => set_dropdownQuery(e.value)}
                dropdownQuery={dropdownQuery}
                dropdownOptions={['Najnovšie', 'Najstaršie']}
                onClearOption={() => set_dropdownQuery('')}
            />

            {listMode == 'table' && 
                <div className={css.defectsList}>
                    {filteredDefects.length
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
                        
                            {filteredDefects.map(d => 
                                <Defect
                                    key={d.defectID}
                                    defect={d}
                                    onOpenDetail={() => props.onOpenDetail(d.defectID)}
                                    onCheckbox={(e) => props.onSelectDefect(e.target.checked, d)}
                                    searchQuery={searchQuery}
                                    checked={props.checked(d.defectID)}
                                />
                            )}
                        </>
                        : <div className={css.noDefects}>Žiadne výsledky</div>
                    }
                </div>
            }
            {listMode == 'map' &&
                <div className={css.defectsMap}>
                    <Map 
                        zoom={14}
                        defects={filteredDefects.filter(d => d.defectTypeIdentifier > '0')}
                        onCheckbox={(e, d: TDefect) => props.onSelectDefect(e.target.checked, d)}
                        checked={(defectID) => props.checked(defectID)}
                    />
                </div>
            }
        </div>
    )
}

export default Defects