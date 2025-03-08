import { TTechnicalObjectType } from './TTechnicalObjectType'

export type TTechnicalObject = {
    technicalObjectID: string
    technicalObjectName: string
    technicalObjectTypeIdentifier: string
    municipality: string
    gpsCoordinates: [number, number] //long, latd
    isCrucial: boolean
    supervisor: string
    constructionYear: number
    technicalObjectType: TTechnicalObjectType
}