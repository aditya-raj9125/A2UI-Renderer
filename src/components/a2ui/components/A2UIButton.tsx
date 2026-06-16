/**
 * @file A2UIButton.tsx
 * @description Interactive button mapping to A2UI Button specification, with dynamic Lucide icon rendering.
 */

import React from "react";
import * as Icons from "lucide-react";
import { A2UIButtonComponent } from "../types/a2ui.types";
import { useA2UIInteraction } from "./A2UIContext";

interface A2UIButtonProps {
  component: A2UIButtonComponent;
}

/**
 * Button component sending click events back to the parent interaction context.
 */
export const A2UIButton: React.FC<A2UIButtonProps> = ({ component }) => {
  const { id, label, variant, size, action, disabled, icon } = component;
  const { onInteraction } = useA2UIInteraction();

  // Dynamically resolve the Lucide icon if specified
  const IconComponent = icon
    ? (Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>)
    : null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    onInteraction({
      type: "button_click",
      componentId: id,
      action: action,
    });
  };

  // Styles mapping
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-accent hover:bg-accentHover text-white shadow-sm hover:shadow shadow-accent/20 border border-transparent";
      break;
    case "secondary":
      variantClasses =
        "bg-surface border border-border text-textPrimary hover:bg-bg/40 shadow-sm";
      break;
    case "ghost":
      variantClasses = "bg-transparent text-textSecondary hover:bg-bg/40 hover:text-textPrimary";
      break;
    case "danger":
      variantClasses =
        "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow shadow-red-500/20 border border-transparent";
      break;
  }

  let sizeClasses = "";
  switch (size) {
    case "sm":
      sizeClasses = "px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5";
      break;
    case "md":
      sizeClasses = "px-4.5 py-2 text-sm font-semibold rounded-xl gap-2";
      break;
    case "lg":
      sizeClasses = "px-6 py-3 text-base font-semibold rounded-2xl gap-2.5";
      break;
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-sans tracking-wide active:scale-98 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer ${variantClasses} ${sizeClasses}`}
      aria-label={label}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      <span>{label}</span>
    </button>
  );
};
export default A2UIButton;
