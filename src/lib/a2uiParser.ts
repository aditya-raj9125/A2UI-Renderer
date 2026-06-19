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
 * Recursively normalizes component variants to handle minor LLM formatting slips.
 */
function cleanComponentVariants(comp: any) {
  if (!comp || typeof comp !== "object") return;

  // Ensure type is a valid string
  if (typeof comp.type !== "string") {
    comp.type = "text";
  }

  // Ensure id exists
  if (!comp.id) {
    comp.id = comp.type + "_" + Math.random().toString(36).substring(2, 9);
  }

  // Handle Container
  if (comp.type === "container") {
    const validLayouts = ["vertical", "horizontal", "grid"];
    if (!comp.layout || !validLayouts.includes(comp.layout)) {
      if (comp.layout === "row") {
        comp.layout = "horizontal";
      } else if (comp.layout === "column" || comp.layout === "flex") {
        comp.layout = "vertical";
      } else {
        comp.layout = "vertical";
      }
    }
    if (!Array.isArray(comp.children)) {
      comp.children = [];
    }
  }

  // Handle Card
  if (comp.type === "card") {
    const validCardVariants = ["default", "elevated", "outlined", "success", "warning", "error"];
    if (!comp.variant || !validCardVariants.includes(comp.variant)) {
      if (comp.variant === "primary") {
        comp.variant = "elevated";
      } else if (comp.variant === "secondary") {
        comp.variant = "default";
      } else {
        comp.variant = "default";
      }
    }
    if (comp.children !== undefined && !Array.isArray(comp.children)) {
      delete comp.children;
    }
  }

  // Handle Text
  if (comp.type === "text") {
    const validTextVariants = ["heading", "subheading", "body", "caption", "label"];
    if (!comp.variant || !validTextVariants.includes(comp.variant)) {
      if (comp.variant === "title") {
        comp.variant = "heading";
      } else if (comp.variant === "paragraph") {
        comp.variant = "body";
      } else {
        comp.variant = "body";
      }
    }
    if (comp.content === undefined || comp.content === null) {
      comp.content = "";
    } else if (typeof comp.content !== "string") {
      comp.content = String(comp.content);
    }
  }

  // Handle Button
  if (comp.type === "button") {
    const validButtonVariants = ["primary", "secondary", "ghost", "danger"];
    if (!comp.variant || !validButtonVariants.includes(comp.variant)) {
      if (comp.variant === "default" || comp.variant === "outlined") {
        comp.variant = "secondary";
      } else if (comp.variant === "success") {
        comp.variant = "primary";
      } else {
        comp.variant = "primary";
      }
    }
    const validButtonSizes = ["sm", "md", "lg"];
    if (!comp.size || !validButtonSizes.includes(comp.size)) {
      comp.size = "md";
    }
    if (comp.label === undefined || comp.label === null) {
      comp.label = "Button";
    } else if (typeof comp.label !== "string") {
      comp.label = String(comp.label);
    }
    if (!comp.action) {
      comp.action = "click_" + comp.id;
    }
  }

  // Handle Text Field
  if (comp.type === "text_field") {
    const validFieldTypes = ["text", "email", "password", "number", "textarea"];
    if (!comp.fieldType || !validFieldTypes.includes(comp.fieldType)) {
      comp.fieldType = "text";
    }
    if (!comp.name) {
      comp.name = comp.id;
    }
    if (comp.label === undefined || comp.label === null) {
      comp.label = comp.name;
    } else if (typeof comp.label !== "string") {
      comp.label = String(comp.label);
    }
  }

  // Handle Form
  if (comp.type === "form") {
    if (!comp.submitLabel) {
      comp.submitLabel = "Submit";
    }
    if (!comp.action) {
      comp.action = "submit_" + comp.id;
    }
    if (!Array.isArray(comp.children)) {
      comp.children = [];
    }
  }

  // Handle Select
  if (comp.type === "select") {
    if (!comp.name) {
      comp.name = comp.id;
    }
    if (comp.label === undefined || comp.label === null) {
      comp.label = comp.name;
    } else if (typeof comp.label !== "string") {
      comp.label = String(comp.label);
    }
    if (!Array.isArray(comp.options)) {
      comp.options = [];
    } else {
      comp.options.forEach((opt: any) => {
        if (!opt || typeof opt !== "object") return;
        if (opt.value === undefined || opt.value === null) {
          opt.value = "";
        } else if (typeof opt.value !== "string") {
          opt.value = String(opt.value);
        }
        if (opt.label === undefined || opt.label === null) {
          opt.label = opt.value;
        } else if (typeof opt.label !== "string") {
          opt.label = String(opt.label);
        }
      });
    }
  }

  // Handle Checkbox
  if (comp.type === "checkbox") {
    if (!comp.name) {
      comp.name = comp.id;
    }
    if (comp.label === undefined || comp.label === null) {
      comp.label = comp.name;
    } else if (typeof comp.label !== "string") {
      comp.label = String(comp.label);
    }
  }

  // Handle Graph
  if (comp.type === "graph") {
    const validChartTypes = ["bar", "line", "pie"];
    if (!comp.chartType || !validChartTypes.includes(comp.chartType)) {
      comp.chartType = "bar";
    }
    if (!Array.isArray(comp.data)) {
      comp.data = [];
    } else {
      comp.data.forEach((d: any) => {
        if (!d || typeof d !== "object") return;
        if (d.label === undefined || d.label === null) {
          d.label = "";
        } else if (typeof d.label !== "string") {
          d.label = String(d.label);
        }
        if (typeof d.value !== "number") {
          d.value = Number(d.value) || 0;
        }
      });
    }
  }

  // Recursively clean children
  if (Array.isArray(comp.children)) {
    comp.children.forEach(cleanComponentVariants);
  }
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
    
    // Normalize variants before validation
    if (parsedPayload && Array.isArray(parsedPayload.components)) {
      parsedPayload.components.forEach(cleanComponentVariants);
    }
    
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
