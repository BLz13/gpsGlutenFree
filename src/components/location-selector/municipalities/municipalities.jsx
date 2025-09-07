// MunicipalitiesSelector.jsx

import './municipalities.scss';

import { useMemo } from 'react';
import { useMunicipalities } from '../../../hooks/location/location-selector/useMunicipalities';

export default function MunicipalitiesSelector({ municipalitySelected, province, onSelect }) {
  
    const { municipalities } = useMunicipalities(province);

  // Compute the value to give the <select>.
  // municipalitySelected can be:
  // - null/undefined => select shows placeholder ""
  // - an id (number or string) => we use that id (as string)
  // - a name (string) => we try to find the matching id in the list
  const selectValue = useMemo(() => {
    if (!municipalities || municipalities.length === 0) return municipalitySelected ?? '';

    if (municipalitySelected == null || municipalitySelected === '') return '';

    // if incoming equals an id present in the list, use that
    const byId = municipalities.find(m => String(m.id) === String(municipalitySelected));
    if (byId) return String(byId.id);

    // otherwise try to match by name
    const byName = municipalities.find(m => String(m.name).toLowerCase() === String(municipalitySelected).toLowerCase());
    if (byName) return String(byName.id);

    // fallback: empty
    return '';
  }, [municipalities, municipalitySelected]);

  const municipalitiesList = () => {
    if (municipalities && municipalities.length > 0) {
      return municipalities.map(municipality => (
        <option key={municipality.id} value={String(municipality.id)}>
          {municipality.name}
        </option>
      ));
    }
    return null;
  };

  return (
    <select
      value={selectValue}
      onChange={(e) => onSelect(e.target.value)}
      disabled={!province}
      className='municipalities-selector'
    >
      <option value="">Municipio / Partido</option>
      {municipalitiesList()}
    </select>
  );
  
}
