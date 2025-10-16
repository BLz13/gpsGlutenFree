import CurrentLocationProvider from './context/current-location/currentLocationProvider';
import Map from './components/map/map'
import TopBar from './components/top-bar/top-bar';
import UIStateProvider from './context/ui-state/uiStateProvider';

export default function App() {

  return (
    <>
      <CurrentLocationProvider>

        <UIStateProvider>

          <TopBar />
          
        </UIStateProvider>
        
        <Map />

      </CurrentLocationProvider>
    </>
  );
}
