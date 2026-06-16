/**
 * @file agent.ts
 * @description Integrates with Google Generative AI (Gemini) SDK to generate chat responses and A2UI payloads.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "../types/chat.types";
import { SYSTEM_PROMPT } from "./prompts";
/**
 * Sends messages history to Gemini and retrieves the text/payload response.
 * @param history Current message history formatted for Google Generative AI
 */
export async function sendMessageToAgent(history: Message[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error(
      "Google Gemini API Key is missing. Please define VITE_GEMINI_API_KEY inside your .env file."
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Instantiate model with system instructions
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Format historical messages for Gemini.
    // Gemini API requires roles mapping to "user" or "model" containing a parts array.
    const formattedHistory = history.slice(0, -1).map((msg) => ({
      role: msg.sender === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.text || "" }],
    }));

    const lastMsgText = history[history.length - 1]?.text || "";

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(lastMsgText);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error(`Gemini API Error: ${(error as Error).message}`);
  }
}
