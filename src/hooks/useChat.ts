/**
 * @file useChat.ts
 * @description Hook managing message history, loading states, and user/UI interaction events.
 */

import { useState, useCallback } from "react";
import { Message } from "../types/chat.types";
import { A2UIInteractionEvent } from "../components/a2ui/types/a2ui.types";
import { sendMessageToAgent } from "../lib/agent";
import { parseAgentResponse } from "../lib/a2uiParser";

/**
 * Custom hook to run and manage the conversational chat states.
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: text,
        a2uiPayload: null,
        timestamp: new Date(),
      };

      const newHistory = [...messages, userMessage];
      setMessages(newHistory);
      setLoading(true);
      setError(null);

      try {
        const rawResponse = await sendMessageToAgent(newHistory);
        const parsed = parseAgentResponse(rawResponse);

        const agentMessage: Message = {
          id: `agent-${Date.now()}`,
          sender: "agent",
          text: parsed.text,
          a2uiPayload: parsed.a2uiPayload,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentMessage]);
      } catch (err) {
        setError((err as Error).message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  const sendInteraction = useCallback(
    async (event: A2UIInteractionEvent) => {
      let logText = "";
      if (event.type === "button_click") {
        logText = `[BUTTON_CLICK] componentId: ${event.componentId}, action: ${event.action}`;
      } else if (event.type === "form_submit") {
        logText = `[FORM_SUBMIT] componentId: ${event.componentId}, action: ${event.action}, values: ${JSON.stringify(
          event.payload
        )}`;
      } else {
        return; // we don't send individual input change typings over network
      }

      const userInteractionMessage: Message = {
        id: `user-interaction-${Date.now()}`,
        sender: "user",
        text: logText,
        a2uiPayload: null,
        timestamp: new Date(),
      };

      const newHistory = [...messages, userInteractionMessage];
      setMessages(newHistory);
      setLoading(true);
      setError(null);

      try {
        const rawResponse = await sendMessageToAgent(newHistory);
        const parsed = parseAgentResponse(rawResponse);

        const agentMessage: Message = {
          id: `agent-${Date.now()}`,
          sender: "agent",
          text: parsed.text,
          a2uiPayload: parsed.a2uiPayload,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, agentMessage]);
      } catch (err) {
        setError((err as Error).message || "Interaction failed.");
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    sendInteraction,
    clearChat,
  };
}
export default useChat;
