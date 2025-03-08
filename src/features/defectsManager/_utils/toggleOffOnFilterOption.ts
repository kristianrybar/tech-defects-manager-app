export const toggleOffOnFilterOption = (prevState, filterName, optionIndex) => {
  const toggleOption = (option, idx) =>
    idx != optionIndex ? option : { ...option, isActive: !option.isActive }

  const updateFilter = (filter) =>
    filter.filterName != filterName
      ? filter
      : { ...filter, filterOptions: filter.filterOptions.map(toggleOption) }

  return prevState.map(updateFilter)
}
