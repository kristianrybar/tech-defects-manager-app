import { TFilter } from '../_types/TFilter'
import FilterGroup from './filterGroup/FilterGroup'
import css from './FilterControlSideBar.module.css'


type Props = {
    filters: TFilter[]
    onCheckbox: (index, filterName) => void
    onResetFilters: () => void
}

const FilterControlSideBar = (props: Props) => {
    return (
        <>  
            <div 
                className={css.resetFilters}
                onClick={props.onResetFilters}
            >
                Zrušiť vybrané parametre
            </div>
            
            <div className={css.filtersSidebar}>
                {props.filters.map(filter =>
                    <FilterGroup
                        key={filter.filterName}
                        filterName={filter.filterName}
                        options={filter.filterOptions}
                        onCheckbox={(_, index) => props.onCheckbox(index, filter.filterName)}
                    />
                )}
            </div>
        </>
    )
}

export default FilterControlSideBar