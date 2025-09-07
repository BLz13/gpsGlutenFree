/* eslint-disable react-hooks/exhaustive-deps */

import './map.scss'
import 'maplibre-gl/dist/maplibre-gl.css';

import { Map as MapObject, useMap } from '@vis.gl/react-maplibre';
import { useEffect, useState } from 'react';

export default function Map({ coords }) {

  const [zoom, setZoom] = useState(3.5);

  const { current: map } = useMap();

  const [params, setParams] = useState(
    coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: -38.5546, lng: -62.8565 }
  );

  useEffect(() => {
    if (coords) {
      setParams({ lat: coords.latitude, lng: coords.longitude });
      setZoom(10);
      map.flyTo({ center: { lat: coords.latitude, lng: coords.longitude } });
    }
  }, [location]);

  const mapStyles = {
    height: '100vh',
    width: '100vw',
    zIndex: 0
  };

  return (

    <div className="map-container">

      <MapObject
        initialViewState={{
          longitude: params.lng,
          latitude: params.lat,
          zoom: zoom
        }}
        style={mapStyles}
        mapStyle="https://api.maptiler.com/maps/01991bfc-3e57-74a4-a9d1-7b249a95b36e/style.json?key=Pf87ayOuyYEaDsy5Ko7D"
      />
      
    </div>

  );
}
