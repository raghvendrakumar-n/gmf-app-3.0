import { ActionObject } from './intent.model';

export type MessageType = 'user' | 'bot' | 'typing';

export interface QuickChip {
  query: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  type: MessageType;
  text: string;
  cardHtml?: string;
  chips?: QuickChip[];
  timestamp: string;
  action?: ActionObject;
}
