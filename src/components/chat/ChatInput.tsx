/**
 * @file ChatInput.tsx
 * @description Rich glassmorphic chat input textarea with simplified actions and footnotes styled to prevent text collision.
 */

import React, { useRef, useState, useEffect } from "react";
import { Camera, Paperclip } from "lucide-react";

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
    <div className="w-full max-w-4xl mx-auto px-4 mb-3 select-none relative z-20">
      <div className="border border-border bg-inputBg rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-borderHover transition-all duration-200 overflow-hidden flex flex-col">
        {/* Input Text Area */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can AuraUI help you today?"
          rows={1}
          disabled={disabled}
          className="w-full px-4.5 pt-4 pb-2 bg-transparent text-textPrimary text-sm md:text-[15px] outline-none resize-none min-h-[56px] max-h-[220px] leading-relaxed placeholder:text-textSecondary/40 border-0 focus:ring-0"
          aria-label="Prompt text input"
        />

        {/* Bottom toolbar inside input area - Clean and right-aligned action icons */}
        <div className="flex items-center justify-end px-4.5 pb-3 pt-1">
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

      {/* Helper footnotes - Flex wrap styled to prevent collisions */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between px-2 mt-2.5 text-center sm:text-left text-xs text-textSecondary/50 font-normal tracking-wide">
        <span>AuraUI can make mistakes. Please double-check responses.</span>
        <span className="hidden sm:inline">
          Use <span className="px-1.5 py-0.5 border border-border rounded bg-surface text-[10px] font-medium text-textSecondary/80">shift + return</span> for new line
        </span>
      </div>
    </div>
  );
};

export default ChatInput;
