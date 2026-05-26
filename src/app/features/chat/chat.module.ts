import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ChatPanelComponent } from './chat-panel/chat-panel.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatInputBarComponent } from './chat-input-bar/chat-input-bar.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { MessageBubbleComponent } from './message-bubble/message-bubble.component';
import { TypingIndicatorComponent } from './typing-indicator/typing-indicator.component';
import { QuickChipsComponent } from './quick-chips/quick-chips.component';
import { ResponseCardComponent } from './response-card/response-card.component';

import { InsightTabsComponent } from './stock-components/insight-tabs/insight-tabs.component';
import { HealthScoreGaugeComponent } from './stock-components/health-score-gauge/health-score-gauge.component';
import { ReversalProbBarsComponent } from './stock-components/reversal-prob-bars/reversal-prob-bars.component';
import { PersonalAlignmentComponent } from './stock-components/personal-alignment/personal-alignment.component';
import { SignalSummaryComponent } from './stock-components/signal-summary/signal-summary.component';

import { MarketPulseCardComponent } from './cards/market-pulse/market-pulse.component';
import { StockPulseCardComponent } from './cards/stock-pulse/stock-pulse.component';
import { SectorPulseCardComponent } from './cards/sector-pulse/sector-pulse.component';
import { PortfolioCardComponent } from './cards/portfolio/portfolio.component';
import { WatchlistCardComponent } from './cards/watchlist/watchlist.component';
import { GoalsCardComponent } from './cards/goals/goals.component';
import { AgentSettingsCardComponent } from './cards/agent-settings/agent-settings.component';
import { OpportunitiesCardComponent } from './cards/opportunities/opportunities.component';
import { NotificationsCardComponent } from './cards/notifications/notifications.component';
import { ThemesCardComponent } from './cards/themes/themes.component';
import { FavoritesCardComponent } from './cards/favorites/favorites.component';
import { UniverseCardComponent } from './cards/universe/universe.component';
import { AccountCardComponent } from './cards/account/account.component';
import { UnknownIntentCardComponent } from './cards/unknown-intent/unknown-intent.component';
import { GoalAddCardComponent } from './cards/goal-add/goal-add.component';
import { TradeReviewChatCardComponent } from './cards/trade-review-chat/trade-review-chat-card.component';
import { BlindSpotsCardComponent } from './cards/blind-spots/blind-spots.component';
import { RiskProfileCardComponent } from './cards/risk-profile/risk-profile.component';
import { MoneyPersonaCardComponent } from './cards/money-persona/money-persona.component';

@NgModule({
  declarations: [
    ChatPanelComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputBarComponent,
    WelcomeScreenComponent,
    MessageBubbleComponent,
    TypingIndicatorComponent,
    QuickChipsComponent,
    ResponseCardComponent,
    InsightTabsComponent,
    HealthScoreGaugeComponent,
    ReversalProbBarsComponent,
    PersonalAlignmentComponent,
    SignalSummaryComponent,
    MarketPulseCardComponent,
    StockPulseCardComponent,
    SectorPulseCardComponent,
    PortfolioCardComponent,
    WatchlistCardComponent,
    GoalsCardComponent,
    AgentSettingsCardComponent,
    OpportunitiesCardComponent,
    NotificationsCardComponent,
    ThemesCardComponent,
    FavoritesCardComponent,
    UniverseCardComponent,
    AccountCardComponent,
    UnknownIntentCardComponent,
    GoalAddCardComponent,
    TradeReviewChatCardComponent,
    BlindSpotsCardComponent,
    RiskProfileCardComponent,
    MoneyPersonaCardComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [ChatPanelComponent],
})
export class ChatModule {}
