// MunicipalitiesSelector.jsx

import './municipalities.scss';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Chevron from '../../../assets/svg/chevron-down.svg?react';
import { useMunicipalities } from '../../../hooks/location/location-selector/useMunicipalities';

export default function MunicipalitiesSelector({ municipalitySelected, province, onSelect }) {
  
  const { municipalities, loading } = useMunicipalities(province);

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

  const disabled = !province;

  const handlePointerDownToggle = useCallback((e) => {
    if (disabled) return;
    e.preventDefault();
    setOpen(prev => !prev);
  }, [disabled]);

  const handleMunicipalitySelect = useCallback((municipalityId, e) => {
    e.stopPropagation(); // important: prevent container toggle from also firing
    onSelect(municipalityId);
    setOpen(false);
  }, [onSelect]);

  const selectValue = useMemo(() => {
    if (!municipalities || municipalities.length === 0) return municipalitySelected ?? '';
    if (municipalitySelected == null || municipalitySelected === '') return '';

    const byId = municipalities.find(m => String(m.id) === String(municipalitySelected));
    if (byId) return String(byId.id);

    const byName = municipalities.find(m => String(m.name).toLowerCase() === String(municipalitySelected).toLowerCase());
    if (byName) return String(byName.id);

    return '';
  }, [municipalities, municipalitySelected]);

  const municipalitiesList = useMemo(() => {
    if (!municipalities || municipalities.length === 0) return null;
    return municipalities
      .filter(m => String(m.id) !== selectValue)
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

  const selectedMunicipality = useMemo(() => {
    return municipalities?.find(m => String(m.id) === selectValue)?.name ?? null;
  }, [municipalities, selectValue]);

  const handleKeyDown = useCallback((e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }, [disabled]);

  if (loading) {
    return <div className='municipalities-selector'>Cargando municipios...</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`location-selector ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
      onPointerDown={handlePointerDownToggle}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      tabIndex={disabled ? -1 : 0}
    >
      <span className='selected'>{selectedMunicipality || 'Seleccionar municipio'}</span>

      <div className='list-options' role="listbox" aria-activedescendant={selectValue || undefined}>
        {municipalitiesList}
      </div>

      <Chevron className='arrow-down' />
    </div>
  );
}
