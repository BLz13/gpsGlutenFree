import React, { useCallback, useMemo, useState } from "react";

import { UIStateContext } from "./uiStateContext";

export default function UIStateProvider({ children }) {
  
  const [menuState, setMenuState] = useState(false);
  const [locationState, setLocationState] = useState(false);

  // Open menu AND ensure location is closed
  const openMenu = useCallback(() => {
    setMenuState(true);
    setLocationState(false);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuState(false);
  }, []);

  // Toggle menu convenience
  const toggleMenu = useCallback(() => {
    setMenuState(prev => {
      const next = !prev;
      if (next) setLocationState(false); // when opening menu, close location
      return next;
    });
  }, []);

  // Open location and close menu
  const openLocation = useCallback(() => {
    setLocationState(true);
    setMenuState(false);
  }, []);

  const closeLocation = useCallback(() => {
    setLocationState(false);
  }, []);

  const toggleLocation = useCallback(() => {
    setLocationState(prev => {
      const next = !prev;
      if (next) setMenuState(false); // when opening location, close menu
      return next;
    });
  }, []);

  const value = useMemo(() => ({
    menuState,
    locationState,
    openMenu,
    closeMenu,
    toggleMenu,
    openLocation,
    closeLocation,
    toggleLocation,
  }), [
    menuState,
    locationState,
    openMenu,
    closeMenu,
    toggleMenu,
    openLocation,
    closeLocation,
    toggleLocation
  ]);

  return (
    <UIStateContext.Provider value={value}>
      {children}
    </UIStateContext.Provider>
  );
  
}
