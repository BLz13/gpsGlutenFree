import './municipalities.scss';

import { useMunicipalities } from '../../../hooks/location/location-selector/useMunicipalities';

export default function MunicipalitiesSelector( { province, onSelect } ) {

    const { municipalities, loading } = useMunicipalities(province);

    const municipalitiesList = () => {
        if (municipalities && municipalities.length > 0) {
        return municipalities.map(municipality => (
            <option key={municipality.id} value={municipality.id}>
            {municipality.name}
            </option>
        ));
        }
        return null;
    };

    if (loading) {
        return (
            <div className='selectors-loading'>Loading municipalities...</div>
        );
    }

    return (
        <select
            onChange={(e) => onSelect(e.target.value)}
            disabled={!province}
            className='municipalities-selector'
        >
        <option value="">Select a municipality</option>
            {municipalitiesList()}
        </select>
    );

}