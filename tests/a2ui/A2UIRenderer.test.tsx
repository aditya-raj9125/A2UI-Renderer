/**
 * @file A2UIRenderer.test.tsx
 * @description Unit tests for verifying rendering of components and error handling within A2UIRenderer.
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { A2UIRenderer } from "../../src/components/a2ui/A2UIRenderer";
import { A2UIPayload } from "../../src/components/a2ui/types/a2ui.types";

describe("A2UIRenderer Component Tests", () => {
  it("should render all 9 component types from a mock JSON payload", () => {
    const payload: A2UIPayload = {
      version: "1.0",
      components: [
        {
          id: "container-1",
          type: "container",
          layout: "vertical",
          children: [
            {
              id: "card-1",
              type: "card",
              title: "Card Header Title",
              variant: "default",
              children: [
                {
                  id: "text-1",
                  type: "text",
                  content: "Typographic Text",
                  variant: "body",
                },
                {
                  id: "button-1",
                  type: "button",
                  label: "Action Trigger",
                  variant: "primary",
                  size: "md",
                  action: "click_action",
                },
                {
                  id: "text-field-1",
                  type: "text_field",
                  name: "username",
                  label: "Username Field",
                  fieldType: "text",
                },
                {
                  id: "form-1",
                  type: "form",
                  title: "Feedback Form",
                  submitLabel: "Submit Feedback",
                  action: "submit_feedback",
                  children: [
                    {
                      id: "select-1",
                      type: "select",
                      name: "rating",
                      label: "Choose Rating",
                      options: [
                        { value: "5", label: "Excellent" },
                        { value: "1", label: "Poor" },
                      ],
                    },
                    {
                      id: "checkbox-1",
                      type: "checkbox",
                      name: "agree",
                      label: "Agree to terms",
                    },
                  ],
                },
                {
                  id: "graph-1",
                  type: "graph",
                  chartType: "bar",
                  title: "Monthly Volume Graph",
                  data: [
                    { label: "Jan", value: 100 },
                    { label: "Feb", value: 200 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const mockOnInteraction = vi.fn();

    render(<A2UIRenderer payload={payload} onInteraction={mockOnInteraction} />);

    // Assert that elements exist in document
    expect(screen.getByText("Card Header Title")).toBeInTheDocument();
    expect(screen.getByText("Typographic Text")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action Trigger" })).toBeInTheDocument();
    expect(screen.getByLabelText("Username Field")).toBeInTheDocument();
    expect(screen.getByText("Feedback Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Choose Rating")).toBeInTheDocument();
    expect(screen.getByLabelText("Agree to terms")).toBeInTheDocument();
    expect(screen.getByText("Monthly Volume Graph")).toBeInTheDocument();
  });

  it("should render error fallback UI when schema is invalid", () => {
    const invalidPayload = {
      version: "1.0",
      components: [
        {
          id: "bad-comp",
          type: "unknown-type", // invalid component type
        },
      ],
    };

    const mockOnInteraction = vi.fn();

    render(
      <A2UIRenderer payload={invalidPayload as any} onInteraction={mockOnInteraction} />
    );

    expect(screen.getByText(/Could not render UI component/i)).toBeInTheDocument();
  });
});
