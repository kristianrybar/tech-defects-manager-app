import { useEffect, useRef } from 'react'
import { Circle, Marker, Popup, Tooltip } from 'react-leaflet'
import type { Marker as LeafletMarker } from 'leaflet'
import { TDefect } from '~/defects/_types/TDefect'
import UiInput from '~/app_shared/ui_input/UiInput'
import css from './CustomMarker.module.css'


type Props = {
    defect: TDefect
    isDefectChecked: boolean
    onCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomMarker = (props: Props) => {
    const d = props.defect
    
    const refMarker = useRef<LeafletMarker | null>(null)

    useEffect(() => {
        if (!refMarker)
            return
        if (!refMarker.current)
            return

        refMarker.current.openPopup()
    }, [])
    
    return (
        <Marker
            ref={refMarker}
            key={d.defectID}
            position={[d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]]}
        >   
            {props.isDefectChecked &&
                <Circle 
                    center={[d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]]} 
                    radius={30}
                    pathOptions={{color: 'red'}}
                />
            }
            <Tooltip>
                <div 
                    className={`
                        ${css.tooltipInner}
                        ${props.isDefectChecked && css.checked}
                    `}
                >
                    <div>
                        <span>{props.isDefectChecked && 'Označený'}</span>
                    </div>
                    {d.technicalObject.technicalObjectName}
                </div>
            </Tooltip>
            <Popup>
                <div className={css.popup}>
                    <UiInput
                        wrapperClassName={`${props.isDefectChecked && css.checked}`}
                        label={props.isDefectChecked ? 'Označený' : 'Označiť nedostatok'}
                        type='checkbox'
                        checked={props.isDefectChecked || false}
                        onChange={props.onCheckbox}
                        value=''
                    />
                    <div>ID nedostatku:  {d.defectID}</div>
                    <div>Typ nedostatku:  {d.defectType.defectTypeName}</div>
                    <div>Techn. objekt:  {d.technicalObject.technicalObjectName}</div>
                    <div>Typ techn. objekt:  {d.technicalObject.technicalObjectType?.technicalObjectTypeName}</div>
                </div>
            </Popup>
        </Marker>
    )
}

export default CustomMarker