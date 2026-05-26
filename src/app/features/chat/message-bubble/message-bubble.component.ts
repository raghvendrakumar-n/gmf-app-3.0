import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from '../../../core/models/chat.model';

@Component({
  selector: 'app-message-bubble',
  standalone: false,
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.css',
})
export class MessageBubbleComponent {
  @Input() message!: ChatMessage;
  @Output() chipClicked = new EventEmitter<string>();

  onChipClick(query: string): void {
    this.chipClicked.emit(query);
  }
}
