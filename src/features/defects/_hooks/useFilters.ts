import { useEffect, useState } from 'react'
import { TFilter } from '../filterControlSideBar/_types/TFilter'
import { TDefect } from '../_types/TDefect'
import { createInitialFilters } from '../_utils/createInitialFilters'


const useFilters = (defects: TDefect[]) => {
  const [filters, set_filters] = useState<TFilter[]>([])

  useEffect(() => {
    if (!defects || !defects.length) {
      return
    }
      
    const initialFilters = createInitialFilters(defects)
    if (!initialFilters) {
      return
    }
      
    set_filters(initialFilters)
  }, [defects])

  return {
    filters,
    set_filters
  }
}

export default useFilters