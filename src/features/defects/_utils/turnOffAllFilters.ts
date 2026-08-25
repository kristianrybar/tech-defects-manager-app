import { produce } from 'immer'
import { TFilter } from '../filterControlSideBar/_types/TFilter'


export const turnOffAllFilters = () => {
  return produce(draft => {
    draft.forEach((filter: TFilter) => {
      filter.filterOptions.forEach(option => {
        option.isActive = false
      })
    })
  })
}
