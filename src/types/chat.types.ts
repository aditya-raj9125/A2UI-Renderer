/**
 * @file chat.types.ts
 * @description Types representing chat messages and history.
 */

import { A2UIPayload } from "../components/a2ui/types/a2ui.types";

export interface Message {
  id: string;
  sender: "user" | "agent";
  text: string | null;
  a2uiPayload: A2UIPayload | null;
  timestamp: Date;
}
