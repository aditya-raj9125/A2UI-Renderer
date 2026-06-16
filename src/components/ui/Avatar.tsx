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
      className="w-8 h-8 rounded-full bg-border flex items-center justify-center font-medium text-sm text-textSecondary select-none"
      aria-label="User profile"
    >
      M
    </div>
  );
};
export default Avatar;
