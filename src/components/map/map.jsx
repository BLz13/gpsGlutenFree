import './map.scss'
import 'maplibre-gl/dist/maplibre-gl.css';

import { useEffect, useState } from 'react';

import { Map as MapObject } from '@vis.gl/react-maplibre';

export default function Map({ location }) {

  const [zoom, setZoom] = useState(3.5);

  const [params, setParams] = useState(
    location ? location.parameters : { lat: -38.5546, lng: -62.8565 }
  );

  useEffect(() => {
    if (location) {
      setParams(location);
      setZoom(10);
    }
  }, [location]);

  return (

    <div className="map-container">

      <MapObject
        initialViewState={{
          longitude: params.lng,
          latitude: params.lat,
          zoom: zoom
        }}
        style={{ height: '100vh', width: '100vw', zIndex: 0 }}
        mapStyle="https://api.maptiler.com/maps/01991bfc-3e57-74a4-a9d1-7b249a95b36e/style.json?key=Pf87ayOuyYEaDsy5Ko7D"
      />
      
    </div>

  );
}
