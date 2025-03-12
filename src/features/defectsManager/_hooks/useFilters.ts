import { useEffect, useState } from 'react'
import { TFilter } from '../_types/TFilter'
import { createInitialFilters } from '../_utils/createInitialFilters'
import { TDefect } from '../_types/TDefect'

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