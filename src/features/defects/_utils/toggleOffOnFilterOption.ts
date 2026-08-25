import { produce } from "immer"
import { TFilter } from "../filterControlSideBar/_types/TFilter";


export const toggleOffOnFilterOption = (filterName: string, optionIndex: number) => {
  return produce((draft: TFilter[]) => {
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
