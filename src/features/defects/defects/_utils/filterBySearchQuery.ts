import { TDefect } from '~/defects/_types/TDefect'
import { ignoreDiacritics } from '../../_utils/ignoreDiacritics'


export const filterBySearchQuery = (defect: TDefect, searchQuery: string) => {
    if (!defect || !searchQuery) {
        return true
    }

    const _searchQuery = ignoreDiacritics(searchQuery.toLowerCase())

    const fieldsToCheck = [
        defect.defectID,
        defect.defectType.defectTypeName,
        '(' + defect.technicalObject.constructionYear + ')',
        '(' + defect.defectType.defaultSeverityLevel + ')',
        defect.technicalObject.technicalObjectName,
        defect.defectState,
        defect.isPersistent ? 'Pretrváva' : 'Nepretrváva',
        defect.technicalObject.isCrucial 
            ? 'Áno' 
            : defect.technicalObject.isCrucial == false 
            ? 'Nie' 
            : 'Bez určenia',
        defect.technicalObject.municipality,
        defect.createdDTime.toString().replace('T', ',\u00A0'),
        defect.technicalObject.supervisor,
        defect.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName
    ]

    return fieldsToCheck.some(field => 
        ignoreDiacritics(field?.toLowerCase())?.includes(_searchQuery)
    )
}