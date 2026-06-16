/**
 * @file A2UICard.tsx
 * @description Standard visual card layout with headers and border variant settings.
 */

import React from "react";
import { A2UICardComponent, A2UIComponent } from "../types/a2ui.types";

interface A2UICardProps {
  component: A2UICardComponent;
  renderChild: (child: A2UIComponent) => React.ReactNode;
}

/**
 * Standard Card card component.
 */
export const A2UICard: React.FC<A2UICardProps> = ({ component, renderChild }) => {
  const { title, subtitle, variant, children } = component;

  let variantClasses = "";
  switch (variant) {
    case "default":
      variantClasses = "border border-border bg-surface shadow-sm";
      break;
    case "elevated":
      variantClasses = "border border-transparent bg-surface shadow-md";
      break;
    case "outlined":
      variantClasses = "border border-border bg-transparent";
      break;
    case "success":
      variantClasses = "border border-green-500/20 bg-green-500/5 shadow-sm shadow-green-500/5";
      break;
    case "warning":
      variantClasses = "border border-amber-500/20 bg-amber-500/5 shadow-sm shadow-amber-500/5";
      break;
    case "error":
      variantClasses = "border border-red-500/20 bg-red-500/5 shadow-sm shadow-red-500/5";
      break;
  }

  return (
    <div className={`p-5 rounded-2xl w-full font-sans transition-all duration-200 ${variantClasses}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-md md:text-lg font-bold text-textPrimary tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-textSecondary font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children && children.length > 0 && (
        <div className="flex flex-col gap-3">
          {children.map((child) => (
            <React.Fragment key={child.id}>
              {renderChild(child)}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
export default A2UICard;
