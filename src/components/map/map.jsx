import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import './map.scss'

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

export default function Map({ location }) {
  
  // Default coordinates (Santa Rosa, La Pampa)
  const defaultPosition = location ? location.parameters : { lat: -36.6167, lng: -64.2833 };

  // Check if we have valid location parameters
  const hasValidLocation = location?.parameters?.lat && location?.parameters?.lng;
  
  // Use user location if available, otherwise use default
  const position = hasValidLocation ? (
    [location.parameters.lat, location.parameters.lng]
  ) : (
    defaultPosition
  );

  function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }

  return (

    <div className="map-container">

      <MapContainer 
        center={position} 
        zoom={hasValidLocation ? 13 : 5} 
        style={{ height: '100vh', width: '100vw', zIndex: 0 }}
      >
        <TileLayer />
      </MapContainer>
      
    </div>

  );
}
