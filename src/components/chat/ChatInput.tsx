/**
 * @file ChatInput.tsx
 * @description Rich chat input textarea containing mock model configuration actions and formatting cues.
 */

import React, { useRef, useState, useEffect } from "react";
import { Camera, Paperclip, ChevronDown, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

/**
 * Text area chat input component.
 */
export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  const handleSubmit = () => {
    if (text.trim() && !disabled) {
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-4 select-none">
      <div className="border border-border bg-surface rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-accent/40 transition-all duration-200 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can ThinkAI help you today?"
          rows={2}
          disabled={disabled}
          className="w-full px-4 pt-3.5 pb-2 bg-transparent text-textPrimary text-sm outline-none resize-none min-h-[48px] max-h-[180px] leading-relaxed placeholder:text-textSecondary/50"
          aria-label="Prompt text input"
        />

        {/* Bottom toolbar inside input area */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-t border-border/60 bg-bg/10">
          {/* Model Selector Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-surface border border-border rounded-full text-xs font-semibold text-textSecondary cursor-pointer hover:bg-bg/40 transition-colors duration-150">
            <Sparkles className="w-3 h-3 text-accent animate-pulse" />
            <span className="text-textPrimary">ThinkAI 3.5 Smart</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-textSecondary/80 flex items-center gap-0.5">
              Formal <ChevronDown className="w-3 h-3" />
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 text-textSecondary">
            <button
              type="button"
              className="hover:text-textPrimary hover:scale-105 active:scale-95 transition-all p-1"
              aria-label="Upload photo"
            >
              <Camera className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              className="hover:text-textPrimary hover:scale-105 active:scale-95 transition-all p-1"
              aria-label="Attach file"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Helper footnotes */}
      <div className="flex items-center justify-between px-2.5 mt-2.5 text-xs text-textSecondary/60 font-medium tracking-wide">
        <span>ThinkAI can make mistakes. Please double-check responses.</span>
        <span className="hidden sm:inline">Use <kbd className="px-1 border border-border rounded bg-surface">shift + return</kbd> for new line</span>
      </div>
    </div>
  );
};
export default ChatInput;
