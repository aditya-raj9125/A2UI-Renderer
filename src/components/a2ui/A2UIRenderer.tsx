/**
 * @file A2UIRenderer.tsx
 * @description Main entry point for resolving A2UI payloads, containing recursive render switch logic and component error boundaries.
 */

import React, { Component, ErrorInfo, ReactNode, useState } from "react";
import { A2UIComponent, A2UIInteractionEvent, A2UIPayload } from "./types/a2ui.types";
import { validateA2UIPayload } from "./validators/a2uiValidator";
import { A2UIInteractionContext } from "./components/A2UIContext";

// Components
import { A2UIContainer } from "./components/A2UIContainer";
import { A2UICard } from "./components/A2UICard";
import { A2UIText } from "./components/A2UIText";
import { A2UIButton } from "./components/A2UIButton";
import { A2UITextField } from "./components/A2UITextField";
import { A2UIForm } from "./components/A2UIForm";
import { A2UISelect } from "./components/A2UISelect";
import { A2UICheckbox } from "./components/A2UICheckbox";
import { A2UIGraph } from "./components/A2UIGraph";

// Props definition
interface A2UIRendererProps {
  payload: A2UIPayload;
  onInteraction: (event: A2UIInteractionEvent) => void;
}

// Error Boundary Props/State
interface ErrorBoundaryProps {
  children: ReactNode;
  payload: A2UIPayload;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Class ErrorBoundary catching rendering issues inside sub-components.
 */
class A2UIErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log in dev
    if (import.meta.env?.DEV) {
      console.error("A2UI Render Crash Caught:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return <FallbackErrorUI payload={this.props.payload} error={this.state.error} />;
    }
    return this.props.children;
  }
}

/**
 * Graceful fallback component displaying validation/rendering errors with a raw JSON toggle.
 */
const FallbackErrorUI: React.FC<{ payload: A2UIPayload; error: Error | null }> = ({
  payload,
  error,
}) => {
  const [showJson, setShowJson] = useState(false);

  return (
    <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-2xl w-full font-sans shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="text-md font-bold text-red-600 flex items-center gap-1.5">
          <span>⚠️</span> Could not render UI component
        </h3>
        <p className="text-sm text-textPrimary/80">
          {error?.message || "Malformed or incompatible A2UI payload structure."}
        </p>
        <button
          onClick={() => setShowJson(!showJson)}
          className="mt-2 text-xs font-semibold text-accent hover:text-accentHover underline text-left cursor-pointer transition-colors duration-150"
        >
          {showJson ? "Hide raw JSON" : "Show raw JSON"}
        </button>

        {showJson && (
          <pre className="mt-3 p-3.5 bg-surface border border-border rounded-xl text-[11px] text-textSecondary font-mono overflow-x-auto max-h-[200px]">
            {JSON.stringify(payload, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

/**
 * Renders individual components based on type field.
 */
const renderComponent = (component: A2UIComponent): React.ReactNode => {
  switch (component.type) {
    case "container":
      return (
        <A2UIContainer
          key={component.id}
          component={component}
          renderChild={renderComponent}
        />
      );
    case "card":
      return (
        <A2UICard
          key={component.id}
          component={component}
          renderChild={renderComponent}
        />
      );
    case "text":
      return <A2UIText key={component.id} component={component} />;
    case "button":
      return <A2UIButton key={component.id} component={component} />;
    case "text_field":
      return <A2UITextField key={component.id} component={component} />;
    case "form":
      return (
        <A2UIForm
          key={component.id}
          component={component}
          renderChild={renderComponent}
        />
      );
    case "select":
      return <A2UISelect key={component.id} component={component} />;
    case "checkbox":
      return <A2UICheckbox key={component.id} component={component} />;
    case "graph":
      return <A2UIGraph key={component.id} component={component} />;
    default:
      // Graceful fallback for unrecognized components in production
      return (
        <div className="p-3 bg-red-500/5 text-xs text-red-500 border border-red-500/10 rounded-xl">
          Unknown Component: {(component as any).type}
        </div>
      );
  }
};

/**
 * Core component parsing, validating and rendering A2UI payloads inside ErrorBoundary wrappers.
 */
export const A2UIRenderer: React.FC<A2UIRendererProps> = ({ payload, onInteraction }) => {
  const [showJson, setShowJson] = useState(false);

  // Validate incoming payload using Zod schema
  const validation = validateA2UIPayload(payload);

  if (!validation.valid) {
    const mockError = new Error(
      `Zod validation error: ${validation.error?.issues.map((e: { path: PropertyKey[]; message: string }) => `${e.path.join(".")}: ${e.message}`).join(", ") || "Invalid fields"}`
    );
    return <FallbackErrorUI payload={payload} error={mockError} />;
  }

  return (
    <A2UIErrorBoundary payload={payload}>
      <A2UIInteractionContext.Provider value={{ onInteraction }}>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col gap-4">
            {payload.components.map((component) => renderComponent(component))}
          </div>

          <div className="flex flex-col items-start mt-1">
            <button
              onClick={() => setShowJson(!showJson)}
              className="text-xs font-semibold text-textSecondary/60 hover:text-accent transition-colors duration-150 flex items-center gap-1.5 cursor-pointer select-none bg-surface/30 hover:bg-surface/60 border border-border/40 hover:border-border px-3 py-1.5 rounded-xl"
            >
              <span>{showJson ? "Hide JSON Schema" : "Show JSON Schema"}</span>
            </button>

            {showJson && (
              <pre className="mt-2.5 w-full p-3.5 bg-surface/50 border border-border/60 rounded-2xl text-[11px] text-textSecondary font-mono overflow-x-auto max-h-[250px] leading-relaxed no-scrollbar">
                {JSON.stringify(payload, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </A2UIInteractionContext.Provider>
    </A2UIErrorBoundary>
  );
};
export default A2UIRenderer;
