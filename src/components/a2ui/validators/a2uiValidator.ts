/**
 * @file a2uiValidator.ts
 * @description Zod schema validator to validate dynamic payloads against the A2UI spec.
 */

import { z } from "zod";
import { A2UIComponent, A2UIPayload } from "../types/a2ui.types";

const componentStyleSchema = z
  .object({
    variant: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    alignment: z.enum(["left", "center", "right"]).optional(),
    gap: z.enum(["sm", "md", "lg"]).optional(),
  })
  .optional();

const textComponentSchema = z.object({
  id: z.string(),
  type: z.literal("text"),
  style: componentStyleSchema,
  content: z.string(),
  variant: z.enum(["heading", "subheading", "body", "caption", "label"]),
  bold: z.boolean().optional(),
});

const buttonComponentSchema = z.object({
  id: z.string(),
  type: z.literal("button"),
  style: componentStyleSchema,
  label: z.string(),
  variant: z.enum(["primary", "secondary", "ghost", "danger"]),
  size: z.enum(["sm", "md", "lg"]),
  action: z.string(),
  disabled: z.boolean().optional(),
  icon: z.string().optional(),
});

const textFieldComponentSchema = z.object({
  id: z.string(),
  type: z.literal("text_field"),
  style: componentStyleSchema,
  name: z.string(),
  label: z.string(),
  placeholder: z.string().optional(),
  fieldType: z.enum(["text", "email", "password", "number", "textarea"]),
  required: z.boolean().optional(),
  validation: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      pattern: z.string().optional(),
    })
    .optional(),
});

const selectComponentSchema = z.object({
  id: z.string(),
  type: z.literal("select"),
  style: componentStyleSchema,
  name: z.string(),
  label: z.string(),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
});

const checkboxComponentSchema = z.object({
  id: z.string(),
  type: z.literal("checkbox"),
  style: componentStyleSchema,
  name: z.string(),
  label: z.string(),
  defaultChecked: z.boolean().optional(),
  required: z.boolean().optional(),
});

const graphComponentSchema = z.object({
  id: z.string(),
  type: z.literal("graph"),
  style: componentStyleSchema,
  chartType: z.enum(["bar", "line", "pie"]),
  title: z.string().optional(),
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
  color: z.string().optional(),
});

// Lazy loaded recursive schema definition for Container, Card, Form
export const componentSchema: z.ZodType<A2UIComponent> = z.lazy(() =>
  z.discriminatedUnion("type", [
    textComponentSchema,
    buttonComponentSchema,
    textFieldComponentSchema,
    selectComponentSchema,
    checkboxComponentSchema,
    graphComponentSchema,
    z.object({
      id: z.string(),
      type: z.literal("container"),
      style: componentStyleSchema,
      layout: z.enum(["vertical", "horizontal", "grid"]),
      gap: z.enum(["sm", "md", "lg"]).optional(),
      children: z.array(componentSchema),
    }),
    z.object({
      id: z.string(),
      type: z.literal("card"),
      style: componentStyleSchema,
      title: z.string().optional(),
      subtitle: z.string().optional(),
      variant: z.enum(["default", "elevated", "outlined", "success", "warning", "error"]),
      children: z.array(componentSchema).optional(),
    }),
    z.object({
      id: z.string(),
      type: z.literal("form"),
      style: componentStyleSchema,
      title: z.string().optional(),
      submitLabel: z.string(),
      action: z.string(),
      children: z.array(componentSchema),
    }),
  ])
);

export const a2uiPayloadSchema = z.object({
  version: z.literal("1.0"),
  components: z.array(componentSchema),
});

export interface ValidationResult {
  valid: boolean;
  data?: A2UIPayload;
  error?: z.ZodError;
}

/**
 * Validates a payload against the A2UI schema.
 * @param payload Raw payload to validate
 */
export function validateA2UIPayload(payload: unknown): ValidationResult {
  const result = a2uiPayloadSchema.safeParse(payload);
  if (result.success) {
    return { valid: true, data: result.data };
  } else {
    // Log validation errors in development mode only
    if (import.meta.env?.DEV) {
      console.warn("A2UI Payload Validation Failed:", result.error.format());
    }
    return { valid: false, error: result.error };
  }
}
