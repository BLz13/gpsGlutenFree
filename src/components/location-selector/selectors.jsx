import './selector.scss';

import CitiesSelector from './cities/cities';
import MunicipalitiesSelector from './municipalities/municipalities';
import ProvincesSelector from './provinces/provinces';

export default function LocationSelectors({ locationFilterClass, closeLocationFilter }) {

  const handleClickBackdrop = () => {
    closeLocationFilter();
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
