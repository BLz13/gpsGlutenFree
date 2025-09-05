import { useEffect, useState } from 'react';

import { fetchMunicipalitiesByProvince } from '../../../services/indec/endpoints/municipalities';

export const useMunicipalities = ( province ) => {

    const [municipalities, setMunicipalities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    const getMunicipalities = async () => {
        
        if (!province) {
            setMunicipalities([]);
            return;
        }
        
        setLoading(true);
        
        try {
        const municipalitiesData = await fetchMunicipalitiesByProvince(province);
        setMunicipalities(municipalitiesData || []);
        }
        
        catch (error) {
        console.error('Error loading municipalities:', error);
        setMunicipalities([]);
        }
        
        finally {
        setLoading(false);
        }

    };

    getMunicipalities();

    }, [province]);

    return { municipalities, loading };
};