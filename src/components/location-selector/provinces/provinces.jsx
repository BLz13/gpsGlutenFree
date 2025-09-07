import './provinces.scss';

import { useProvinces } from '../../../hooks/location/location-selector/useProvinces';

export default function ProvincesSelector({ provinceSelected, onSelect }) {

  const { provinces, loading } = useProvinces();

  if (loading) {
    return <div className='provinces-selector'>Cargando provincias...</div>;
  }

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className='provinces-selector'
      value={provinceSelected || ''} // Controlled value
    >
      {provinces.map((province) => (
        <option key={province.id} value={province.name}>
          {province.name}
        </option>
      ))}
    </select>
  );

}
