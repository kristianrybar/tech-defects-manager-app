import { useEffect } from 'react'
import { useMap } from 'react-leaflet'


type Props = {
  zoom: number
}

const SetZoom = (props: Props) => {
  const map = useMap()

  useEffect(() => {
    if (!props.zoom) {
        return
    }
    map.setZoom(props.zoom)
  }, []) // eslint-disable-line

  return null
}

export default SetZoom