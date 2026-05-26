import { Component } from '@angular/core';

interface MarketIndex {
  label: string;
  value: string;
  change: string;
  arrow: string;
  colorClass: string;
}

interface SectorRow {
  name: string;
  subtitle: string;
  change: string;
  badgeClass: string;
}

interface VixData {
  value: string;
  label: string;
  badgeClass: string;
}

@Component({
  selector: 'app-market-pulse-card',
  standalone: false,
  templateUrl: './market-pulse.component.html',
  styleUrl: './market-pulse.component.css',
})
export class MarketPulseCardComponent {
  indices: MarketIndex[] = [
    { label: 'S&P 500', value: '5,842', change: '+0.62%', arrow: '▲', colorClass: 'c-green' },
    { label: 'NASDAQ', value: '18,320', change: '+1.08%', arrow: '▲', colorClass: 'c-green' },
    { label: 'DOW', value: '42,910', change: '−0.20%', arrow: '▼', colorClass: 'c-red' },
  ];

  sectors: SectorRow[] = [
    { name: 'Technology', subtitle: 'Sector leader today', change: '+1.82%', badgeClass: 'bg-teal-50 text-teal-800 border-teal-200' },
    { name: 'Energy', subtitle: '', change: '+0.44%', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Financials', subtitle: '', change: '−0.73%', badgeClass: 'bg-red-50 text-red-700 border-red-200' },
    { name: 'Consumer Discr.', subtitle: '', change: '+0.61%', badgeClass: 'bg-teal-50 text-teal-800 border-teal-200' },
  ];

  vix: VixData = { value: '16.32', label: 'Low volatility', badgeClass: 'bg-teal-50 text-teal-800 border-teal-200' };
}
