import { MapContainer, TileLayer } from 'react-leaflet'
import { TDefect } from '~/defectsManager/_types/TDefect'
import CustomMarker from './customMarker/CustomMarker'
import FitBounds from './fitBounds/FitBounds'
import css from './Map.module.css'

type Props = {
  zoom: number
  defects: TDefect[]
  checked: (defectID) => boolean
  onCheckbox: (e, d) => void
}

const Map = (props: Props) => {

  return (
    <MapContainer
      className={css.leafletMap}
      zoom={props.zoom || 6}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      {/* custom */}
      <FitBounds defects={props.defects} />
      
      {/* leaflet */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.defects
        .map((d) => (
          <CustomMarker
            key={d.defectID}
            defect={d}
            checked={props.checked(d.defectID)}
            onCheckbox={(e) => props.onCheckbox(e, d)}
          />
      ))}
    </MapContainer>
  )
}

export default Map