/**
 * @file ChatInput.tsx
 * @description Rich glassmorphic chat input textarea with interactive tone selector dropdown and screenshot matching layout.
 */

import React, { useRef, useState, useEffect } from "react";
import { Camera, Paperclip, ChevronDown, Sparkles, Check } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const TONE_OPTIONS = ["Formal", "Creative", "Concise", "Casual"];

/**
 * Text area chat input component.
 */
export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [text, setText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Formal");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    if (text.trim() && !disabled) {
      // Append tone context if it's not Formal (standard behavior), or keep it simple
      onSendMessage(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const selectTone = (tone: string) => {
    setSelectedTone(tone);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-3 select-none relative z-20">
      <div className="border border-border bg-inputBg rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-borderHover transition-all duration-200 overflow-visible flex flex-col">
        {/* Input Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can ThinkAI help you today?"
          rows={1}
          disabled={disabled}
          className="w-full px-4.5 pt-4 pb-2 bg-transparent text-textPrimary text-sm md:text-[15px] outline-none resize-none min-h-[56px] max-h-[220px] leading-relaxed placeholder:text-textSecondary/40 border-0 focus:ring-0"
          aria-label="Prompt text input"
        />

        {/* Bottom toolbar inside input area - Seamless background layout (No border-t) */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1 relative">
          {/* Model Selector Pill & Interactive Dropdown */}
          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <div className="flex items-center gap-1.5 text-xs text-textSecondary font-normal pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-accent/80" />
              <span className="text-textSecondary/90 font-medium">ThinkAI 3.5 Smart</span>
            </div>
            
            {/* Tone Selector Button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-2.5 py-0.5 text-xs font-semibold text-badgeText bg-badgeBg border border-badgeBorder rounded-full flex items-center gap-0.5 hover:bg-badgeBg/80 transition-colors duration-150 cursor-pointer"
              aria-label="Select generation tone"
            >
              <span>{selectedTone}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Options Box */}
            {isDropdownOpen && (
              <div className="absolute left-[120px] bottom-full mb-1.5 w-32 bg-surface border border-border rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
                {TONE_OPTIONS.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => selectTone(tone)}
                    className="w-full px-3 py-1.5 text-left text-xs font-medium text-textPrimary hover:bg-bg flex items-center justify-between cursor-pointer"
                  >
                    <span>{tone}</span>
                    {selectedTone === tone && <Check className="w-3 h-3 text-accent" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 text-textSecondary">
            <button
              type="button"
              className="hover:text-textPrimary hover:scale-105 active:scale-95 transition-all p-1 cursor-pointer"
              aria-label="Upload photo"
            >
              <Camera className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              className="hover:text-textPrimary hover:scale-105 active:scale-95 transition-all p-1 cursor-pointer"
              aria-label="Attach file"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Helper footnotes */}
      <div className="flex items-center justify-between px-2 mt-2 text-xs text-textSecondary/50 font-normal tracking-wide">
        <span>ThinkAI can make mistakes. Please double-check responses.</span>
        <span className="hidden sm:inline">
          Use <span className="px-1.5 py-0.5 border border-border rounded bg-surface text-[10px] font-medium text-textSecondary/80">shift + return</span> for new line
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
