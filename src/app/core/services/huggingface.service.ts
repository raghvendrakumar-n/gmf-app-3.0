import { Injectable } from '@angular/core';
import { pipeline, env } from '@huggingface/transformers';

export interface AiIntentResult {
  intent: string;
  confidence: number;
  response: string;
}

const CANDIDATE_LABELS = [
  'stock_price_check',
  'market_overview',
  'sector_analysis',
  'portfolio_view',
  'watchlist_view',
  'investment_goals',
  'trading_opportunities',
  'notifications_alerts',
  'investment_themes',
  'favorites_view',
  'account_settings',
  'agent_configuration',
  'stock_universe',
  'greeting',
];

const LABEL_TO_INTENT: Record<string, string> = {
  'stock_price_check': 'stock_pulse',
  'market_overview': 'market_pulse',
  'sector_analysis': 'sector_pulse',
  'portfolio_view': 'portfolio.show',
  'watchlist_view': 'watchlist.show',
  'investment_goals': 'goals.show',
  'trading_opportunities': 'opportunities.show',
  'notifications_alerts': 'notifications.show',
  'investment_themes': 'themes.all',
  'favorites_view': 'favorites.show',
  'account_settings': 'account.show',
  'agent_configuration': 'agent.show',
  'stock_universe': 'universe.show',
  'greeting': 'unknown',
};

const RESPONSE_TEMPLATES: Record<string, string[]> = {
  'stock_pulse': [
    'Let me pull up the latest analysis for this stock.',
    'Here\'s what I found — HealthScore, trend signals, and more.',
    'I\'ve analyzed this stock across multiple dimensions for you.',
  ],
  'market_pulse': [
    'Here\'s today\'s market snapshot across major indices and sectors.',
    'Let me show you how the market is performing right now.',
    'I\'ve gathered the latest market data — indices, sectors, and volatility.',
  ],
  'sector_pulse': [
    'Here\'s the current pulse for this sector with signal and leader stocks.',
    'Let me break down how this sector is performing today.',
    'I\'ve analyzed the sector — signal, movement, and top performers.',
  ],
  'portfolio.show': [
    'Here\'s your portfolio overview with current holdings and returns.',
    'Let me show you how your investments are performing.',
    'Your portfolio at a glance — holdings, gains, and allocation.',
  ],
  'watchlist.show': [
    'Here\'s your watchlist — stocks you\'re currently tracking.',
    'These are the stocks on your radar right now.',
    'Your tracked stocks with latest signals and prices.',
  ],
  'goals.show': [
    'Here\'s a summary of your active investment goals and progress.',
    'Let me show you where you stand on your financial goals.',
    'Your goals tracker — see how each target is progressing.',
  ],
  'opportunities.show': [
    'Here are opportunities that match your investment criteria.',
    'I\'ve found some interesting setups based on your universe.',
    'These stocks show promising signals aligned with your strategy.',
  ],
  'notifications.show': [
    'Here are your latest alerts and notifications.',
    'You have some important updates — let me show you.',
    'Your recent notifications, including signal changes and triggers.',
  ],
  'themes.all': [
    'Here are the investment themes you can follow.',
    'Browse available themes — from AI to clean energy.',
    'Investment themes help you track sector-wide narratives.',
  ],
  'favorites.show': [
    'Here are your saved favorite stocks.',
    'Your favorites list — quick access to stocks you care about.',
    'These are the stocks you\'ve bookmarked for easy access.',
  ],
  'account.show': [
    'Here\'s your account information and subscription details.',
    'Your account overview — plan, profile, and settings.',
    'Let me pull up your account details.',
  ],
  'agent.show': [
    'Here are Leo\'s current settings and capabilities.',
    'Your AI agent configuration — risk profile, signals, and preferences.',
    'Leo\'s setup — here\'s how your agent is configured.',
  ],
  'universe.show': [
    'Here\'s your investment universe — all tracked instruments.',
    'Your universe spans stocks, ETFs, and indices across exchanges.',
    'The full scope of instruments Leo monitors for you.',
  ],
};

@Injectable({ providedIn: 'root' })
export class HuggingFaceService {
  private classifier: any = null;
  private loading = false;
  private loaded = false;
  private error: string | null = null;

  constructor() {
    env.allowLocalModels = false;
    env.useBrowserCache = true;
  }

  get isLoaded(): boolean { return this.loaded; }
  get isLoading(): boolean { return this.loading; }
  get loadError(): string | null { return this.error; }

  async loadModel(): Promise<void> {
    if (this.loaded || this.loading) return;
    this.loading = true;
    this.error = null;
    try {
      this.classifier = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
      this.loaded = true;
      console.log('✅ Zero-shot classification model loaded');
    } catch (err: any) {
      this.error = err?.message || 'Failed to load model';
      console.error('❌ Failed to load HuggingFace model:', err);
    } finally {
      this.loading = false;
    }
  }

  async classifyIntent(userMessage: string): Promise<AiIntentResult> {
    if (!this.classifier) {
      return { intent: 'unknown', confidence: 0, response: '' };
    }

    try {
      const result = await this.classifier(userMessage, {
        candidate_labels: CANDIDATE_LABELS,
      });

      const topLabel = result.labels[0] as string;
      const topScore = result.scores[0] as number;
      const intent = LABEL_TO_INTENT[topLabel] || 'unknown';
      const response = this.pickResponse(intent);

      console.log(`🤖 AI classified: "${userMessage}" → ${topLabel} (${(topScore * 100).toFixed(1)}%)`);

      return { intent, confidence: topScore, response };
    } catch (err) {
      console.error('Classification error:', err);
      return { intent: 'unknown', confidence: 0, response: '' };
    }
  }

  generateResponse(intent: string): string {
    return this.pickResponse(intent);
  }

  private pickResponse(intent: string): string {
    const templates = RESPONSE_TEMPLATES[intent];
    if (!templates || templates.length === 0) {
      return 'I\'m here to help. Try asking about a stock, your portfolio, or the market.';
    }
    return templates[Math.floor(Math.random() * templates.length)];
  }
}
