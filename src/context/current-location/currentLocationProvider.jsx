import { CurrentLocationContext } from "./currentLocationContext";
import { useCoordinates } from "../../hooks/location/useCoordinates";
import { useLocation } from "../../hooks/location/useLocation";
import { useMemo } from "react";

export default function CurrentLocationProvider({ children }) {

  const { coords } = useCoordinates();
  const { location } = useLocation(coords);

  const value = useMemo(() => ( location ?? null ), [location]);

  return (
    <CurrentLocationContext.Provider value={value}>
      {children}
    </CurrentLocationContext.Provider>
  );
  
}
