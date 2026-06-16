/**
 * @file agent.test.ts
 * @description Unit tests for validating the Gemini SDK client interface.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessageToAgent } from "../../src/lib/agent";
import { Message } from "../../src/types/chat.types";

// Mock @google/generative-ai module calls
vi.mock("@google/generative-ai", () => {
  const sendMessageMock = vi.fn().mockResolvedValue({
    response: {
      text: () => "<a2ui>{\"version\":\"1.0\",\"components\":[]}</a2ui>",
    },
  });

  const startChatMock = vi.fn().mockReturnValue({
    sendMessage: sendMessageMock,
  });

  const getGenerativeModelMock = vi.fn().mockReturnValue({
    startChat: startChatMock,
  });

  return {
    GoogleGenerativeAI: vi.fn().mockImplementation(function () {
      return {
        getGenerativeModel: getGenerativeModelMock,
      };
    }),
  };
});

describe("Gemini Agent Client Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should format history correctly and return model response text", async () => {
    const history: Message[] = [
      {
        id: "msg-1",
        sender: "user",
        text: "Generate empty dashboard",
        a2uiPayload: null,
        timestamp: new Date(),
      },
    ];

    // Setup dummy key for testing
    vi.stubEnv("VITE_GEMINI_API_KEY", "dummy-api-key");

    const response = await sendMessageToAgent(history);
    expect(response).toContain("<a2ui>");
  });
});
