/**
 * @file a2ui.types.ts
 * @description Core TypeScript type definitions for the Agent-to-User Interface (A2UI) specification.
 */

export interface A2UIPayload {
  version: "1.0";
  components: A2UIComponent[];
}

export type ComponentType =
  | "container"
  | "card"
  | "text"
  | "button"
  | "text_field"
  | "form"
  | "select"
  | "checkbox"
  | "graph";

export interface BaseComponent {
  id: string;
  type: ComponentType;
  style?: ComponentStyle;
}

export interface ComponentStyle {
  variant?: string;
  size?: string;
  color?: string;
  alignment?: "left" | "center" | "right";
  gap?: "sm" | "md" | "lg";
}

export interface A2UIContainerComponent extends BaseComponent {
  type: "container";
  layout: "vertical" | "horizontal" | "grid";
  gap?: "sm" | "md" | "lg";
  children: A2UIComponent[];
}

export interface A2UICardComponent extends BaseComponent {
  type: "card";
  title?: string;
  subtitle?: string;
  variant: "default" | "elevated" | "outlined" | "success" | "warning" | "error";
  children?: A2UIComponent[];
}

export interface A2UITextComponent extends BaseComponent {
  type: "text";
  content: string;
  variant: "heading" | "subheading" | "body" | "caption" | "label";
  bold?: boolean;
}

export interface A2UIButtonComponent extends BaseComponent {
  type: "button";
  label: string;
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  action: string;
  disabled?: boolean;
  icon?: string;
}

export interface A2UITextFieldComponent extends BaseComponent {
  type: "text_field";
  name: string;
  label: string;
  placeholder?: string;
  fieldType: "text" | "email" | "password" | "number" | "textarea";
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface A2UIFormComponent extends BaseComponent {
  type: "form";
  title?: string;
  submitLabel: string;
  action: string;
  children: A2UIComponent[];
}

export interface A2UISelectComponent extends BaseComponent {
  type: "select";
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export interface A2UICheckboxComponent extends BaseComponent {
  type: "checkbox";
  name: string;
  label: string;
  defaultChecked?: boolean;
  required?: boolean;
}

export interface A2UIGraphComponent extends BaseComponent {
  type: "graph";
  chartType: "bar" | "line" | "pie";
  title?: string;
  data: { label: string; value: number }[];
  color?: string;
}

export type A2UIComponent =
  | A2UIContainerComponent
  | A2UICardComponent
  | A2UITextComponent
  | A2UIButtonComponent
  | A2UITextFieldComponent
  | A2UIFormComponent
  | A2UISelectComponent
  | A2UICheckboxComponent
  | A2UIGraphComponent;

export interface A2UIInteractionEvent {
  type: "button_click" | "form_submit" | "input_change";
  componentId: string;
  action: string;
  payload?: Record<string, unknown>;
}
