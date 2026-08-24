import { api } from '~/zzz_api/core/api'
import { TDefectType } from '../_types/TDefectType'
import { TDefect } from '../_types/TDefect'
import { TTechnicalObject } from '../_types/TTechnicalObject'
import { TTechnicalObjectType } from '../_types/TTechnicalObjectType'
import { TVoltageLevel } from '../_types/TVoltageLevel'


export const mock_GET_mockData = async () => {
    const resp = await api.get_m('/api/data/mockData')
    if (resp.error) {
        return resp
    }
    
    const finalDefects = _prepareDefects(resp)
    if (finalDefects.error) {
        return finalDefects
    }
    
    return {
        finalDefects: finalDefects,
        investmentRequestTypes: resp.investmentRequestTypes,
        investmentRequests: resp.investmentRequests,
    }
}


const _prepareDefects = (resp) => {
    const defects: TDefect[] = resp.defects as TDefect[]
    const defectTypes: TDefectType[] = resp.defectTypes
    const technicalObjects: TTechnicalObject[] = resp.technicalObjects
    const technicalObjectTypes: TTechnicalObjectType[] = resp.technicalObjectTypes
    const voltageLevels: TVoltageLevel[] = resp.voltageLevels

    const defectsWithTypes = _assingDefectTypesToDefect(defects, defectTypes)
    if (defectsWithTypes.error) {
        return defectsWithTypes
    }

    const finalDefects = _assingTechnicalObjectsToDefect(defectsWithTypes as TDefect[], technicalObjects, technicalObjectTypes, voltageLevels)
    if (finalDefects.error) {
        return finalDefects
    }

    return finalDefects
}


const _assingDefectTypesToDefect = (defects: TDefect[], defectTypes: TDefectType[]) => {
    const defectsWithTypes = defects.map(d => {
        const defectType = defectTypes.find(dType => dType.defectTypeIdentifier == d.defectTypeIdentifier)

        return {
            ...d,
            defectType: {
                defectTypeIdentifier: defectType ? defectType.defectTypeIdentifier : null,
                defectTypeName: defectType ? defectType.defectTypeName : null,
                defaultSeverityLevel: defectType ? defectType.defaultSeverityLevel : null,
                voltageLevelIdentifier: defectType ? defectType.voltageLevelIdentifier : null,
            }
        }
    })
    if (!defectsWithTypes || !defectsWithTypes.length) {
        return {error: 'Assigning defect types to defects failed'}
    }
    
    return defectsWithTypes
}


const _assingTechnicalObjectsToDefect = (defects: TDefect[], technicalObjects: TTechnicalObject[], technicalObjectsTypes: TTechnicalObjectType[], voltageLevels: TVoltageLevel[]) => {
    const updatedTechObjects = _assingTechnicalObjectTypesToTechnicalObject(technicalObjects, technicalObjectsTypes)
    if (updatedTechObjects.error) {
        return updatedTechObjects
    }

    const updatedTechObjects2 = _assingVoltageLevelsToTechnicalObject(updatedTechObjects, voltageLevels)
    if (updatedTechObjects2.error) {
        return updatedTechObjects2
    }

    const defectsWithTechObjs = defects.map(d => {
        const techObj = updatedTechObjects2.find(techObject => techObject.technicalObjectID == d.technicalObjectID)

        return {
            ...d,
            technicalObject: {
                technicalObjectID: techObj ? techObj.technicalObjectID : null,
                technicalObjectName: techObj ? techObj.technicalObjectName : null,
                technicalObjectTypeIdentifier: techObj ? techObj.technicalObjectTypeIdentifier : null,
                municipality: techObj ? techObj.municipality : null,
                gpsCoordinates: techObj ? techObj.gpsCoordinates : null,
                isCrucial: techObj ? techObj.isCrucial : null,
                supervisor: techObj ? techObj.supervisor : null,
                constructionYear: techObj ? techObj.constructionYear : null,
                technicalObjectType: techObj ? techObj.technicalObjectType : null,
            }
        }
    })
    if (!defectsWithTechObjs || !defectsWithTechObjs.length) {
        return {error: 'Assigning tech. objects to defects failed'}
    }
    
    return defectsWithTechObjs
}


const _assingTechnicalObjectTypesToTechnicalObject = (technicalObjects: TTechnicalObject[], technicalObjectsTypes: TTechnicalObjectType[]) => {
    const techObjectsWithTypes = technicalObjects.map(techObj => {
        const techObjType = technicalObjectsTypes.find(techOType => techOType.technicalObjectTypeIdentifier == techObj.technicalObjectTypeIdentifier)

        return {
            ...techObj,
            technicalObjectType: {
                technicalObjectTypeIdentifier: techObjType ? techObjType.technicalObjectTypeIdentifier : null,
                technicalObjectTypeName: techObjType ? techObjType.technicalObjectTypeName : null,
                voltageLevelIdentifier: techObjType ? techObjType.voltageLevelIdentifier : null,
            }
        }
    })
    if (!techObjectsWithTypes || !techObjectsWithTypes.length) {
        return {error: 'Assigning tech. object types to tech. objects failed'}
    }

    return techObjectsWithTypes
}

const _assingVoltageLevelsToTechnicalObject = (updatedTechObjects: TTechnicalObject[], voltageLevels: TVoltageLevel[]) => {
    const techObjectsWithTypesAndVoltageLevels = updatedTechObjects.map(techObj => {
        const voltageLevel = voltageLevels.find(vL => vL.voltageLevelIdentifier == techObj.technicalObjectType.voltageLevelIdentifier)

        return {
            ...techObj,
            technicalObjectType: {
                ...techObj.technicalObjectType,
                voltageLevel: {
                    voltageLevelIdentifier: voltageLevel ? voltageLevel.voltageLevelIdentifier : null,
                    voltageLevelName: voltageLevel ? voltageLevel.voltageLevelName : null,
                }
            }
        }
    })
    if (!techObjectsWithTypesAndVoltageLevels || !techObjectsWithTypesAndVoltageLevels.length) {
        return {error: 'Assigning voltage levels to tech. object types failed'}
    }

    return techObjectsWithTypesAndVoltageLevels
}