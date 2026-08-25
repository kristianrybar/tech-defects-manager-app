import { api } from '~/zzz_api/core/api'
import { TDefectType } from '../_types/TDefectType'
import { TDefect } from '../_types/TDefect'
import { TTechnicalObject } from '../_types/TTechnicalObject'
import { TTechnicalObjectType } from '../_types/TTechnicalObjectType'
import { TVoltageLevel } from '../_types/TVoltageLevel'
import { TInvestmentRequestType } from '~/investmentRequests/_types/TInvestmentRequestType'
import { TInvestmentRequest } from '~/investmentRequests/_types/TInvestmentRequest'


type MockData = {
    defects: TDefect[]
    defectTypes: TDefectType[]
    technicalObjects: TTechnicalObject[]
    technicalObjectTypes: TTechnicalObjectType[]
    voltageLevels: TVoltageLevel[]
    investmentRequestTypes: TInvestmentRequestType[]
    investmentRequests: TInvestmentRequest[]
} | { error: string }

type MockDataSuccess = Exclude<MockData, { error: string }>
type TTechnicalObjectWithoutVoltageLevel = Omit<TTechnicalObject, 'technicalObjectType'> & {
    technicalObjectType: Omit<TTechnicalObjectType, 'voltageLevel'>
}


export const mock_GET_mockData = async () => {
    const resp = await api.get_m('/api/data/mockData')
    if (resp.error) {
        return resp
    }
    
    const finalDefects = _prepareDefects(resp)
    if ('error' in finalDefects) {
        return finalDefects
    }
    
    return {
        finalDefects: finalDefects,
        investmentRequestTypes: resp.investmentRequestTypes,
        investmentRequests: resp.investmentRequests,
    }
}


const _prepareDefects = (resp: MockDataSuccess) => {
    const defects: TDefect[] = resp.defects ? resp.defects : []
    const defectTypes: TDefectType[] = resp.defectTypes
    const technicalObjects: TTechnicalObject[] = resp.technicalObjects
    const technicalObjectTypes: TTechnicalObjectType[] = resp.technicalObjectTypes
    const voltageLevels: TVoltageLevel[] = resp.voltageLevels

    const defectsWithTypes = _assingDefectTypesToDefect(defects, defectTypes)
    if ('error' in defectsWithTypes) {
        return defectsWithTypes
    }

    const finalDefects = _assingTechnicalObjectsToDefect(defectsWithTypes as TDefect[], technicalObjects, technicalObjectTypes, voltageLevels)
    if ('error' in finalDefects) {
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
    if ('error' in updatedTechObjects) {
        return updatedTechObjects
    }

    const updatedTechObjects2 = _assingVoltageLevelsToTechnicalObject(updatedTechObjects, voltageLevels)
    if ('error' in updatedTechObjects2) {
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
                technicalObjectTypeIdentifier: techObjType ? techObjType.technicalObjectTypeIdentifier : '',
                technicalObjectTypeName: techObjType ? techObjType.technicalObjectTypeName : '',
                voltageLevelIdentifier: techObjType ? (techObjType.voltageLevelIdentifier ?? '') : '',
            }
        }
    })
    if (!techObjectsWithTypes || !techObjectsWithTypes.length) {
        return { error: 'Assigning tech. object types to tech. objects failed' }
    }

    return techObjectsWithTypes
}

const _assingVoltageLevelsToTechnicalObject = (updatedTechObjects: TTechnicalObjectWithoutVoltageLevel[], voltageLevels: TVoltageLevel[]) => {
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