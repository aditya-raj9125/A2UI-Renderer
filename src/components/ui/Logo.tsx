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
      <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-md shadow-accent/20">
        {/* Subtle grid/brain SVG symbol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-white"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 21m0 0l-.813-5.096m.813 5.1V15m10.187 0.904L21 21m0 0l-.813-5.096m.813 5.1V15M12 18.75V15m-5.25-6h10.5m-10.5 3h10.5m-11.25-6h12m-12 9h12"
          />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight text-textPrimary">
        ThinkAI
      </span>
    </div>
  );
};
export default Logo;
