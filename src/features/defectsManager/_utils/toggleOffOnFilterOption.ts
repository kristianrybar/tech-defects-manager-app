import { produce } from "immer"

export const toggleOffOnFilterOption = (filterName, optionIndex) => {
  const _toggleOption = (option, idx) => {
    return idx != optionIndex ? option : { ...option, isActive: !option.isActive }
  }
  const _updateFilter = (filter) => {
    return filter.filterName != filterName 
      ? filter
      : { ...filter, filterOptions: filter.filterOptions.map(_toggleOption) }
  }

  return produce((draft)=> {
    return draft.map(_updateFilter)
  })
}
