import { Component, inject } from '@angular/core';
import { TradeReviewService } from '../../../../core/services/trade-review.service';

@Component({
  selector: 'app-trade-review-chat-card',
  standalone: false,
  templateUrl: './trade-review-chat-card.component.html',
  styleUrl: './trade-review-chat-card.component.css',
})
export class TradeReviewChatCardComponent {
  private tradeReviewService = inject(TradeReviewService);
  stats = this.tradeReviewService.getStats();
  decisions = this.tradeReviewService.getRecentDecisions();
  activeTab = 0;

  monthly = [58, 62, 75, 78, 68, 71];

  get pctNotAligned(): number { return 100 - this.stats.alignmentRate; }
  get notAlignedCount(): number { return this.stats.total - this.stats.aligned; }

  barColor(val: number): string {
    if (val >= 75) return 'var(--color-teal-600)';
    if (val >= 55) return 'var(--color-gold-500)';
    return 'var(--color-danger)';
  }

  barHeight(val: number): string {
    return Math.round(8 + (val / 100) * 14) + 'px';
  }

  dotColor(val: number): string {
    if (val >= 75) return 'text-teal-600';
    if (val >= 55) return 'text-amber-500';
    return 'text-red-500';
  }
}
