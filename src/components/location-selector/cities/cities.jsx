import './cities.scss';

import { useCities } from '../../../hooks/location/location-selector/useCities';

export default function CitiesSelector({ municipality, onSelect }) {

    const { cities, loading } = useCities(municipality);

    const citiesList = () => {
    if (cities && cities.length > 0) {
        return cities.map(city => (
        <option key={city.id} value={city.id}>
            {city.name}
        </option>
        ));
    }
    return null;
    };

    if (loading) return <div>Loading cities...</div>;

    return (
        <select
            onChange={(e) => onSelect(e.target.value)}
            disabled={!municipality}
            className='cities-selector'
        >
            <option value="">Select a city</option>
                {citiesList()}
        </select>
    );
  
}