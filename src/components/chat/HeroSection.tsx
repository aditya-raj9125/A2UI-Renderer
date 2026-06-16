/**
 * @file HeroSection.tsx
 * @description Empty-state welcoming area with the signature glowing green orb.
 */

import React from "react";

interface HeroSectionProps {
  userName?: string;
}

/**
 * Empty-state landing header.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ userName = "Milovan" }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 md:py-12 px-4 select-none">
      {/* Centered glowing green orb */}
      <div className="w-16 h-16 md:w-20 md:h-20 green-orb mb-8 relative">
        {/* Subtle white radial highlight inside orb */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none" />
      </div>

      <h1 className="text-2xl md:text-3.5xl font-bold tracking-tight text-textPrimary mb-2 leading-tight">
        Good evening, {userName}
      </h1>
      <h2 className="text-xl md:text-2.5xl font-medium text-textSecondary mb-4">
        Can I help you with anything?
      </h2>

      <p className="text-sm text-textSecondary/80 max-w-md">
        Choose a prompt below or write your own to start chatting with ThinkAI
      </p>
    </div>
  );
};
export default HeroSection;
