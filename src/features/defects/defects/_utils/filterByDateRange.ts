import { TDateFilter } from "~/defects/_types/TDateFilter"


export const filterByDateRange = (
    dateFilter: TDateFilter, 
    createdDate: string | Date
) => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
        return true
    }
        
    const comparingDate = new Date(createdDate)
    comparingDate.setHours(0,0,0,0)
    
    let isoStartDate
    let isoEndDate

    // prepare iso date
    if (dateFilter.startDate) {
        const [day, month, year] = dateFilter.startDate.split('/')
        isoStartDate = `${year}/${month}/${day}/${'00:00:00'}`
    }
    if (dateFilter.endDate) {
        const [day, month, year] = dateFilter.endDate.split('/')
        isoEndDate = `${year}/${month}/${day}/${'00:00:00'}`
    }

    const startDate = isoStartDate ? new Date(isoStartDate) : null
    const endDate = isoEndDate ? new Date(isoEndDate) : null

    // datum OD
    if (startDate && !endDate) {
        if (startDate <= comparingDate) {
            return true
        }
    }

    // datum DO
    if (endDate && !startDate) {
        if (endDate >= comparingDate) {
            return true
        } 
    }
    
    // datum OD - DO
    if (startDate && endDate) {
        if (startDate <= comparingDate && endDate >= comparingDate) {
           return true 
        }  
    }
    
    return false
}