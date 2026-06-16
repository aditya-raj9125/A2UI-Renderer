/**
 * @file useStreamingText.ts
 * @description Hook to simulate text typing animation for AI response bubbles.
 */

import { useState, useEffect } from "react";

/**
 * Hook to stream text character by character.
 * @param text The complete text string to stream
 * @param speedMs Typing speed per character in milliseconds
 */
export function useStreamingText(text: string, speedMs: number = 15): string {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speedMs);

    return () => {
      clearInterval(interval);
    };
  }, [text, speedMs]);

  return displayedText;
}
export default useStreamingText;
