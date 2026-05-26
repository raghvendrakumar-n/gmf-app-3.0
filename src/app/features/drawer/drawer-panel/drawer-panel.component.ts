import { Component, inject } from '@angular/core';
import { DrawerService } from '../../../core/services/drawer.service';
import { ChatService } from '../../../core/services/chat.service';
import { IntentResolverService } from '../../../core/services/intent-resolver.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoginModalService } from '../../../core/services/login-modal.service';
import { QuickChip } from '../../../core/models/chat.model';

@Component({
  selector: 'app-drawer-panel',
  standalone: false,
  templateUrl: './drawer-panel.component.html',
  styleUrl: './drawer-panel.component.css',
})
export class DrawerPanelComponent {
  private drawerService = inject(DrawerService);
  private chatService = inject(ChatService);
  private intentResolver = inject(IntentResolverService);
  private authService = inject(AuthService);
  private loginModalService = inject(LoginModalService);

  isOpen$ = this.drawerService.isOpen$;

  sections = [
    { label: 'My Agent', isAgent: true, items: [
      { icon: 'L', title: 'Leo — AI Analyst', sub: 'Capabilities, context & settings', query: 'Show my agent', iconStyle: 'background:linear-gradient(135deg,var(--color-teal-600),var(--color-teal-800));box-shadow:0 2px 8px rgba(26,127,90,0.3)', iconTextClass: 'font-serif text-[16px] text-white leading-none', arrowClass: 'text-teal-600' },
    ]},
    { label: 'Market', isAgent: false, items: [
      { icon: '📊', title: 'Market Pulse', sub: 'Indices & sectors', query: 'How is the market doing today?', iconStyle: 'background:linear-gradient(135deg,#d4f0e5,#a8e4c8)', iconTextClass: '', arrowClass: '' },
      { icon: '🎯', title: 'Opportunities', sub: 'Matching your universe', query: 'Show matching opportunities', iconStyle: 'background:linear-gradient(135deg,#e3f0ff,#b8d8ff)', iconTextClass: '', arrowClass: '' },
      { icon: '🌐', title: 'Themes', sub: 'AI, clean energy & more', query: 'Show me all themes', iconStyle: 'background:linear-gradient(135deg,#fff8dc,#ffe99a)', iconTextClass: '', arrowClass: '' },
    ]},
    { label: 'My Portfolio', isAgent: false, items: [
      { icon: '💼', title: 'Portfolio', sub: 'Holdings & performance', query: 'Show my portfolio', iconStyle: 'background:linear-gradient(135deg,#d4f0e5,#a8e4c8)', iconTextClass: '', arrowClass: '' },
      { icon: '👁', title: 'Watchlist', sub: '5 stocks tracked', query: 'Show my watchlist', iconStyle: 'background:linear-gradient(135deg,#e3f0ff,#b8d8ff)', iconTextClass: '', arrowClass: '' },
      { icon: '★', title: 'Favorites', sub: '4 saved stocks', query: 'Show my favorites', iconStyle: 'background:linear-gradient(135deg,#fff8dc,#ffe99a)', iconTextClass: '', arrowClass: '' },
      { icon: '🎯', title: 'Goals', sub: '3 active goals', query: 'Show my goals', iconStyle: 'background:linear-gradient(135deg,#f3e8ff,#ddb8ff)', iconTextClass: '', arrowClass: '' },
    ]},
    { label: 'My Profile', isAgent: false, items: [
      { icon: '🦉', title: 'Money Persona', sub: 'The Strategist', query: 'What is my money persona?', iconStyle: 'background:linear-gradient(135deg,#e3f0ff,#b8d8ff)', iconTextClass: '', arrowClass: '' },
      { icon: '🛡', title: 'Risk Profile', sub: 'Moderate Growth', query: 'What is my risk profile?', iconStyle: 'background:linear-gradient(135deg,#ffeaea,#ffbebe)', iconTextClass: '', arrowClass: '' },
      { icon: '⚠', title: 'Blind Spots', sub: '3 identified', query: 'What are my blind spots?', iconStyle: 'background:linear-gradient(135deg,#fff8dc,#ffe99a)', iconTextClass: '', arrowClass: '' },
    ]},
    { label: 'Activity', isAgent: false, items: [
      { icon: '🔔', title: 'Notifications', sub: '3 new alerts', query: 'Show my notifications', iconStyle: 'background:linear-gradient(135deg,#e3f0ff,#b8d8ff)', iconTextClass: '', arrowClass: '' },
      { icon: '🌍', title: 'My Universe', sub: '360 instruments', query: 'Show my universe', iconStyle: 'background:linear-gradient(135deg,#d4f0e5,#a8e4c8)', iconTextClass: '', arrowClass: '' },
      { icon: '📋', title: 'Trade Review', sub: 'Last 30 days', query: 'Review my trades', iconStyle: 'background:linear-gradient(135deg,#f3e8ff,#ddb8ff)', iconTextClass: '', arrowClass: '' },
    ]},
  ];

  constructor() {}

  close(): void { this.drawerService.close(); }

  sendQuery(query: string): void {
    this.drawerService.close();
    if (!this.authService.isAuthenticated) {
      this.loginModalService.open();
      return;
    }
    this.chatService.addUserMessage(query);
    const typingId = this.chatService.addTypingIndicator();
    const action = this.intentResolver.resolve(query);
    setTimeout(() => {
      this.chatService.removeMessage(typingId);
      this.chatService.addBotMessage(this.getBotResponse(action.intent, action.entity?.name || action.entity?.ticker), undefined, this.getChips(action.intent), action);
    }, 550 + Math.random() * 300);
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
      'favorites.show': [
        { query: 'Show my watchlist', label: '👁 Watchlist' },
        { query: 'Show my portfolio', label: '💼 Portfolio' },
      ],
      'universe.show': [
        { query: 'Show opportunities', label: '🎯 Opportunities' },
        { query: 'Show me all themes', label: '🌐 Themes' },
      ],
      'account.show': [
        { query: 'Show my agent', label: '🤖 Agent settings' },
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
}
