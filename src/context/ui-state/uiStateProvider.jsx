import { UIStateContext } from "./uiStateContext";
import { useMemo } from "react";

export default function UIStateProvider({ children }) {

  const value = useMemo( () => ({
    menuState: false,
    locationState: false,
  }), []);

  return (
    <UIStateContext.Provider value={value}>
      {children}
    </UIStateContext.Provider>
  );
  
}
