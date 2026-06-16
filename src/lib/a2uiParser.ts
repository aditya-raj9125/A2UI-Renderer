/**
 * @file a2uiParser.ts
 * @description Extracts and parses A2UI XML structures from plain text response strings.
 */

import { A2UIPayload } from "../components/a2ui/types/a2ui.types";

export interface ParseResult {
  text: string | null;
  a2uiPayload: A2UIPayload | null;
}

/**
 * Extracts the `<a2ui>...</a2ui>` tags, parses the JSON payload, and returns the result.
 * @param response Raw string response from the AI agent
 */
export function parseAgentResponse(response: string): ParseResult {
  if (!response) {
    return { text: null, a2uiPayload: null };
  }

  // Regex to match <a2ui> content
  const a2uiRegex = /<a2ui>([\s\S]*?)<\/a2ui>/i;
  const match = response.match(a2uiRegex);

  if (!match) {
    return { text: response.trim(), a2uiPayload: null };
  }

  const jsonContent = match[1].trim();
  const textOutside = response.replace(a2uiRegex, "").trim();

  try {
    // Attempt to parse the JSON contents
    const parsedPayload = JSON.parse(jsonContent) as A2UIPayload;
    return {
      text: textOutside || null,
      a2uiPayload: parsedPayload,
    };
  } catch (error) {
    // In case of JSON syntax errors, return fallback malformed structure
    // so validator or ErrorBoundary handles it.
    return {
      text: textOutside || response.trim(),
      a2uiPayload: {
        version: "1.0",
        components: [
          {
            id: "error-malformed-json",
            type: "card",
            title: "Malformed A2UI Payload",
            variant: "error",
            children: [
              {
                id: "error-details",
                type: "text",
                content: `Failed to parse JSON content: ${(error as Error).message}`,
                variant: "body",
              },
              {
                id: "raw-json-text",
                type: "text",
                content: jsonContent,
                variant: "caption",
              },
            ],
          } as any,
        ],
      },
    };
  }
}
