/**
 * @file A2UICheckbox.tsx
 * @description Interactive checkbox component for A2UI forms.
 */

import React, { useEffect } from "react";
import { A2UICheckboxComponent } from "../types/a2ui.types";
import { useA2UIFormState } from "./A2UIContext";

interface A2UICheckboxProps {
  component: A2UICheckboxComponent;
}

/**
 * Checkbox component.
 */
export const A2UICheckbox: React.FC<A2UICheckboxProps> = ({ component }) => {
  const { id, name, label, defaultChecked, required } = component;
  const formState = useA2UIFormState();

  const currentValue = (formState?.getValue(name) as boolean) ?? defaultChecked ?? false;

  useEffect(() => {
    if (formState && formState.getValue(name) === undefined && defaultChecked !== undefined) {
      formState.setValue(name, defaultChecked);
    }
  }, [formState, name, defaultChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formState?.setValue(name, e.target.checked);
  };

  const inputId = `checkbox-${id}-${name}`;

  return (
    <div className="flex items-center gap-2.5 font-sans py-1 select-none">
      <input
        id={inputId}
        type="checkbox"
        checked={currentValue}
        onChange={handleChange}
        required={required}
        className="w-4.5 h-4.5 rounded border border-border bg-surface text-accent focus:ring-accent/20 accent-accent cursor-pointer transition duration-150"
      />
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-textPrimary/80 cursor-pointer"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};
export default A2UICheckbox;
