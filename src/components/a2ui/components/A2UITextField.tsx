/**
 * @file A2UITextField.tsx
 * @description Standard form input field supporting text, password, textarea and validation checks.
 */

import React from "react";
import { A2UITextFieldComponent } from "../types/a2ui.types";
import { useA2UIFormState } from "./A2UIContext";

interface A2UITextFieldProps {
  component: A2UITextFieldComponent;
}

/**
 * Text field component binding with context Form State.
 */
export const A2UITextField: React.FC<A2UITextFieldProps> = ({ component }) => {
  const { id, name, label, placeholder, fieldType, required, validation } = component;
  const formState = useA2UIFormState();

  const currentValue = (formState?.getValue(name) as string) ?? "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let val: string | number = e.target.value;
    if (fieldType === "number") {
      val = val === "" ? "" : Number(val);
    }
    formState?.setValue(name, val);
  };

  const inputId = `input-${id}-${name}`;
  const sharedClasses =
    "w-full px-3.5 py-2.5 bg-surface border border-border rounded-xl text-sm text-textPrimary placeholder:text-textSecondary/40 outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all duration-200";

  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      <label htmlFor={inputId} className="text-xs font-semibold text-textPrimary/80">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {fieldType === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          minLength={validation?.min}
          maxLength={validation?.max}
          className={`${sharedClasses} min-h-[90px] resize-y`}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={fieldType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          min={fieldType === "number" ? validation?.min : undefined}
          max={fieldType === "number" ? validation?.max : undefined}
          pattern={validation?.pattern}
          className={sharedClasses}
        />
      )}
    </div>
  );
};
export default A2UITextField;
