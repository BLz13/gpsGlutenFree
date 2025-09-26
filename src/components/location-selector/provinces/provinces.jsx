import { useEffect, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import { useProvinces } from '../../../hooks/location/location-selector/useProvinces';

export default function ProvincesSelector({ provinceSelected, onSelect }) {

  const { provinces, loading } = useProvinces();
  
  const [selectorState, setSelectorState] = useState(false);
  const [dropDownClass, setDropDownClass] = useState('location-selector');

  useEffect(() => {
    setDropDownClass(selectorState ? 'location-selector open' : 'location-selector');
  }, [selectorState]);

  if (loading) {
    return <div className='provinces-selector'>Cargando provincias...</div>;
  }

  const handleProvinceSelect = (provinceName) => {
    onSelect(provinceName);
    setSelectorState(false);
  };

  return (
    <div
      onClick={() => setSelectorState(!selectorState)}
      className={dropDownClass}
    >
      <span className='selected'>{provinceSelected || 'Seleccionar provincia'}</span>
      <div className='list-options'>
        {provinces.map((province) => (
          <span 
            key={province.id} 
            onClick={(e) => {
              e.stopPropagation();
              handleProvinceSelect(province.name);
            }}
            className='option'
          >
            {province.name}
          </span>
        ))}
      </div>
      <Chevron className='arrow-down' />
    </div>
  );
}
