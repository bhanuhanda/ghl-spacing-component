import { createContext } from "react";
import type { ContextValue } from "../types";

export const StateContext = createContext<ContextValue>({} as ContextValue);
