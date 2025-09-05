import './provinces.scss';

import { useProvinces } from '../../../hooks/location/location-selector/useProvinces';

export default function ProvincesSelector({ onSelect }) {

  const { provinces, loading } = useProvinces();

  const provincesList = () => {
    if (provinces && provinces.length > 0) {
      return provinces.map(province => (
        <option key={province.id} value={province.id}>
          {province.name}
        </option>
      ));
    }
    return null;
  };

  if (loading) return <div>Loading provinces...</div>;

  return (
    <select onChange={(e) => onSelect(e.target.value)} className='provinces-selector'>
      <option value="">Select a province</option>
      {provincesList()}
    </select>
  );
  
}
