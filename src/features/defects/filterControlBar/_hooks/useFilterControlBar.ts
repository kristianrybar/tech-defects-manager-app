import { useState } from 'react'
import { isValidDateFormat } from '~/defects/defects/_utils/isValidDateFormat'


const useFilterControlBar = () => {
  const [searchQuery, set_searchQuery] = useState<string>('')
  const [dropdownQuery, set_dropdownQuery] = useState<string>('')
  const [dateQuery, set_dateQuery] = useState({
      startDate: '',
      endDate: '',
  })

  const selectDateQuery_withValidation = (value: string, key: 'startDate' | 'endDate') => {
    set_dateQuery(prev => ({...prev, [key]: ''})) // clear

    if (!value) {
      return
    }
    const isValid = isValidDateFormat(value)
    if (!isValid) {
      alert('Neplatný formát dátumu. Zadajte dátum v správnom formáte.')
      return
    }

    set_dateQuery(prev => ({...prev, [key]: value}))
  }


  return {
    searchQuery,
    dropdownQuery,
    dateQuery,
    selectDateQuery_withValidation,
    set_dropdownQuery,
    set_searchQuery,
  }
}

export default useFilterControlBar