import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { LatLngBounds, LatLngBoundsLiteral } from 'leaflet'
import { TDefect } from '~/defects/_types/TDefect'


type Props = {
    defects: TDefect[]
}

const FitBounds = (props: Props) => {
    const map = useMap()

    const finalCoords: LatLngBoundsLiteral = props.defects.map((d) => [d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]])
    
    useEffect(() => {
        if (!props.defects.length) {
           return 
        }
        if (!finalCoords) {
           return 
        }
            
        const bounds = new LatLngBounds(finalCoords)
        if (!bounds) {
            return
        } 
        
        map.fitBounds(bounds)
    }, []) // eslint-disable-line

    return null
}

export default FitBounds