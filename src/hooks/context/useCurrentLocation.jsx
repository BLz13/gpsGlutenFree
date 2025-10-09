import { CurrentLocationContext } from "../../context/current-location/currentLocationContext";
import { useContext } from "react";

export function useCurrentLocation() {

  const context = useContext(CurrentLocationContext);
  
  if (!context) {
    throw new Error("useCurrentLocation must be used within a CurrentLocationProvider");
  }

  return context;

}
