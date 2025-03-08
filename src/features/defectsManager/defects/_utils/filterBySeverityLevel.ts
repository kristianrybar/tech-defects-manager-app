export const filterBySeverityLevel = (defect, filter) => {
    if (!defect || !filter) {
        return true
    }

    const activeOptions = filter.filterOptions.filter(option => option.isActive)
    if (!activeOptions.length) {
        return true
    }
    if (activeOptions.length == filter.filterOptions.length) {
        return defect.defectType.defaultSeverityLevel
    }

    return activeOptions.some(option => option.name == defect.defectType.defaultSeverityLevel)
}