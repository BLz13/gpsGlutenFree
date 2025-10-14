// MunicipalitiesSelector.jsx

import './municipalities.scss';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Chevron from '../../../../../assets/svg/chevron-down.svg?react';
import { useCurrentLocation } from '../../../../../hooks/context/useCurrentLocation';
import { useMunicipalities } from '../../../../../hooks/location/location-selector/useMunicipalities';

export default function MunicipalitiesSelector() {

  // Get location from context (raw location object)
  const location = useCurrentLocation();

  // Derive province name from location for the municipalities fetch
  const province = location?.ubicacion?.provincia?.nombre;

  const { municipalities, loading } = useMunicipalities(province);

  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);
  const userTouchedRef = useRef(false);

  const initialMunicipality = useMemo(() => {
    const name = location?.ubicacion?.municipio?.nombre;
    if (name) return name;
  }, [location]);

  const [selectedMunicipality, setSelectedMunicipality] = useState(initialMunicipality);

  // Sync initial selection from context when location first arrives (but do not overwrite after user touches)
  useEffect(() => {
    if (!location) return;
    if (!userTouchedRef.current) {
      if (initialMunicipality) setSelectedMunicipality(initialMunicipality);
    }
  }, [location, initialMunicipality]);

  // Close when clicking/tapping outside (pointerdown)
  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [open]);

  const disabled = !province

  const handlePointerDownToggle = useCallback((e) => {
    if (disabled) return;
    e.preventDefault();
    setOpen(prev => !prev);
  }, [disabled]);

  const handleMunicipalitySelect = useCallback((municipalityIdOrName, e) => {
    e.stopPropagation();
    userTouchedRef.current = true;
    setSelectedMunicipality(String(municipalityIdOrName));
    setOpen(false);
  }, []);

  // Compute selectValue normalized to an id string when possible, else use name string
  const selectValue = useMemo(() => {
    if (!municipalities || municipalities.length === 0) return selectedMunicipality ?? '';
    return String(selectedMunicipality);
  }, [municipalities, selectedMunicipality]);

  const municipalitiesList = useMemo(() => {
    if (!municipalities || municipalities.length === 0) return null;
    return municipalities
      .filter( m => String(m.id) !== selectValue )
      .map(municipality => (
        <button
          key={municipality.id}
          type="button"
          className="option"
          onPointerDown={(e) => handleMunicipalitySelect(municipality.id, e)}
          role="option"
          aria-selected="false"
        >
          {municipality.name}
        </button>
      ));
  }, [municipalities, selectValue, handleMunicipalitySelect]);

  const selectedMunicipalityName = useMemo(() => {
    const muni = municipalities?.find(m => String(m.name).toLowerCase() === String(selectValue).toLowerCase());
    if (muni) return muni;
    return (selectedMunicipality && String(selectedMunicipality)) || null;
  }, [municipalities, selectValue, selectedMunicipality]);

  if (loading) {
    return <div className='location-selector'>Cargando municipios...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`location-selector ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
      onPointerDown={handlePointerDownToggle}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <span className='selected'>{selectedMunicipalityName}</span>

      <div className='list-options' role="listbox" aria-activedescendant={selectValue || undefined}>
        {municipalitiesList}
      </div>

      <Chevron className='arrow-down' />
    </div>
  );
}
