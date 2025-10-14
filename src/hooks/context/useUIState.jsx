import { UIStateContext } from "../../context/ui-state/uiStateContext";
import { useContext } from "react";

export function useUIState() {

  const ctx = useContext(UIStateContext);

  if (!ctx) throw new Error("useUIState must be used within a UIStateProvider");
  
  return ctx;

}
