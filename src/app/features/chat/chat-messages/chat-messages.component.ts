import { Component, ElementRef, ViewChild, AfterViewChecked, inject } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { IntentResolverService } from '../../../core/services/intent-resolver.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoginModalService } from '../../../core/services/login-modal.service';
import { QuickChip } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-messages',
  standalone: false,
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css',
  host: { class: 'flex-1 min-h-0 flex flex-col' },
})
export class ChatMessagesComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  private chatService = inject(ChatService);
  private intentResolver = inject(IntentResolverService);
  private authService = inject(AuthService);
  private loginModalService = inject(LoginModalService);
  messages$ = this.chatService.messages$;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  onChipClicked(query: string): void {
    if (!this.authService.isAuthenticated) {
      this.loginModalService.open();
      return;
    }
    this.chatService.addUserMessage(query);
    const typingId = this.chatService.addTypingIndicator();
    const action = this.intentResolver.resolve(query);
    setTimeout(() => {
      this.chatService.removeMessage(typingId);
      this.chatService.addBotMessage(
        this.getBotResponse(action.intent, action.entity?.name || action.entity?.ticker),
        undefined,
        this.getChips(action.intent),
        action,
      );
    }, 550 + Math.random() * 300);
  }

  private getBotResponse(intent: string, entity?: string): string {
    const map: Record<string, string> = {
      'market_pulse': 'Here\'s today\'s market snapshot across major indices and sectors.',
      'stock_pulse': `Here's the latest pulse for <strong>${entity || 'the stock'}</strong>.`,
      'sector_pulse': 'Here\'s how this sector is performing today.',
      'portfolio.show': 'Here\'s your portfolio overview with current holdings.',
      'watchlist.show': 'Here\'s your watchlist — stocks you\'re tracking.',
      'goals.show': 'Here\'s a summary of your active investment goals.',
      'goals.add': 'Let\'s set up a new goal. Fill in the details below.',
      'trades.review': 'Your trading decision review — <strong>80%</strong> of decisions aligned with HealthScore & ReversalProbability signals over the last 12 months.',
      'blind_spots.show': 'Identified 3 behavioral blind spots based on your activity and persona.',
      'risk_profile.show': 'Your current risk profile, last assessed January 2026.',
      'money_persona.show': 'Your money persona reflects your natural investing style and decision-making patterns.',
      'agent.show': 'Here are Leo\'s current settings and your profile.',
      'opportunities.show': 'Here are opportunities matching your investment universe.',
      'notifications.show': 'Here are your latest alerts and notifications.',
      'themes.all': 'Here are the investment themes available for you.',
      'themes.following': 'Here are the themes you\'re currently following.',
      'favorites.show': 'Here are your saved favorite stocks.',
      'universe.show': 'Here\'s your investment universe — all tracked instruments.',
      'account.show': 'Here\'s your account information.',
    };
    return map[intent] || 'I didn\'t quite follow that. Here are some things I can help with:';
  }

  private getChips(intent: string): QuickChip[] {
    const chipMap: Record<string, QuickChip[]> = {
      'market_pulse': [
        { query: 'How is Apple doing?', label: ' Check Apple' },
        { query: 'Show matching opportunities', label: '🎯 Find opportunities' },
      ],
      'stock_pulse': [
        { query: 'Show my portfolio', label: '💼 Portfolio' },
        { query: 'How is the market doing?', label: '📊 Market pulse' },
      ],
      'sector_pulse': [
        { query: 'Show matching opportunities', label: '🎯 Opportunities' },
        { query: 'How is the market doing?', label: '📊 Full market' },
      ],
      'portfolio.show': [
        { query: 'Show my watchlist', label: '👁 Watchlist' },
        { query: 'Show my goals', label: '🎯 Goals' },
      ],
      'watchlist.show': [
        { query: 'Show my portfolio', label: '💼 Portfolio' },
        { query: 'Show opportunities', label: '🎯 Opportunities' },
      ],
      'goals.show': [
        { query: 'Add a new goal', label: '+ New goal' },
        { query: 'Show my portfolio', label: '💼 Portfolio' },
      ],
      'goals.add': [],
      'trades.review': [
        { query: 'Show all trades', label: '📋 Show all' },
        { query: 'How is AAPL doing?', label: '📊 Analyse AAPL' },
      ],
      'blind_spots.show': [
        { query: 'Redo my blind spots', label: '↻ Reassess' },
        { query: 'What is my money persona?', label: '🦉 Persona' },
      ],
      'risk_profile.show': [
        { query: 'Redo my risk profile', label: '↻ Reassess' },
        { query: 'What are my blind spots?', label: '⚠ Blind spots' },
      ],
      'money_persona.show': [
        { query: 'What are my blind spots?', label: '⚠️ Blind spots' },
        { query: 'Redo my money persona', label: '↻ Reassess' },
      ],
      'opportunities.show': [
        { query: 'How is NVDA doing?', label: '📈 Check NVDA' },
        { query: 'Show my portfolio', label: '💼 Portfolio' },
      ],
    };
    return chipMap[intent] || [
      { query: 'How is the market doing?', label: '📊 Market' },
      { query: 'Show my portfolio', label: '💼 Portfolio' },
      { query: 'Show matching opportunities', label: '🎯 Opportunities' },
      { query: 'What is my risk profile?', label: '🩷 Risk profile' },
      { query: 'Show my watchlist', label: '👁 Watchlist' },
      { query: 'Show my goals', label: '🎯 Goals' },
      { query: 'What is my money persona?', label: '🦉 Persona' },
      { query: 'Show my notifications', label: '🔔 Notifications' },
    ];
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
