import Location from './components/location/location'
import LocationSelectors from './components/location-selector/selectors'
import Map from './components/map/map'
import Menu from './components/menu/menu-cnt'
import { useCoordinates } from './hooks/location/useCoordinates';
import { useLocation } from './hooks/location/useLocation';
import { useState } from 'react';

export default function App() {

  const { coords } = useCoordinates();
  const { location } = useLocation(coords);

  const [locationFilterState, setLocationFilterState] = useState(false);

  const toggleLocationFilter = () => {
    setLocationFilterState(prevState => !prevState);
  };

  const closeLocationFilter = () => {
    setLocationFilterState(false);
  };

  const locationFilterClass = locationFilterState ? "open" : "closed";

  console.log('App component - coords:', coords);
  console.log('App component - location:', location);
  console.log('App component - locationFilterState:', locationFilterState);

  return (
    <>

      <Location
        location={location}
        toggleLocationFilter={toggleLocationFilter}
        locationFilterState={locationFilterState}
      />

      <LocationSelectors
        locationFilterClass={locationFilterClass}
        locationFilterState={locationFilterState}
        closeLocationFilter={closeLocationFilter}
      />
      
      <Menu />
      
      <Map location={location} />

    </>
  );
}
