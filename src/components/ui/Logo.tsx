/**
 * @file Logo.tsx
 * @description Renders the ThinkAI branding and icon.
 */

import React from "react";

/**
 * Logo component for the navbar.
 */
export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="w-7 h-7 rounded-lg bg-surface border border-border flex items-center justify-center shadow-sm bg-gradient-to-br from-surface to-bg">
        {/* Sleek chat bubble with intelligent core dot */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 text-accent"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.765 5.99 5.99 0 0 1 1.524-2.83C4.07 16.186 3 14.22 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          />
        </svg>
      </div>
      <span className="text-base font-bold tracking-tight text-textPrimary">
        ThinkAI
      </span>
    </div>
  );
};
export default Logo;
