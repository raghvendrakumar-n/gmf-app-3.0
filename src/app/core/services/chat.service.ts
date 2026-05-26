import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage, QuickChip } from '../models/chat.model';
import { ActionObject } from '../models/intent.model';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private idCounter = 0;

  private generateId(): string {
    return `msg-${Date.now()}-${this.idCounter++}`;
  }

  private getTimestamp(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  addUserMessage(text: string): void {
    const messages = this.messagesSubject.value;
    const msg: ChatMessage = {
      id: this.generateId(),
      type: 'user',
      text,
      timestamp: this.getTimestamp(),
    };
    this.messagesSubject.next([...messages, msg]);
  }

  addTypingIndicator(): string {
    const messages = this.messagesSubject.value;
    const msg: ChatMessage = {
      id: this.generateId(),
      type: 'typing',
      text: '',
      timestamp: this.getTimestamp(),
    };
    this.messagesSubject.next([...messages, msg]);
    return msg.id;
  }

  removeMessage(id: string): void {
    const messages = this.messagesSubject.value.filter((m) => m.id !== id);
    this.messagesSubject.next(messages);
  }

  addBotMessage(text: string, cardHtml?: string, chips?: QuickChip[], action?: ActionObject): void {
    const messages = this.messagesSubject.value;
    const msg: ChatMessage = {
      id: this.generateId(),
      type: 'bot',
      text,
      cardHtml,
      chips,
      timestamp: this.getTimestamp(),
      action,
    };
    this.messagesSubject.next([...messages, msg]);
  }

  clearChat(): void {
    this.messagesSubject.next([]);
  }
}
