// selectors.jsx

import './selector.scss';

import { useEffect, useRef, useState } from 'react';

import CitiesSelector from './cities/cities';
import MunicipalitiesSelector from './municipalities/municipalities';
import ProvincesSelector from './provinces/provinces';

export default function LocationSelectors({
  location,
  locationFilterClass,
  closeLocationFilter
}) {

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // mark whether the user manually changed any selector
  const userTouchedRef = useRef(false);

  // store previous coords so we can detect "big moves"
  const prevCoordsRef = useRef({ lat: null, lng: null });

  useEffect(() => {

    if (!location) return;

    const provinciaName =
        location?.ubicacion?.provincia?.nombre ??
        location?.provincia?.nombre ??
        location?.province?.name ??
        null;

    const municipioName =
        location?.ubicacion?.municipio?.nombre ??
        location?.municipio?.nombre ??
        location?.departamento?.nombre ??
        null;

    const cityName =
        location?.ubicacion?.localidad?.nombre ??
        location?.localidad?.nombre ??
        location?.city?.name ??
        null;

    // detect coords from the location object (adjust path to where coords live)
    const lat = location?.ubicacion?.centroide?.lat ?? location?.latitude ?? null;
    const lng = location?.ubicacion?.centroide?.lon ?? location?.longitude ?? null;

    // helper to compute a small move threshold (in degrees)
    const movedFarEnough = (oldLat, oldLng, newLat, newLng, delta = 0.05) => {
        if (oldLat == null || oldLng == null) return true;
        return Math.abs(oldLat - newLat) > delta || Math.abs(oldLng - newLng) > delta;
    };

    // If the user hasn't manually touched the selectors, set them from the new location
    if (!userTouchedRef.current) {
        if (provinciaName) setSelectedProvince(provinciaName);
        if (municipioName) setSelectedMunicipality(municipioName);
        if (cityName) setSelectedCity(cityName);
    } else {
        // Optional: if device moved a lot, reset userTouched so we resume auto-updating
        if (lat != null && lng != null) {
        const { lat: oldLat, lng: oldLng } = prevCoordsRef.current;
        if (movedFarEnough(oldLat, oldLng, lat, lng, 0.1)) { // ~11km threshold; adjust as needed
            userTouchedRef.current = false; // allow auto updates again
            if (provinciaName) setSelectedProvince(provinciaName);
            if (municipioName) setSelectedMunicipality(municipioName);
            if (cityName) setSelectedCity(cityName);
        }
        }
    }

    // store current coords for next comparison
    if (lat != null && lng != null) {
        prevCoordsRef.current = { lat, lng };
    }

  }, [location]);

  // wrapped setters that mark the user as having interacted
  const handleProvinceSelect = (value) => {
    userTouchedRef.current = true;
    setSelectedProvince(value);
  };
  const handleMunicipalitySelect = (value) => {
    userTouchedRef.current = true;
    setSelectedMunicipality(value);
  };
  const handleCitySelect = (value) => {
    userTouchedRef.current = true;
    setSelectedCity(value);
  };

  const handleClickBackdrop = () => {
    closeLocationFilter();
  };

  return (
    <div className={`location-selector-cnt ${locationFilterClass}`}>
      <ProvincesSelector
        provinceSelected={selectedProvince}
        onSelect={handleProvinceSelect}
      />
      <MunicipalitiesSelector
        municipalitySelected={selectedMunicipality}
        province={selectedProvince}
        onSelect={handleMunicipalitySelect}
      />
      <CitiesSelector
        citySelected={selectedCity}
        municipality={selectedMunicipality}
        onSelect={handleCitySelect}
      />
      <div
        onClick={handleClickBackdrop}
        onTouchEnd={handleClickBackdrop}
        className='backdrop-location-selector'
      />
    </div>
  );
}
