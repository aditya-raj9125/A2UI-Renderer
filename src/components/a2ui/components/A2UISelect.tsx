/**
 * @file A2UISelect.tsx
 * @description Dropdown select input component for A2UI forms.
 */

import React from "react";
import { A2UISelectComponent } from "../types/a2ui.types";
import { useA2UIFormState } from "./A2UIContext";

interface A2UISelectProps {
  component: A2UISelectComponent;
}

/**
 * Select input component.
 */
export const A2UISelect: React.FC<A2UISelectProps> = ({ component }) => {
  const { id, name, label, options, placeholder, required } = component;
  const formState = useA2UIFormState();

  const currentValue = (formState?.getValue(name) as string) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formState?.setValue(name, e.target.value);
  };

  const inputId = `select-${id}-${name}`;

  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      <label htmlFor={inputId} className="text-xs font-semibold text-textPrimary/80">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={inputId}
        value={currentValue}
        onChange={handleChange}
        required={required}
        className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-xl text-sm text-textPrimary outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all duration-200 cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default A2UISelect;
