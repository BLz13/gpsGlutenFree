/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';

import { fetchLocation } from '../../services/indec/endpoints/location';

/**
 * useLocation
 * - Accepts coords: { lat, long, default }
 * - Performs ONE reverse-geocode request when real coords arrive (coords.default === false).
 * - Merges fetched data into the returned `location` state object.
 * - Returns { location, error }.
 */
export const useLocation = (coords) => {
  // Use React state so consumers update when data arrives
  const [location, setLocation] = useState(coords);

  const [error, setError] = useState(null);
  const fetchedForRef = useRef({ lat: null, long: null });

  useEffect(() => {
    // If coords missing or still default fallback, do nothing (keep initial state)
    if (!coords || coords.default) {
      // keep location in sync with coords (optional)
      setLocation((prev) => ({ ...prev, ...coords }));
      return;
    }

    // Avoid refetching for the same coords
    if (
      fetchedForRef.current.lat === coords.lat &&
      fetchedForRef.current.long === coords.long
    ) {
      return;
    }

    let cancelled = false;

    const getLocationDetails = async () => {
      try {
        console.debug('useLocation: fetching for coords', { lat: coords.lat, long: coords.long });

        // fetchLocation expects an object with lat/long per your helper
        const locationData = await fetchLocation({ lat: coords.lat, long: coords.long });

        if (cancelled) return;

        // Validate response shape if needed
        if (!locationData || typeof locationData !== 'object') {
          throw new Error('Invalid API response for location');
        }

        // Merge coords + fetched data into state
        setLocation((prev) => ({
          ...prev,
          ...coords,
          ...locationData,
        }));

        // remember we've fetched for these coords
        fetchedForRef.current = { lat: coords.lat, long: coords.long };
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading location:', err);
        setError(err?.message ?? String(err));
      }
    };

    getLocationDetails();

    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.long, coords?.default]);

  return {
    location,
    error,
  };
};
