/**
 * @file PromptChips.tsx
 * @description Suggestions pill-button row with 16 A2UI-focused prompts and robust word-wrapping styles.
 */

import React, { useState } from "react";
import { RotateCw } from "lucide-react";

const ALL_PROMPTS = [
  "Render a real-time sales dashboard with a bar chart",
  "Generate a user signup form with validation options",
  "Show a project roadmap checklist for product release",
  "Create a product inventory card with interaction buttons",
  "Plot a line chart tracking system latency over 24 hours",
  "Build a customer satisfaction survey with select dropdowns",
  "Create a team task board using horizontal layout containers",
  "Render a pie chart representing marketing budget allocation",
  "Generate a contact details card with primary and ghost actions",
  "Create a settings panel with checkboxes and toggle elements",
  "Design an analytics container combining text and a line graph",
  "Build a checkout form with payment selection options",
  "Create a feedback card with action button events",
  "Render a grid layout displaying system health metrics",
  "Generate a line graph showing website pageviews",
  "Create an employee onboarding form with select inputs"
];

interface PromptChipsProps {
  onChipSelect: (prompt: string) => void;
}

/**
 * Renders selectable quick prompt suggestions matching the screenshot layout.
 */
export const PromptChips: React.FC<PromptChipsProps> = ({ onChipSelect }) => {
  const [currentPrompts, setCurrentPrompts] = useState<string[]>(ALL_PROMPTS.slice(0, 4));
  const [isRotating, setIsRotating] = useState(false);

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRotating(true);
    
    // Shuffle prompts
    const shuffled = [...ALL_PROMPTS].sort(() => 0.5 - Math.random());
    setCurrentPrompts(shuffled.slice(0, 4));
    
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-6 sm:px-8 flex flex-col items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {currentPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onChipSelect(prompt)}
            className="w-full px-4 py-3 text-center justify-center text-xs md:text-[12.5px] font-medium border border-cardBorder bg-cardBg hover:bg-surface hover:border-borderHover text-textPrimary rounded-xl transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 min-h-[84px] flex items-center leading-normal cursor-pointer group whitespace-normal break-words"
          >
            <span className="group-hover:text-accent transition-colors duration-150 w-full break-words text-center">
              {prompt}
            </span>
          </button>
        ))}
      </div>
      
      <button
        onClick={handleRefresh}
        className="mt-3.5 text-xs font-medium text-textSecondary hover:text-textPrimary flex items-center gap-1.5 select-none transition-colors duration-150 cursor-pointer ml-1"
        aria-label="Refresh suggestive prompts"
      >
        <RotateCw className={`w-3 h-3 transition-transform duration-500 ease-out ${isRotating ? "rotate-180" : ""}`} />
        <span>Refresh prompts</span>
      </button>
    </div>
  );
};

export default PromptChips;
