/**
 * @file A2UIButton.test.tsx
 * @description Unit tests for A2UIButton click events.
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { A2UIButton } from "../../../src/components/a2ui/components/A2UIButton";
import { A2UIInteractionContext } from "../../../src/components/a2ui/components/A2UIContext";
import { A2UIButtonComponent } from "../../../src/components/a2ui/types/a2ui.types";

describe("A2UIButton Component Tests", () => {
  it("should render button with label and trigger interaction on click", () => {
    const mockBtn: A2UIButtonComponent = {
      id: "btn-test",
      type: "button",
      label: "Click Me",
      variant: "primary",
      size: "md",
      action: "action_test",
    };

    const mockOnInteraction = vi.fn();

    render(
      <A2UIInteractionContext.Provider value={{ onInteraction: mockOnInteraction }}>
        <A2UIButton component={mockBtn} />
      </A2UIInteractionContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockOnInteraction).toHaveBeenCalledWith({
      type: "button_click",
      componentId: "btn-test",
      action: "action_test",
    });
  });

  it("should not trigger interaction when button is disabled", () => {
    const mockBtn: A2UIButtonComponent = {
      id: "btn-test",
      type: "button",
      label: "Click Me",
      variant: "primary",
      size: "md",
      action: "action_test",
      disabled: true,
    };

    const mockOnInteraction = vi.fn();

    render(
      <A2UIInteractionContext.Provider value={{ onInteraction: mockOnInteraction }}>
        <A2UIButton component={mockBtn} />
      </A2UIInteractionContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnInteraction).not.toHaveBeenCalled();
  });
});
