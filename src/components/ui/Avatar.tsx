/**
 * @file Avatar.tsx
 * @description Renders the user profile avatar badge.
 */

import React from "react";

/**
 * Avatar component displaying user initials.
 */
export const Avatar: React.FC = () => {
  return (
    <div
      className="w-7 h-7 rounded-full bg-border hover:bg-borderHover border border-border flex items-center justify-center font-semibold text-xs text-textSecondary hover:text-textPrimary select-none transition-colors duration-150 cursor-pointer"
      aria-label="User profile"
    >
      M
    </div>
  );
};
export default Avatar;
