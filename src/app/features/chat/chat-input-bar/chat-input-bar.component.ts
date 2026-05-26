import { Component } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { IntentResolverService } from '../../../core/services/intent-resolver.service';
import { AuthService } from '../../../core/services/auth.service';
import { HuggingFaceService } from '../../../core/services/huggingface.service';
import { LoginModalService } from '../../../core/services/login-modal.service';
import { QuickChip } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-input-bar',
  standalone: false,
  templateUrl: './chat-input-bar.component.html',
  styleUrl: './chat-input-bar.component.css',
  host: { class: 'shrink-0' },
})
export class ChatInputBarComponent {
  inputText = '';
  isListening = false;
  private recognition: any = null;

  constructor(
    private chatService: ChatService,
    private intentResolver: IntentResolverService,
    private authService: AuthService,
    private hfService: HuggingFaceService,
    private loginModalService: LoginModalService,
  ) {
    this.hfService.loadModel();
    this.initSpeechRecognition();
  }

  private initSpeechRecognition(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      this.inputText = transcript;
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.inputText.trim()) {
        this.handleSend();
      }
    };

    this.recognition.onerror = () => {
      this.isListening = false;
    };
  }

  toggleMic(): void {
    if (!this.recognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    } else {
      this.inputText = '';
      this.recognition.start();
      this.isListening = true;
    }
  }

  get aiStatus(): string {
    if (this.hfService.isLoaded) return 'ready';
    if (this.hfService.isLoading) return 'loading';
    if (this.hfService.loadError) return 'error';
    return 'idle';
  }

  get aiErrorMsg(): string {
    return this.hfService.loadError || '';
  }

  handleSend(text?: string): void {
    const query = (text || this.inputText).trim();
    if (!query) return;
    if (!this.authService.isAuthenticated) {
      this.loginModalService.open();
      return;
    }
    this.inputText = '';
    this.chatService.addUserMessage(query);
    const typingId = this.chatService.addTypingIndicator();

    if (this.hfService.isLoaded) {
      this.handleWithAi(query, typingId);
    } else {
      this.handleWithRules(query, typingId);
    }
  }

  private async handleWithAi(query: string, typingId: string): Promise<void> {
    try {
      const ruleAction = this.intentResolver.resolve(query);

      if (ruleAction.intent === 'unknown' && this.isGreetingOrJunk(query)) {
        this.chatService.removeMessage(typingId);
        this.chatService.addBotMessage(
          this.getStaticResponse('unknown'),
          undefined,
          this.getChips('unknown'),
          ruleAction,
        );
        return;
      }

      const aiResult = await this.hfService.classifyIntent(query);

      const useAi = aiResult.confidence > 0.45 && aiResult.intent !== 'unknown' && !this.isGreetingOrJunk(query);
      const finalIntent = useAi ? aiResult.intent : ruleAction.intent;
      const finalAction = useAi
        ? { ...ruleAction, intent: finalIntent }
        : ruleAction;

      // Use AI-generated response sentence
      const response = useAi
        ? aiResult.response
        : this.getStaticResponse(finalIntent, ruleAction.entity?.name || ruleAction.entity?.ticker);

      this.chatService.removeMessage(typingId);
      this.chatService.addBotMessage(response, undefined, this.getChips(finalIntent), finalAction);
    } catch {
      this.handleWithRules(query, typingId);
    }
  }

  private handleWithRules(query: string, typingId: string): void {
    const action = this.intentResolver.resolve(query);
    setTimeout(() => {
      this.chatService.removeMessage(typingId);
      this.chatService.addBotMessage(
        this.getStaticResponse(action.intent, action.entity?.name || action.entity?.ticker),
        undefined,
        this.getChips(action.intent),
        action,
      );
    }, 550 + Math.random() * 300);
  }

  private getStaticResponse(intent: string, entity?: string): string {
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
        { query: 'How is NVDA doing?', label: '� Check NVDA' },
        { query: 'Show my portfolio', label: '💼 Portfolio' },
      ],
      'themes.all': [
        { query: 'Themes I follow', label: '� Following' },
        { query: 'Themes not following', label: '🌐 Not following' },
      ],
      'themes.following': [
        { query: 'Themes not following', label: '🌐 Not following' },
        { query: 'Show all themes', label: '� All themes' },
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

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }

  private isGreetingOrJunk(query: string): boolean {
    const greetings = /^\s*(hi|hello|hey|yo|sup|hola|howdy|hii+|good\s*(morning|afternoon|evening|night)|what'?s?\s*up|greetings?)\s*[!?.]*\s*$/i;
    const junk = /^[^a-zA-Z]*$|^(.)\1{2,}$/;
    const tooShort = query.trim().length <= 3 && !/\b[A-Z]{2,5}\b/.test(query);
    return greetings.test(query) || junk.test(query) || tooShort;
  }
}
