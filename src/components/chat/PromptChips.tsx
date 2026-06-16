/**
 * @file PromptChips.tsx
 * @description Suggestions pill-button row with prompt refreshing mechanics.
 */

import React, { useState } from "react";

const ALL_PROMPTS = [
  "Get fresh perspectives on tricky problems",
  "Brainstorm creative ideas",
  "Rewrite message for maximum impact",
  "Summarize key points",
  "Design a modern user dashboard layout",
  "Create an interactive analytics graph",
  "Generate a client contact details form",
  "Review my TypeScript code configurations",
];

interface PromptChipsProps {
  onChipSelect: (prompt: string) => void;
}

/**
 * Renders selectable quick prompt suggestions.
 */
export const PromptChips: React.FC<PromptChipsProps> = ({ onChipSelect }) => {
  const [currentPrompts, setCurrentPrompts] = useState<string[]>(ALL_PROMPTS.slice(0, 4));

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    // Shuffle prompts
    const shuffled = [...ALL_PROMPTS].sort(() => 0.5 - Math.random());
    setCurrentPrompts(shuffled.slice(0, 4));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {currentPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onChipSelect(prompt)}
            className="p-4 text-left text-sm font-medium border border-border bg-surface hover:bg-bg/40 text-textPrimary rounded-xl transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            {prompt}
          </button>
        ))}
      </div>
      <button
        onClick={handleRefresh}
        className="mt-3.5 text-xs text-textSecondary hover:text-textPrimary flex items-center gap-1 select-none transition-colors duration-150"
      >
        <span>↻</span> Refresh prompts
      </button>
    </div>
  );
};
export default PromptChips;
