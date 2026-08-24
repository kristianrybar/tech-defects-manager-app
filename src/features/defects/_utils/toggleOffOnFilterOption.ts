import { produce } from "immer"

export const toggleOffOnFilterOption = (filterName, optionIndex) => {
  return produce((draft) => {
    const filter = draft.find(f => f.filterName === filterName);
    if (!filter) {
      return
    }
    const option = filter.filterOptions[optionIndex];
    if (!option) {
      return
    }
    option.isActive = !option.isActive; 
  });
}
