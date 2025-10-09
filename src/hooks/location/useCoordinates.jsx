import { useEffect, useRef, useState } from 'react';

/**
 * useCoordinates (single estimate only, no loading)
 * - Performs ONE getCurrentPosition on mount (no watch, no retries).
 * - Requests a low-cost estimate (enableHighAccuracy: false) and allows cached results.
 * - Returns: { coords, error }
 *
 * coords shape:
 * { lat, long, default }  // default === true when using built-in fallback coords
 */

export const useCoordinates = () => {

  // sensible default (Santa Rosa, La Pampa)
  const DEFAULT = { lat: -36.6167, long: -64.2833 };

  const [coords, setCoords] = useState({
    lat: DEFAULT.lat,
    long: DEFAULT.long,
    default: true,
  });

  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {

    mountedRef.current = true;

    if (!('geolocation' in navigator)) {
      if (mountedRef.current) {
        setError('Geolocation is not supported by your browser');
      }
      return () => { mountedRef.current = false; };
    }

    // Low-cost options: prefer a fast, coarse estimate or a cached one.
    const options = {      
      enableHighAccuracy: false, // coarse, quicker, lower battery cost
      timeout: 10000,             // 10s timeout
      maximumAge: 1000 * 60 * 10 // accept cached positions up to 10 minutes old
    };

    const success = (position) => {

      if (!mountedRef.current) return;

      const lat = Number(position.coords.latitude);
      const long = Number(position.coords.longitude);

      setCoords({
        lat,
        long,
        default: false,
      });
      setError(null);

    };

    const failure = (err) => {

      if (!mountedRef.current) return;
      console.warn('Geolocation error:', err?.message || err);
      setError(err?.message || 'Unable to retrieve location');
      // keep default coords in place

    };

    try {
      navigator.geolocation.getCurrentPosition(success, failure, options);
    } catch (e) {
      failure(e);
    }

    return () => {
      mountedRef.current = false;
    };

  }, []);

  return {
    coords, // { lat, long, default }
    error,
  };
};
