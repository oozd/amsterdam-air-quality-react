import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { iconGenerator, AMSTERDAM_CENTER_LAT_LNG, MAPS_KEY, MAP_CONTAINER_STYLE } from "../helpers";
import Info from './Info';

export const Map = (props: {
    stations: any[],
    stationLocations: Array<any>
}) => {
  
  const [showByIndex, setShowByIndex] = useState(null);    
  return (
    <LoadScript
      googleMapsApiKey={MAPS_KEY}
    >
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={AMSTERDAM_CENTER_LAT_LNG}
        zoom={12}
      >
        {props.stations.map((station, idx) => (
          <Marker
            key={station.idx}
            position={props.stationLocations[idx]}
            icon={iconGenerator(station.forecast.daily.pm25[2].avg)}
            onMouseOver={() => setShowByIndex(station.idx)}
            onMouseOut={() => setShowByIndex(null)}
            >
              {
                showByIndex === station.idx && 
                <InfoWindow
                  position={props.stationLocations[idx]}
                >
                  <div>
                    <Info station={station}/>
                  </div>
                </InfoWindow> 
              }
            </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  )
}