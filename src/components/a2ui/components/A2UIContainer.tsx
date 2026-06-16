/**
 * @file A2UIContainer.tsx
 * @description Layout container supporting vertical, horizontal, and grid alignments.
 */

import React from "react";
import { A2UIContainerComponent, A2UIComponent } from "../types/a2ui.types";

interface A2UIContainerProps {
  component: A2UIContainerComponent;
  renderChild: (child: A2UIComponent) => React.ReactNode;
}

/**
 * Flexible layouts block component.
 */
export const A2UIContainer: React.FC<A2UIContainerProps> = ({ component, renderChild }) => {
  const { layout, gap, children } = component;

  let layoutClasses = "";
  switch (layout) {
    case "vertical":
      layoutClasses = "flex flex-col";
      break;
    case "horizontal":
      layoutClasses = "flex flex-row flex-wrap items-center";
      break;
    case "grid":
      layoutClasses = "grid grid-cols-1 md:grid-cols-2";
      break;
  }

  let gapClasses = "";
  switch (gap) {
    case "sm":
      gapClasses = "gap-2";
      break;
    case "md":
      gapClasses = "gap-4";
      break;
    case "lg":
      gapClasses = "gap-6";
      break;
    default:
      gapClasses = "gap-3";
  }

  return (
    <div className={`${layoutClasses} ${gapClasses} w-full`}>
      {children.map((child) => (
        <React.Fragment key={child.id}>
          {renderChild(child)}
        </React.Fragment>
      ))}
    </div>
  );
};
export default A2UIContainer;
