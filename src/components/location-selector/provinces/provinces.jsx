// ProvincesSelector.jsx

import './provinces.scss';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import { useProvinces } from '../../../hooks/location/location-selector/useProvinces';

export default function ProvincesSelector({ provinceSelected, onSelect }) {
  
  const { provinces, loading } = useProvinces();

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

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

  const handlePointerDownToggle = useCallback((e) => {
    // open/close before the document handler runs (pointerdown on target runs first)
    e.preventDefault();
    setOpen(prev => !prev);
  }, []);

  const handleProvinceSelect = useCallback((provinceName, e) => {
    e.stopPropagation();               // prevent container pointerdown toggling again
    onSelect(provinceName);
    setOpen(false);
  }, [onSelect]);

  const provincesList = useMemo(() => {
    if (!provinces || provinces.length === 0) return null;
    return provinces
      .filter(p => String(p.name) !== String(provinceSelected))
      .map(province => (
        <button
          key={province.id}
          type="button"
          className="option"
          onPointerDown={(e) => handleProvinceSelect(province.name, e)}
          role="option"
          aria-selected="false"
        >
          {province.name}
        </button>
      ));
  }, [provinces, provinceSelected, handleProvinceSelect]);

  // keyboard: Enter/Space opens; Esc closes
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  if (loading) {
    return <div className='provinces-selector'>Cargando provincias...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`location-selector ${open ? 'open' : ''}`}
      onPointerDown={handlePointerDownToggle}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      tabIndex={0}
    >
      <span className='selected'>{provinceSelected || 'Seleccionar provincia'}</span>

      <div className='list-options' role="listbox" aria-activedescendant={undefined}>
        {provincesList}
      </div>

      <Chevron className='arrow-down' />
    </div>
  );
}
