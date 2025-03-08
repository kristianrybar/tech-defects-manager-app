export const sortByDate = (a, b, dropdownQuery) => {
    if (!dropdownQuery || (!a && !b)) {
        return 0
    }

    const dateA: any = new Date(a.createdDTime)
    const dateB: any = new Date(b.createdDTime)

    if (dropdownQuery === 'Najnovšie'){
        return dateB - dateA
    }
    if (dropdownQuery === 'Najstaršie') {
        return dateA - dateB
    }

    return 0
}