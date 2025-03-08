import { TDefectType } from './TDefectType'
import { TTechnicalObject } from './TTechnicalObject'

export type TDefect = {
    defectID: string
    defectTypeIdentifier: string
    technicalObjectID: string
    createdDTime: Date
    defectState: string
    description: string
    isPersistent: boolean
    defectType: TDefectType
    technicalObject: TTechnicalObject
}
