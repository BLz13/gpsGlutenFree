import { useEffect, useState } from 'react';

import { fetchLocation } from '../../services/indec/endpoints/ubication';

export const useLocation = ( coords ) => {

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getLocationDetails = async () => {

            // Only proceed if we have valid coordinates
            if (!coords?.latitude || !coords?.longitude) {
                return;
            }

            try {
                const locationData = await fetchLocation(coords.latitude, coords.longitude);
                setLocation(locationData);
                setLoading(false);
            } catch (error) {
                console.error('Error loading location:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        getLocationDetails();
        
    }, [coords]);

    return {
        location,
        loading,
        error
    };
};