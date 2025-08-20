import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Map() {

  const position = [-37.97, -57.56]

  return (
    <>
      <div>
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100vw', zIndex: 0 }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
  
};
