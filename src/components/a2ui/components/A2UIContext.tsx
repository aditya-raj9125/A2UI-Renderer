/**
 * @file A2UIContext.tsx
 * @description Provides React Contexts for rendering A2UI components and tracking form state.
 */

import { createContext, useContext } from "react";
import { A2UIInteractionEvent } from "../types/a2ui.types";
import { A2UIState } from "../hooks/useA2UIState";

// Context to bubble up interaction events (button clicks, form submits)
export interface A2UIInteractionContextType {
  onInteraction: (event: A2UIInteractionEvent) => void;
}

export const A2UIInteractionContext = createContext<A2UIInteractionContextType | null>(null);

export const useA2UIInteraction = () => {
  const context = useContext(A2UIInteractionContext);
  if (!context) {
    throw new Error("useA2UIInteraction must be used within an A2UIInteractionContext.Provider");
  }
  return context;
};

// Context for managing form field values
export const A2UIFormStateContext = createContext<A2UIState | null>(null);

export const useA2UIFormState = () => {
  return useContext(A2UIFormStateContext);
};
