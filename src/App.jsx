import CurrentLocationProvider from './context/current-location/currentLocationProvider';
import Location from './components/location/location'
import LocationSelectors from './components/location-selector/selectors'
import Map from './components/map/map'
import Menu from './components/menu/menu-cnt'
import { useState } from 'react';

export default function App() {

  const [locationFilterState, setLocationFilterState] = useState(false);

  const toggleLocationFilter = () => {
    setLocationFilterState(prevState => !prevState);
  };

  const closeLocationFilter = () => {
    setLocationFilterState(false);
  };

  const locationFilterClass = locationFilterState ? "open" : "closed";

  return (
    <>
      <CurrentLocationProvider>
                
        <Location
          toggleLocationFilter={toggleLocationFilter}
          locationFilterState={locationFilterState}
          />

        <LocationSelectors
          locationFilterClass={locationFilterClass}
          closeLocationFilter={closeLocationFilter}
          />
        
        <Menu
          closeLocationFilter={closeLocationFilter}
          />
        
        <Map/>

      </CurrentLocationProvider>
    </>
  );
}
