import './selector.scss';

import { useEffect, useState } from 'react';

import CitiesSelector from './cities/cities';
import MunicipalitiesSelector from './municipalities/municipalities';
import ProvincesSelector from './provinces/provinces';
import { useUIState } from '../../../hooks/context/useUIState';

export default function LocationSelectors() {
  
  const { closeLocation, locationState } = useUIState();

  const [locationFilterClass, setLocationFilterClass] = useState('closed');

  useEffect(() => {
    setLocationFilterClass( locationState ? 'open' : 'closed' );
  },[locationState]);

  const handleClickBackdrop = () => {
    closeLocation();
  };

  return (
    <div className={`location-selector-cnt ${locationFilterClass}`}>
      <ProvincesSelector />
      <MunicipalitiesSelector />
      <CitiesSelector />
      <div
        onClick={handleClickBackdrop}
        onTouchEnd={handleClickBackdrop}
        className='backdrop-location-selector'
      />
    </div>
  );
  
}
