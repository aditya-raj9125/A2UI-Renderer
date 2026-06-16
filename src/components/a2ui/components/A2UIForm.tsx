/**
 * @file A2UIForm.tsx
 * @description Renders a sub-form managing text fields, checkboxes and select options using state provider hooks.
 */

import React from "react";
import { A2UIFormComponent, A2UIComponent } from "../types/a2ui.types";
import { useA2UIState } from "../hooks/useA2UIState";
import { A2UIFormStateContext, useA2UIInteraction } from "./A2UIContext";

interface A2UIFormProps {
  component: A2UIFormComponent;
  renderChild: (child: A2UIComponent) => React.ReactNode;
}

/**
 * Form wrapper binding field states and handling submissions.
 */
export const A2UIForm: React.FC<A2UIFormProps> = ({ component, renderChild }) => {
  const { id, title, submitLabel, action, children } = component;
  const formState = useA2UIState();
  const { onInteraction } = useA2UIInteraction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInteraction({
      type: "form_submit",
      componentId: id,
      action: action,
      payload: formState.getFormValues(),
    });
  };

  return (
    <A2UIFormStateContext.Provider value={formState}>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {title && (
          <h3 className="text-base font-bold text-textPrimary tracking-tight">
            {title}
          </h3>
        )}

        <div className="flex flex-col gap-3">
          {children.map((child) => (
            <React.Fragment key={child.id}>
              {renderChild(child)}
            </React.Fragment>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-accent hover:bg-accentHover text-white shadow-sm shadow-accent/20 cursor-pointer active:scale-98 transition-all duration-200"
        >
          {submitLabel}
        </button>
      </form>
    </A2UIFormStateContext.Provider>
  );
};
export default A2UIForm;
