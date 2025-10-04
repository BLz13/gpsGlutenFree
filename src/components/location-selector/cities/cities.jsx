// CitiesSelector.jsx

import './cities.scss';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import { useCities } from '../../../hooks/location/location-selector/useCities';

export default function CitiesSelector({ citySelected, municipality, onSelect }) {
    
  const { cities, loading } = useCities(municipality);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking/tapping outside
  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [open]);

  const disabled = !municipality;

  const handlePointerDownToggle = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      setOpen((prev) => !prev);
    },
    [disabled]
  );

  const handleCitySelect = useCallback(
    (cityId, e) => {
      e.stopPropagation(); // prevent container toggle from also firing
      onSelect(cityId);
      setOpen(false);
    },
    [onSelect]
  );

  // Normalize selected value
  const selectValue = useMemo(() => {
    if (!cities || cities.length === 0) return citySelected ?? '';
    if (citySelected == null || citySelected === '') return '';

    const byId = cities.find((c) => String(c.id) === String(citySelected));
    if (byId) return String(byId.id);

    const byName = cities.find(
      (c) => String(c.name).toLowerCase() === String(citySelected).toLowerCase()
    );
    if (byName) return String(byName.id);

    return '';
  }, [cities, citySelected]);

  const citiesList = useMemo(() => {
    if (!cities || cities.length === 0) return null;
    return cities
      .filter((c) => String(c.id) !== selectValue)
      .map((city) => (
        <button
          key={city.id}
          type="button"
          className="option"
          onPointerDown={(e) => handleCitySelect(city.id, e)}
          role="option"
          aria-selected="false"
        >
          {city.name}
        </button>
      ));
  }, [cities, selectValue, handleCitySelect]);

  const selectedCity = useMemo(() => {
    return cities?.find((c) => String(c.id) === selectValue)?.name ?? null;
  }, [cities, selectValue]);

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [disabled]
  );

  if (loading) {
    return <div className="cities-selector">Cargando ciudades...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`location-selector ${open ? 'open' : ''} ${
        disabled ? 'disabled' : ''
      }`}
      onPointerDown={handlePointerDownToggle}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      tabIndex={disabled ? -1 : 0}
    >
      <span className="selected">{selectedCity || 'Seleccionar ciudad'}</span>

      <div
        className="list-options"
        role="listbox"
        aria-activedescendant={selectValue || undefined}
      >
        {citiesList}
      </div>

      <Chevron className="arrow-down" />
    </div>
  );
}
