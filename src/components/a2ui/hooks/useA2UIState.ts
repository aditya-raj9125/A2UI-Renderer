/**
 * @file useA2UIState.ts
 * @description Custom hook for managing form input states in A2UI Forms.
 */

import { useState, useCallback } from "react";

export interface A2UIState {
  values: Record<string, unknown>;
  setValue: (name: string, value: unknown) => void;
  getValue: (name: string) => unknown;
  resetForm: () => void;
  getFormValues: () => Record<string, unknown>;
}

/**
 * Hook to manage A2UI Form field states.
 * @param initialValues Optional initial field values
 */
export function useA2UIState(initialValues: Record<string, unknown> = {}): A2UIState {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);

  const setValue = useCallback((name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const getValue = useCallback((name: string) => {
    return values[name];
  }, [values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const getFormValues = useCallback(() => {
    return values;
  }, [values]);

  return {
    values,
    setValue,
    getValue,
    resetForm,
    getFormValues,
  };
}
