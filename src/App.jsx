import Location from './components/location/location'
import LocationSelectors from './components/location-selector/selectors'
import Map from './components/map/map'
import Menu from './components/menu/menu-cnt'
import { useCoordinates } from './hooks/location/useCoordinates';
import { useLocation } from './hooks/location/useLocation';

export default function App() {

  const { coords } = useCoordinates();
  const { location } = useLocation(coords);

  console.log(coords);
  console.log(location);

  return (
    <>
      <Location location={location} />
      <LocationSelectors location={location} />
      <Menu />
      <Map location={location} />
    </>
  );
}
