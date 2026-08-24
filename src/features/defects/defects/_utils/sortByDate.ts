export const sortByDate = (dateA: Date, dateB: Date, dropdownQuery: string) => {
    if (!dropdownQuery || (!dateA && !dateB)) {
        return 0
    }

    const _dateA = new Date(dateA)
    const _dateB = new Date(dateB)

    if (dropdownQuery === 'Najnovšie'){
        return _dateB.getTime() - _dateA.getTime()
    }
    if (dropdownQuery === 'Najstaršie') {
        return _dateA.getTime() - _dateB.getTime()
    }

    return 0
}