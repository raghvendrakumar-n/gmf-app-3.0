import { Injectable } from '@angular/core';

export interface TradeDecision {
  action: 'BUY' | 'SELL' | 'HOLD';
  ticker: string;
  date: string;
  healthScore: number;
  reversalProb: number;
  aligned: boolean;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class TradeReviewService {
  private mockDecisions: TradeDecision[] = [
    { action: 'BUY', ticker: 'NVDA', date: 'Apr 8', healthScore: 79, reversalProb: 18, aligned: true, notes: 'Strong momentum, low reversal risk' },
    { action: 'SELL', ticker: 'INTC', date: 'Apr 3', healthScore: 24, reversalProb: 61, aligned: true, notes: 'Deteriorating fundamentals' },
    { action: 'BUY', ticker: 'TSLA', date: 'Mar 28', healthScore: 33, reversalProb: 68, aligned: false, notes: 'High reversal risk — misaligned with profile' },
    { action: 'HOLD', ticker: 'AAPL', date: 'Mar 22', healthScore: 71, reversalProb: 23, aligned: true, notes: 'Stable hold zone position' },
    { action: 'BUY', ticker: 'META', date: 'Mar 15', healthScore: 76, reversalProb: 20, aligned: true, notes: 'Strong uptrend, good alignment' },
  ];

  getRecentDecisions(): TradeDecision[] {
    return this.mockDecisions;
  }

  getStats() {
    const total = this.mockDecisions.length;
    const aligned = this.mockDecisions.filter((d) => d.aligned).length;
    const buys = this.mockDecisions.filter((d) => d.action === 'BUY').length;
    const sells = this.mockDecisions.filter((d) => d.action === 'SELL').length;
    return {
      total,
      aligned,
      alignmentRate: Math.round((aligned / total) * 100),
      buys,
      sells,
      holds: total - buys - sells,
    };
  }
}
