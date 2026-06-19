/**
 * @file ChatInterface.tsx
 * @description Main dashboard interface managing chat scroll state, skeletons, navbar items, and message threads.
 */

import React, { useEffect, useRef } from "react";
import { useChat } from "../../hooks/useChat";
import { HeroSection } from "./HeroSection";
import { PromptChips } from "./PromptChips";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

// UI Shared
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";

/**
 * Shell container controlling navigation, empty-state toggles and message panels.
 */
export const ChatInterface: React.FC = () => {
  const { messages, loading, error, sendMessage, sendInteraction, clearChat } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen radial-glow-bg transition-colors duration-200 ease-in-out font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-transparent z-10 select-none">
        <button
          onClick={clearChat}
          className="focus:outline-none cursor-pointer transition-transform duration-200 active:scale-95 flex items-center text-left"
          title="Go to home dashboard"
          aria-label="AuraUI home"
        >
          <Logo />
        </button>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
        {!hasMessages ? (
          /* Landing Empty State Dashboard */
          <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto no-scrollbar w-full max-w-4xl mx-auto py-4">
            <HeroSection userName="Milovan" />
            <PromptChips onChipSelect={sendMessage} />
          </div>
        ) : (
          /* Active Scrollable Conversation Thread */
          <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6 scroll-smooth">
            {messages
              .filter((m) => !m.text || (!m.text.startsWith("[BUTTON_CLICK]") && !m.text.startsWith("[FORM_SUBMIT]")))
              .map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onInteraction={sendInteraction}
                />
              ))}

            {/* Simulated Agent Typing skeleton loader */}
            {loading && (
              <div className="flex flex-col items-start gap-1.5 w-full max-w-4xl mx-auto px-4 animate-pulse">
                <span className="text-[11px] font-semibold text-textSecondary/40 uppercase select-none">
                  AuraUI is typing...
                </span>
                <div className="max-w-[70%] rounded-2xl rounded-tl-none px-5 py-4 bg-surface border border-border flex flex-col gap-2.5">
                  <div className="h-3 w-48 bg-border rounded-full" />
                  <div className="h-3 w-64 bg-border rounded-full" />
                  <div className="h-3 w-32 bg-border rounded-full" />
                </div>
              </div>
            )}

            {/* Error notifications */}
            {error && (
              <div className="w-full max-w-4xl mx-auto px-4">
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl text-sm text-red-600 font-semibold flex items-center gap-2">
                  <span>❌</span> {error}
                </div>
              </div>
            )}

            {/* Scroll Target anchor */}
            <div ref={scrollRef} />
          </div>
        )}

        {/* Input box docking area */}
        <div className="w-full bg-gradient-to-t from-bg via-bg/85 to-transparent pt-4 pb-3">
          <ChatInput onSendMessage={sendMessage} disabled={loading} />
        </div>
      </main>
    </div>
  );
};
export default ChatInterface;
