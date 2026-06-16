/**
 * @file validators.test.ts
 * @description Unit tests for verifying Zod validator assertions.
 */

import { describe, it, expect } from "vitest";
import { validateA2UIPayload } from "../../src/components/a2ui/validators/a2uiValidator";

describe("A2UI Validator Tests", () => {
  it("should accept a valid A2UI payload structure", () => {
    const payload = {
      version: "1.0",
      components: [
        {
          id: "txt-1",
          type: "text",
          content: "Hello World",
          variant: "body",
        },
      ],
    };

    const result = validateA2UIPayload(payload);
    expect(result.valid).toBe(true);
    expect(result.data?.components[0].id).toBe("txt-1");
  });

  it("should reject payloads with incorrect versions", () => {
    const payload = {
      version: "2.0", // Invalid version
      components: [],
    };

    const result = validateA2UIPayload(payload);
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("should reject payloads missing required fields in components", () => {
    const payload = {
      version: "1.0",
      components: [
        {
          id: "btn-1",
          type: "button",
          // missing 'label', 'action', and 'size'
        },
      ],
    };

    const result = validateA2UIPayload(payload as any);
    expect(result.valid).toBe(false);
  });
});
