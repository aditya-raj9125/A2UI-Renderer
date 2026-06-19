/**
 * @file ChatMessage.tsx
 * @description Individual message block rendering user inputs or AI streaming replies with A2UI elements.
 */

import React from "react";
import { Message } from "../../types/chat.types";
import { useStreamingText } from "../../hooks/useStreamingText";
import { A2UIRenderer } from "../a2ui/A2UIRenderer";
import { A2UIInteractionEvent } from "../a2ui/types/a2ui.types";

interface ChatMessageProps {
  message: Message;
  onInteraction: (event: A2UIInteractionEvent) => void;
}

/**
 * Helper to compress consecutive newlines, strip markdown asterisks, and format bullets/bold text.
 */
const formatAgentText = (text: string) => {
  if (!text) return null;

  // Compress 3 or more consecutive newlines down to 2
  const compressedGaps = text.replace(/\n{3,}/g, "\n\n");
  const paragraphs = compressedGaps.split("\n\n");

  return paragraphs.map((para, paraIdx) => {
    const lines = para.split("\n");

    return (
      <div key={paraIdx} className="mb-2.5 last:mb-0 flex flex-col gap-1">
        {lines.map((line, lineIdx) => {
          let processedLine = line.trim();
          if (!processedLine) return null;

          // Check for bullet list indicators
          let isBullet = false;
          if (processedLine.startsWith("* ") || processedLine.startsWith("- ")) {
            isBullet = true;
            processedLine = processedLine.substring(2).trim();
          }

          // Parse bold markdown markers (**text**)
          const parts = processedLine.split(/\*\*(.*?)\*\*/g);
          const renderedLine = parts.map((part, partIdx) => {
            if (partIdx % 2 === 1) {
              return (
                <strong key={partIdx} className="font-semibold text-textPrimary">
                  {part}
                </strong>
              );
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={lineIdx} className="flex items-start gap-1.5 text-[13.5px] leading-relaxed text-textPrimary pl-2">
                <span className="text-accent select-none">•</span>
                <span className="flex-1">{renderedLine}</span>
              </div>
            );
          }

          return (
            <p key={lineIdx} className="text-[13.5px] leading-relaxed text-textPrimary whitespace-pre-wrap">
              {renderedLine}
            </p>
          );
        })}
      </div>
    );
  });
};

/**
 * Chat bubble supporting animations and A2UI integrations.
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onInteraction }) => {
  const { sender, text, a2uiPayload, timestamp } = message;

  const isUser = sender === "user";

  // Stream text character-by-character for agent replies
  const displayedText = isUser ? text : useStreamingText(text || "", 10);

  // Formatting helpers for interaction messages in chat view
  const renderUserContent = () => {
    if (!text) return null;
    if (text.startsWith("[BUTTON_CLICK]")) {
      const actionMatch = text.match(/action:\s*(\w+)/);
      const action = actionMatch ? actionMatch[1] : "click";
      return (
        <span className="flex items-center gap-1.5 text-xs italic opacity-90 font-medium">
          <span>🖱️</span> Clicked action: {action}
        </span>
      );
    }
    if (text.startsWith("[FORM_SUBMIT]")) {
      const actionMatch = text.match(/action:\s*(\w+)/);
      const action = actionMatch ? actionMatch[1] : "submit";
      return (
        <span className="flex flex-col gap-1 text-xs italic opacity-90 font-medium">
          <span className="flex items-center gap-1.5">
            <span>📝</span> Submitted form action: {action}
          </span>
        </span>
      );
    }
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>;
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1.5 w-full max-w-4xl mx-auto px-4`}>
      {/* Sender Header */}
      <span className="text-[11px] font-semibold text-textSecondary/50 uppercase tracking-wider select-none">
        {isUser ? "You" : "AuraUI"} • {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>

      {/* Message Bubble */}
      <div
        className={`w-full transition-all duration-200 ${
          a2uiPayload ? "max-w-[95%] sm:max-w-[90%]" : "max-w-[85%] sm:max-w-[75%]"
        } ${
          isUser
            ? "bg-accent/10 border-accent/20 text-textPrimary rounded-2xl rounded-tr-none font-medium px-6 py-3.5 shadow-sm border"
            : "bg-transparent text-textPrimary rounded-none px-0 py-1 shadow-none border-0"
        }`}
      >
        {isUser ? (
          renderUserContent()
        ) : (
          <div className="flex flex-col gap-3 font-medium">
            {displayedText && formatAgentText(displayedText)}

            {/* Inline A2UI Render blocks */}
            {a2uiPayload && (
              <div className="mt-3 flex flex-col gap-3 w-full">
                {a2uiPayload.components.map((comp, idx) => (
                  <div
                    key={comp.id}
                    className="a2ui-fade-in"
                    style={{
                      animationDelay: `${idx * 150}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <A2UIRenderer
                      payload={{ version: "1.0", components: [comp] }}
                      onInteraction={onInteraction}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatMessage;
