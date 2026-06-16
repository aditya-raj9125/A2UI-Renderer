/**
 * @file useA2UIState.test.ts
 * @description Unit tests for checking form state updates in useA2UIState.
 */

import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useA2UIState } from "../../src/components/a2ui/hooks/useA2UIState";

describe("useA2UIState Hook Tests", () => {
  it("should initialize with initial values", () => {
    const { result } = renderHook(() => useA2UIState({ username: "Milovan" }));
    expect(result.current.getValue("username")).toBe("Milovan");
    expect(result.current.getFormValues()).toEqual({ username: "Milovan" });
  });

  it("should update values when calling setValue", () => {
    const { result } = renderHook(() => useA2UIState());

    act(() => {
      result.current.setValue("email", "milovan@example.com");
    });

    expect(result.current.getValue("email")).toBe("milovan@example.com");
    expect(result.current.getFormValues()).toEqual({ email: "milovan@example.com" });
  });

  it("should reset values when calling resetForm", () => {
    const { result } = renderHook(() => useA2UIState({ count: 10 }));

    act(() => {
      result.current.setValue("count", 20);
    });
    expect(result.current.getValue("count")).toBe(20);

    act(() => {
      result.current.resetForm();
    });
    expect(result.current.getValue("count")).toBe(10);
  });
});
