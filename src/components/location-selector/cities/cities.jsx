import { useCities } from '../../../hooks/location/location-selector/useCities';
import { useMemo } from 'react';

export default function CitiesSelector({ citySelected, municipality, onSelect }) {
  
    const { cities } = useCities(municipality);

    // Normalize selected value to an id (string) when possible
    const selectValue = useMemo(() => {
        if (!cities || cities.length === 0) return citySelected ?? '';

        if (citySelected == null || citySelected === '') return '';

        const byId = cities.find(c => String(c.id) === String(citySelected));
        if (byId) return String(byId.id);

        const byName = cities.find(c => String(c.name).toLowerCase() === String(citySelected).toLowerCase());
        if (byName) return String(byName.id);

        return '';
    }, [cities, citySelected]);

    const citiesList = () => {
        if (cities && cities.length > 0) {
        return cities.map(city => (
            <option key={city.id} value={String(city.id)}>
            {city.name}
            </option>
        ));
        }
        return null;
    };

    return (
        <select
        value={selectValue}
        onChange={(e) => onSelect(e.target.value)}
        disabled={!municipality}
        className='cities-selector'
        >
        <option value="">Ciudad / Barrio</option>
        {citiesList()}
        </select>
    );

}
