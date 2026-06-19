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
export const HeroSection: React.FC<HeroSectionProps> = () => {
  // Determine greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  return (
    <div className="flex flex-col items-center justify-center text-center pt-8 pb-6 md:pt-12 md:pb-8 px-4 select-none">
      {/* Centered glowing green orb */}
      <div className="w-14 h-14 md:w-16 md:h-16 green-orb mb-7 relative shadow-2xl">
        {/* Subtle white glossy light reflection overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/25 pointer-events-none" />
      </div>

      <h1 className="text-3xl md:text-[34px] font-semibold tracking-tight text-textPrimary leading-tight">
        {getGreeting()}
      </h1>
      <h2 className="text-2.5xl md:text-[30px] font-semibold tracking-tight text-textPrimary mt-1.5 mb-3.5 leading-tight">
        What shall we create today?
      </h2>

      <p className="text-xs md:text-[13px] text-textSecondary max-w-lg font-normal leading-relaxed px-4">
        AuraUI is an Agent-to-User Interface (A2UI) system. I can dynamically render rich,
        <br className="hidden sm:inline" /> interactive dashboards, analytics, forms, and charts directly in your chat.
      </p>
    </div>
  );
};
export default HeroSection;
