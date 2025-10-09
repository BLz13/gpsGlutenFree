// ProvincesSelector.jsx

import './provinces.scss';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import { useCurrentLocation } from '../../../hooks/context/useCurrentLocation';
import { useProvinces } from '../../../hooks/location/location-selector/useProvinces';

export default function ProvincesSelector() {

  // useCurrentLocation returns the raw location object (per your request)
  const location = useCurrentLocation();

  const { provinces, loading } = useProvinces();

  const containerRef = useRef(null);
  const userTouchedRef = useRef(false); // marks manual user selection

  // initial province (prefill if location is already available)
  const [province, setProvince] = useState(() => {
    return location?.ubicacion?.provincia?.nombre ?? location?.provincia?.nombre ?? '';
  });
  const [open, setOpen] = useState(false);

  // sync initial province when location first arrives, but do not overwrite user choice
  useEffect(() => {
    if (!location) return;
    if (!userTouchedRef.current) {
      const provinciaName =
        location?.ubicacion?.provincia?.nombre ??
        location?.provincia?.nombre ??
        '';
      if (provinciaName) setProvince(provinciaName);
    }
  }, [location]);

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

  // Toggle dropdown on pointerdown (mobile-friendly)
  const handlePointerDownToggle = useCallback((e) => {
    // prevent opening while provinces are loading
    if (loading) return;
    e.preventDefault();
    setOpen(prev => !prev);
  }, [loading]);

  // user selects a province
  const handleProvinceSelect = useCallback((provinceName, e) => {
    e.stopPropagation();
    userTouchedRef.current = true;
    setProvince(provinceName);
    setOpen(false);
  }, []);

  // Build list excluding currently selected province
  const provincesList = useMemo(() => {
    if (!provinces || provinces.length === 0) return null;
    return provinces
      .filter(p => String(p.name) !== String(province))
      .map(p => (
        <button
          key={p.id}
          type="button"
          className="option"
          onPointerDown={(e) => handleProvinceSelect(p.name, e)}
          role="option"
          aria-selected={String(p.name) === String(province)}
        >
          {p.name}
        </button>
      ));
  }, [provinces, province, handleProvinceSelect]);

  if (loading) {
    return <div className='location-selector'>Cargando provincias...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`location-selector ${open ? 'open' : ''}`}
      onPointerDown={handlePointerDownToggle}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
    >
      <span className='selected'>{province || 'Seleccionar provincia'}</span>

      <div className='list-options' role="listbox" aria-activedescendant={undefined}>
        {provincesList}
      </div>

      <Chevron className='arrow-down' />
    </div>
  );
  
}
