/**
 * @file A2UIText.tsx
 * @description Renders typographic items matching the A2UI Text specification.
 */

import React from "react";
import { A2UITextComponent } from "../types/a2ui.types";

interface A2UITextProps {
  component: A2UITextComponent;
}

/**
 * Text renderer supporting multiple sizes, fonts and layouts.
 */
export const A2UIText: React.FC<A2UITextProps> = ({ component }) => {
  const { content, variant, bold, style } = component;

  let baseStyles = "";
  switch (variant) {
    case "heading":
      baseStyles = "text-lg md:text-xl font-bold tracking-tight text-textPrimary";
      break;
    case "subheading":
      baseStyles = "text-sm md:text-md font-semibold text-textSecondary";
      break;
    case "body":
      baseStyles = "text-sm text-textPrimary/90 leading-relaxed";
      break;
    case "caption":
      baseStyles = "text-xs text-textSecondary/80 leading-normal";
      break;
    case "label":
      baseStyles = "text-xs font-semibold text-textPrimary tracking-wide block mb-1";
      break;
  }

  const textAlignment =
    style?.alignment === "center"
      ? "text-center"
      : style?.alignment === "right"
      ? "text-right"
      : "text-left";

  const isBold = bold ? "font-bold" : "";

  return (
    <span className={`${baseStyles} ${textAlignment} ${isBold} block transition-colors duration-150`}>
      {content}
    </span>
  );
};
export default A2UIText;
