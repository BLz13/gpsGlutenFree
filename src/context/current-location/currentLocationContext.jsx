import { createContext } from "react";

// context default is undefined so the consumer hook can throw when used outside provider
export const CurrentLocationContext = createContext(undefined);