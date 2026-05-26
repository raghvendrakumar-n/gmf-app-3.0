import { Component, Input, inject } from '@angular/core';
import { StockDataService } from '../../../../core/services/stock-data.service';
import { StockPulse, HealthScoreZone, ReversalBand } from '../../../../core/models/stock.model';

@Component({
  selector: 'app-stock-pulse-card',
  standalone: false,
  templateUrl: './stock-pulse.component.html',
  styleUrl: './stock-pulse.component.css',
})
export class StockPulseCardComponent {
  @Input() ticker = '';
  private stockDataService = inject(StockDataService);

  activeTab = 0;

  zones = [
    { label: 'Watch / Sell', range: '0–25', col: '#e74c3c', bg: '#ffeaea', text: '#a31e1e' },
    { label: 'Buy Zone', range: '26–50', col: '#27ae60', bg: '#d4f0e5', text: '#0f5c3f' },
    { label: 'Hold Zone', range: '51–75', col: '#2980b9', bg: '#daeaf8', text: '#1a5276' },
    { label: 'Hedge Zone', range: '76–100', col: '#8e44ad', bg: '#f0e5f9', text: '#5b1a8e' },
  ];

  get stockData(): StockPulse { return this.stockDataService.getStockData(this.ticker); }
  get hsZone(): HealthScoreZone { return this.stockDataService.hsZoneInfo(this.stockData.hs); }
  get rpInfo(): ReversalBand { return this.stockDataService.rpBand(this.stockData.rp); }

  get activeZoneIdx(): number {
    const hs = this.stockData.hs;
    if (hs <= 25) return 0;
    if (hs <= 50) return 1;
    if (hs <= 75) return 2;
    return 3;
  }

  get activeZone() { return this.zones[this.activeZoneIdx]; }

  get rpActiveBars(): number {
    const rp = this.stockData.rp;
    return rp === 0 ? 0 : Math.min(5, Math.ceil(rp / 20));
  }

  get rpDotColor(): string {
    const band = this.rpInfo.band.toLowerCase();
    if (band === 'low') return '#27ae60';
    if (band === 'medium') return '#e67e22';
    return '#d63031';
  }

  get rpBarColor(): string {
    const band = this.rpInfo.band.toLowerCase();
    if (band === 'low') return 'bg-green-500';
    if (band === 'medium') return 'bg-amber-500';
    return 'bg-red-500';
  }

  get trendColor(): string {
    if (this.stockData.trend === 'UPTREND') return 'text-teal-600';
    if (this.stockData.trend === 'DOWNTREND') return 'text-danger';
    return 'text-amber-600';
  }

  get sentimentColor(): string {
    if (this.stockData.sentiment === 'BULLISH') return 'text-teal-600';
    if (this.stockData.sentiment === 'BEARISH') return 'text-danger';
    return 'text-amber-600';
  }

  barHeights = [20, 36, 52, 70, 90];
}
