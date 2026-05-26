import { Component } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { IntentResolverService } from '../../../core/services/intent-resolver.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoginModalService } from '../../../core/services/login-modal.service';
import { QuickChip } from '../../../core/models/chat.model';

@Component({
  selector: 'app-welcome-screen',
  standalone: false,
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.css',
})
export class WelcomeScreenComponent {
  greeting: string;

  constructor(
    private chatService: ChatService,
    private intentResolver: IntentResolverService,
    private authService: AuthService,
    private loginModalService: LoginModalService,
  ) {
    const hour = new Date().getHours();
    this.greeting = hour < 12 ? 'Good morning.' : hour < 17 ? 'Good afternoon.' : 'Good evening.';
  }

  sendQuery(text: string): void {
    if (!this.authService.isAuthenticated) {
      this.loginModalService.open();
      return;
    }
    this.chatService.addUserMessage(text);
    const typingId = this.chatService.addTypingIndicator();
    const action = this.intentResolver.resolve(text);
    setTimeout(() => {
      this.chatService.removeMessage(typingId);
      const responseMap: Record<string, string> = {
        'market_pulse': 'Here\'s today\'s market snapshot across major indices and sectors.',
        'stock_pulse': `Here's the latest pulse for <strong>${action.entity?.name || action.entity?.ticker || 'the stock'}</strong>.`,
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
        'themes.following': 'Here are the investment themes you\'re following.',
      };
      const chipMap: Record<string, QuickChip[]> = {
        'market_pulse': [
          { query: 'How is Apple doing?', label: ' Check Apple' },
          { query: 'Show matching opportunities', label: '🎯 Find opportunities' },
        ],
        'stock_pulse': [
          { query: 'Show my portfolio', label: '💼 Portfolio' },
          { query: 'How is the market doing?', label: '📊 Market pulse' },
          { query: 'Show opportunities', label: '🎯 Opportunities' },
        ],
        'sector_pulse': [
          { query: 'Show matching opportunities', label: '🎯 Opportunities' },
          { query: 'How is the market doing?', label: '📊 Full market' },
          { query: 'Show me all themes', label: '🌐 Themes' },
        ],
        'portfolio.show': [
          { query: 'Show my watchlist', label: '👁 Watchlist' },
          { query: 'Show my goals', label: '🎯 Goals' },
          { query: 'How is the market doing?', label: '📊 Market' },
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
        'agent.show': [
          { query: 'Show my portfolio', label: '💼 Portfolio' },
          { query: 'How is the market doing?', label: '📊 Market' },
        ],
        'opportunities.show': [
          { query: 'How is NVDA doing?', label: '📈 Check NVDA' },
          { query: 'Show my portfolio', label: '💼 Portfolio' },
        ],
        'notifications.show': [
          { query: 'How is NVDA doing?', label: '📊 Check NVDA' },
          { query: 'Show my portfolio', label: '💼 Portfolio' },
        ],
        'themes.all': [
          { query: 'Themes I follow', label: '🌐 Following' },
          { query: 'Themes not following', label: '🌐 Not following' },
        ],
        'themes.following': [
          { query: 'Themes not following', label: '🌐 Not following' },
          { query: 'Show all themes', label: '🌐 All themes' },
        ],
      };
      const chips = chipMap[action.intent] || [
        { query: 'How is the market doing?', label: '📊 Market' },
        { query: 'Show my portfolio', label: '💼 Portfolio' },
        { query: 'Show matching opportunities', label: '🎯 Opportunities' },
        { query: 'What is my risk profile?', label: '🩷 Risk profile' },
        { query: 'Show my watchlist', label: '👁 Watchlist' },
        { query: 'Show my goals', label: '🎯 Goals' },
        { query: 'What is my money persona?', label: '🦉 Persona' },
        { query: 'Show my notifications', label: '🔔 Notifications' },
      ];
      this.chatService.addBotMessage(
        responseMap[action.intent] || 'I didn\'t quite follow that. Here are some things I can help with:',
        undefined,
        chips,
        action,
      );
    }, 550 + Math.random() * 300);
  }
}
