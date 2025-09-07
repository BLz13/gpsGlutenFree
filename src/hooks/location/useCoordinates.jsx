/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

export const useCoordinates = () => {
  
  // Default coordinates for Santa Rosa, La Pampa
  const defaultCoords = {
    latitude: -36.6167,
    longitude: -64.2833
  };
  
  const [coords, setCoords] = useState(defaultCoords);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handlePositionSuccess = (position = 'gps/browser') => {

    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    setError(null);
    setLoading(false);
    
  };

  const handlePositionError = (err) => {

    console.warn('Location error:', err?.message || 'Unable to retrieve location');
    setError(err?.message || 'Unable to retrieve location');
    setCoords(defaultCoords); // Use default coordinates on error
    setLoading(false);

  };

  useEffect(() => {

    let watchId;

    if (!('geolocation' in navigator)) {
      setError("Geolocation is not supported by your browser");
      setCoords(defaultCoords);
      setLoading(false);
      return;
    }

    // Options: request GPS first (high accuracy), with sensible fallback
    const options = {
      enableHighAccuracy: true, // <– Always request best accuracy (forces GPS on mobile if available)
      timeout: 15000,           // 15s before failing
    };

    // First try to get the most precise position available
    navigator.geolocation.getCurrentPosition(

      (pos) => handlePositionSuccess(pos, isMobile ? 'gps' : 'browser'),

      (err) => {
        console.warn("High-accuracy getCurrentPosition failed, retrying with low-accuracy", err);

        // Retry without high accuracy as a fallback
        navigator.geolocation.getCurrentPosition(
          (pos) => handlePositionSuccess(pos, 'fallback'),
          handlePositionError,
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
      },

      options

    );

    // On mobile, keep tracking since people move
    if (isMobile) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => handlePositionSuccess(pos, 'gps'),
        handlePositionError,
        options
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };

  }, []);

  console.log('useCoordinates hook - coords:', coords);

  return {
    coords, // Will always have either user location or Santa Rosa coordinates
    error,
    loading,
  };
  
};
