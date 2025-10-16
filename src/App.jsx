import CurrentLocationProvider from './context/current-location/currentLocationProvider';
import Map from './components/map/map'
import UIStateProvider from './context/ui-state/uiStateProvider';
import UserUI from './components/user-ui/user-ui';

export default function App() {

  return (
    <>
      <CurrentLocationProvider>

        <UIStateProvider>

          <UserUI />
          
        </UIStateProvider>
        
        <Map />

      </CurrentLocationProvider>
    </>
  );
}
