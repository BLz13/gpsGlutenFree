import { useEffect, useState } from 'react';

import { fetchCitiesByMunicipality } from '../../../services/indec/endpoints/cities';

export const useCities = ( municipality ) => {

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

   useEffect(() => {

    const getCities = async () => {
        
        if (!municipality) {
            setCities([]);
            return;
        }
        
        setLoading(true);
        
        try {
            const citiesData = await fetchCitiesByMunicipality(municipality);
            setCities(citiesData || []);
        }
        
        catch (error) {
            console.error('Error loading cities:', error);
            setCities([]);
        }
        
        finally {
            setLoading(false);
        }

    };

    getCities();

    }, [municipality]);

    return { cities, loading };
};