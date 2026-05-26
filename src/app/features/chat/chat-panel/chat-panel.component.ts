import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-panel',
  standalone: false,
  templateUrl: './chat-panel.component.html',
  styleUrl: './chat-panel.component.css',
  host: { class: 'flex flex-1 w-full min-w-0' },
})
export class ChatPanelComponent {
  @Output() signInClicked = new EventEmitter<void>();
}
