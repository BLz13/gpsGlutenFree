/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

import { fetchLocation } from '../../services/indec/endpoints/location';

export const useLocation = ( coords ) => {

    const currentCoords = coords;
    
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getLocationDetails = async () => {

            // Only proceed if we have valid coordinates
            if (!currentCoords?.latitude || !currentCoords?.longitude) {
                return;
            }

            try {
                const locationData = await fetchLocation(currentCoords);
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

    console.log('useLocation hook - coords:', coords);

    return {
        location,
        loading,
        error
    };
};