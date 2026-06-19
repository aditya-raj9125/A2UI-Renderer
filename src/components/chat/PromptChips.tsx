/**
 * @file PromptChips.tsx
 * @description Suggestions pill-button row with 16 A2UI-focused prompts and refresh mechanics.
 */

import React, { useState } from "react";
import { RotateCw } from "lucide-react";

const ALL_PROMPTS = [
  "Get fresh perspectives on tricky problems",
  "Brainstorm creative ideas",
  "Rewrite message for maximum impact",
  "Summarize key points",
  "Create a sales analytics dashboard with a bar graph",
  "Design a user registration form with username and password",
  "Generate a checklist for a project launch",
  "Show a client details card with primary and ghost buttons",
  "Plot a line chart showing company growth over 6 months",
  "Build a customer feedback form with select and checkboxes",
  "Create an interactive product search interface",
  "Show a project status board with multiple cards",
  "Render a pie chart showing traffic channel breakdown",
  "Design a pricing checkout layout with selection options",
  "Create a team collaboration tasks container",
  "Generate a settings panel with checkbox configurations",
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
    // Ensure we pick 4 distinct prompts
    setCurrentPrompts(shuffled.slice(0, 4));
    
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-4 flex flex-col items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {currentPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onChipSelect(prompt)}
            className="p-4.5 text-left text-[13px] md:text-sm font-medium border border-cardBorder bg-cardBg hover:bg-surface hover:border-borderHover text-textPrimary rounded-xl transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 min-h-[82px] flex items-center leading-snug cursor-pointer group"
          >
            <span className="group-hover:text-accent transition-colors duration-150">
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
