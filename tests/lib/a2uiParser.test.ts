/**
 * @file a2uiParser.test.ts
 * @description Unit tests for extracting A2UI tags and parsing inner JSON.
 */

import { describe, it, expect } from "vitest";
import { parseAgentResponse } from "../../src/lib/a2uiParser";

describe("A2UI Response Parser Tests", () => {
  it("should extract a2ui tags and separate plain text", () => {
    const rawResponse = `Here is your requested widget.
<a2ui>
{
  "version": "1.0",
  "components": [
    {
      "id": "c-1",
      "type": "text",
      "content": "Nested Element",
      "variant": "body"
    }
  ]
}
</a2ui>
Hope this helps!`;

    const result = parseAgentResponse(rawResponse);
    expect(result.text).toBe("Here is your requested widget.\n\nHope this helps!");
    expect(result.a2uiPayload).not.toBeNull();
    expect(result.a2uiPayload?.components[0].id).toBe("c-1");
  });

  it("should handle plain text responses with no tags", () => {
    const rawResponse = "Hello! I am a plain text response.";
    const result = parseAgentResponse(rawResponse);
    expect(result.text).toBe("Hello! I am a plain text response.");
    expect(result.a2uiPayload).toBeNull();
  });

  it("should return a fallback payload structure when JSON is malformed", () => {
    const rawResponse = `Let's show a broken widget.
<a2ui>
{
  "version": "1.0",
  "components": [
    {
      "id": "broken",
      "type": "text",
      "content": "Truncated json...
</a2ui>`;

    const result = parseAgentResponse(rawResponse);
    expect(result.text).toBe("Let's show a broken widget.");
    expect(result.a2uiPayload).not.toBeNull();
    expect(result.a2uiPayload?.components[0].id).toBe("error-malformed-json");
  });

  it("should normalize and clean invalid or missing variant/size options", () => {
    const rawResponse = `
<a2ui>
{
  "version": "1.0",
  "components": [
    {
      "id": "pricing-container",
      "type": "container",
      "layout": "horizontal",
      "children": [
        {
          "id": "basic-plan-card",
          "type": "card"
        },
        {
          "id": "pro-plan-card",
          "type": "card",
          "variant": "primary"
        },
        {
          "id": "btn-test",
          "type": "button",
          "label": "Click me"
        }
      ]
    }
  ]
}
</a2ui>`;
    const result = parseAgentResponse(rawResponse);
    expect(result.a2uiPayload).not.toBeNull();
    const container = result.a2uiPayload?.components[0] as any;
    expect(container.children[0].variant).toBe("default"); // Missing variant defaults to "default"
    expect(container.children[1].variant).toBe("elevated"); // Invalid variant "primary" mapped to "elevated"
    expect(container.children[2].variant).toBe("primary"); // Missing button variant defaults to "primary"
    expect(container.children[2].size).toBe("md"); // Missing button size defaults to "md"
  });
});

