import { produce } from 'immer'

export const turnOffAllFilters = () => {
  return produce(draft => {
    draft.forEach(filter => {
      filter.filterOptions.forEach(option => {
        option.isActive = false
      })
    })
  })
}
