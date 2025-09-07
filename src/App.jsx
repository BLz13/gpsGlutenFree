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

  return (
    <>

      <Location
        location={location}
        toggleLocationFilter={toggleLocationFilter}
        locationFilterState={locationFilterState}
      />

      <LocationSelectors
        location={location}
        locationFilterClass={locationFilterClass}
        closeLocationFilter={closeLocationFilter}
      />
      
      <Menu
        closeLocationFilter={closeLocationFilter}
      />
      
      <Map location={location} />

    </>
  );
}
