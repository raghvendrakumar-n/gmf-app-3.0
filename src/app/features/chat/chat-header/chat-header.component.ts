import { Component, inject, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DrawerService } from '../../../core/services/drawer.service';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-chat-header',
  standalone: false,
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
  host: { class: 'shrink-0' },
})
export class ChatHeaderComponent {
  private authService = inject(AuthService);
  private drawerService = inject(DrawerService);
  private chatService = inject(ChatService);

  @Output() signInClicked = new EventEmitter<void>();

  currentUser$ = this.authService.currentUser$;
  today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  openDrawer(): void {
    this.drawerService.open();
  }

  clearChat(): void {
    this.chatService.clearChat();
  }

  handleUserChip(): void {
    if (!this.authService.currentUser) {
      this.signInClicked.emit();
    }
  }
}
