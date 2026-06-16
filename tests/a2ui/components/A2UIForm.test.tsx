/**
 * @file A2UIForm.test.tsx
 * @description Unit tests for A2UIForm value bindings and submits.
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { A2UIForm } from "../../../src/components/a2ui/components/A2UIForm";
import { A2UITextField } from "../../../src/components/a2ui/components/A2UITextField";
import { A2UIInteractionContext } from "../../../src/components/a2ui/components/A2UIContext";
import { A2UIFormComponent, A2UIComponent } from "../../../src/components/a2ui/types/a2ui.types";

describe("A2UIForm Component Tests", () => {
  it("should render form and submit values entered in text fields", () => {
    const mockForm: A2UIFormComponent = {
      id: "form-test",
      type: "form",
      title: "Test Form",
      submitLabel: "Save Details",
      action: "save_action",
      children: [
        {
          id: "input-name",
          type: "text_field",
          name: "fullname",
          label: "Full Name",
          fieldType: "text",
          required: true,
        },
      ],
    };

    const mockOnInteraction = vi.fn();

    const renderChild = (child: A2UIComponent) => {
      if (child.type === "text_field") {
        return <A2UITextField component={child} />;
      }
      return null;
    };

    render(
      <A2UIInteractionContext.Provider value={{ onInteraction: mockOnInteraction }}>
        <A2UIForm component={mockForm} renderChild={renderChild} />
      </A2UIInteractionContext.Provider>
    );

    // Verify render elements
    expect(screen.getByText("Test Form")).toBeInTheDocument();
    const input = screen.getByLabelText(/Full Name/);
    expect(input).toBeInTheDocument();

    // Type value
    fireEvent.change(input, { target: { value: "Milovan Milosevic" } });

    // Submit form
    const submitBtn = screen.getByRole("button", { name: "Save Details" });
    fireEvent.click(submitBtn);

    expect(mockOnInteraction).toHaveBeenCalledWith({
      type: "form_submit",
      componentId: "form-test",
      action: "save_action",
      payload: {
        fullname: "Milovan Milosevic",
      },
    });
  });
});
