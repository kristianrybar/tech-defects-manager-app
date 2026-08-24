import { MapContainer, TileLayer } from 'react-leaflet'
import { TDefect } from '~/defects/_types/TDefect'
import CustomMarker from './customMarker/CustomMarker'
import FitBounds from './fitBounds/FitBounds'
import SetZoom from './setZoom/SetZoom'
import css from './Map.module.css'


type Props = {
  zoom?: number
  defects: TDefect[]
  isDefectChecked: (defectID: string) => boolean
  onSelectDefect: (e: React.ChangeEvent<HTMLInputElement>, defect: TDefect) => void
}

const Map = (props: Props) => {

  return (
    <MapContainer
      className={css.leafletMap}
      //zoom={props.zoom || 6}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      {/* custom */}
      
      <FitBounds defects={props.defects} />
      
      <SetZoom zoom={props.zoom || 0} />
      
      {/* leaflet */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.defects
        .map((defect) => (
          <CustomMarker
            key={defect.defectID}
            defect={defect}
            isDefectChecked={props.isDefectChecked(defect.defectID)}
            onCheckbox={(e) => props.onSelectDefect(e, defect)}
          />
      ))}
    </MapContainer>
  )
}

export default Map