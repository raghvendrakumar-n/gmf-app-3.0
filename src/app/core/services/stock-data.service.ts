import { Injectable } from '@angular/core';
import { StockPulse, HealthScoreZone, ReversalBand, SectorData } from '../models/stock.model';

const STOCK_DATA: Record<string, StockPulse> = {
  AAPL: { price: '$198.34', cap: '$3.04T', sector: 'Technology', industry: 'Consumer Electronics', index: 'S&P 500', volRange: '55M–82M', hs: 72, rp: 22, trend: 'UPTREND', trendStr: 'STRONG', vol: 'LOW', alpha: '+2.1%', sentiment: 'BULLISH', alpha2: '1.84', beta: '1.12', corr: '0.91', spPerf: '+14.2%', weekMov: '+2.8%', swingProb: '38%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  NVDA: { price: '$874.21', cap: '$2.15T', sector: 'Technology', industry: 'Semiconductors', index: 'S&P 500', volRange: '42M–68M', hs: 81, rp: 15, trend: 'UPTREND', trendStr: 'STRONG', vol: 'MEDIUM', alpha: '+5.3%', sentiment: 'BULLISH', alpha2: '4.92', beta: '1.68', corr: '0.78', spPerf: '+38.6%', weekMov: '+4.1%', swingProb: '29%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  TSLA: { price: '$187.60', cap: '$597B', sector: 'Consumer', industry: 'Auto Manufacturers', index: 'S&P 500', volRange: '88M–130M', hs: 31, rp: 71, trend: 'DOWNTREND', trendStr: 'MODERATE', vol: 'HIGH', alpha: '−3.8%', sentiment: 'BEARISH', alpha2: '-2.91', beta: '2.04', corr: '0.61', spPerf: '−18.4%', weekMov: '−3.2%', swingProb: '64%', sectorHsZone: 'Watch', indexHsZone: 'Hold' },
  AMD: { price: '$176.80', cap: '$285B', sector: 'Technology', industry: 'Semiconductors', index: 'S&P 500', volRange: '38M–55M', hs: 64, rp: 34, trend: 'UPTREND', trendStr: 'MODERATE', vol: 'MEDIUM', alpha: '+1.6%', sentiment: 'BULLISH', alpha2: '1.41', beta: '1.54', corr: '0.82', spPerf: '+9.8%', weekMov: '+1.9%', swingProb: '44%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  META: { price: '$512.90', cap: '$1.30T', sector: 'Communications', industry: 'Social Media', index: 'S&P 500', volRange: '14M–22M', hs: 78, rp: 19, trend: 'UPTREND', trendStr: 'STRONG', vol: 'LOW', alpha: '+3.7%', sentiment: 'BULLISH', alpha2: '3.44', beta: '1.21', corr: '0.85', spPerf: '+26.1%', weekMov: '+3.4%', swingProb: '31%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  MSFT: { price: '$421.80', cap: '$3.13T', sector: 'Technology', industry: 'Software', index: 'S&P 500', volRange: '18M–28M', hs: 68, rp: 28, trend: 'UPTREND', trendStr: 'MODERATE', vol: 'LOW', alpha: '+1.2%', sentiment: 'BULLISH', alpha2: '1.08', beta: '0.92', corr: '0.88', spPerf: '+11.4%', weekMov: '+1.5%', swingProb: '36%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  AMZN: { price: '$188.45', cap: '$1.97T', sector: 'Consumer', industry: 'E-Commerce', index: 'S&P 500', volRange: '30M–48M', hs: 70, rp: 24, trend: 'UPTREND', trendStr: 'MODERATE', vol: 'LOW', alpha: '+2.4%', sentiment: 'BULLISH', alpha2: '2.18', beta: '1.14', corr: '0.87', spPerf: '+16.2%', weekMov: '+2.1%', swingProb: '40%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  INTC: { price: '$19.84', cap: '$84B', sector: 'Technology', industry: 'Semiconductors', index: 'S&P 500', volRange: '44M–70M', hs: 22, rp: 62, trend: 'DOWNTREND', trendStr: 'STRONG', vol: 'HIGH', alpha: '−6.2%', sentiment: 'BEARISH', alpha2: '-5.88', beta: '0.88', corr: '0.52', spPerf: '−34.8%', weekMov: '−4.8%', swingProb: '71%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  GOOGL: { price: '$175.20', cap: '$2.19T', sector: 'Communications', industry: 'Internet Services', index: 'S&P 500', volRange: '22M–35M', hs: 66, rp: 31, trend: 'UPTREND', trendStr: 'MODERATE', vol: 'LOW', alpha: '+1.8%', sentiment: 'BULLISH', alpha2: '1.54', beta: '1.06', corr: '0.89', spPerf: '+10.6%', weekMov: '+1.7%', swingProb: '38%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  GLD: { price: '$232.14', cap: 'N/A', sector: 'Materials', industry: 'Commodities ETF', index: 'NYSE Arca', volRange: '8M–14M', hs: 75, rp: 21, trend: 'UPTREND', trendStr: 'STRONG', vol: 'LOW', alpha: '+3.1%', sentiment: 'BULLISH', alpha2: '2.84', beta: '0.04', corr: '0.12', spPerf: '+18.4%', weekMov: '+2.6%', swingProb: '33%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  SPY: { price: '$584.20', cap: 'N/A', sector: 'Broad Market', industry: 'Index ETF', index: 'S&P 500', volRange: '55M–90M', hs: 61, rp: 30, trend: 'UPTREND', trendStr: 'MODERATE', vol: 'LOW', alpha: '0.0%', sentiment: 'NEUTRAL', alpha2: '0.00', beta: '1.00', corr: '1.00', spPerf: '+8.4%', weekMov: '+0.9%', swingProb: '45%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
  QQQ: { price: '$491.05', cap: 'N/A', sector: 'Technology', industry: 'Index ETF', index: 'NASDAQ 100', volRange: '38M–60M', hs: 69, rp: 26, trend: 'UPTREND', trendStr: 'MODERATE', vol: 'LOW', alpha: '+1.5%', sentiment: 'BULLISH', alpha2: '1.32', beta: '1.08', corr: '0.93', spPerf: '+12.1%', weekMov: '+1.6%', swingProb: '37%', sectorHsZone: 'Hold', indexHsZone: 'Hold' },
};

const DEFAULT_DATA: StockPulse = { price: '—', cap: '—', sector: '—', industry: '—', index: '—', volRange: '—', hs: 55, rp: 40, trend: 'NEUTRAL', trendStr: 'WEAK', vol: 'MEDIUM', alpha: '—', sentiment: 'NEUTRAL', alpha2: '—', beta: '—', corr: '—', spPerf: '—', weekMov: '—', swingProb: '—', sectorHsZone: '—', indexHsZone: '—' };

const SECTOR_DATA_MAP: Record<string, SectorData> = {
  technology: { sig: 'BULLISH', chg: '+1.82%', sc: 'g', stocks: 847, leaders: ['AAPL', 'MSFT', 'NVDA', 'AMD'] },
  energy: { sig: 'NEUTRAL', chg: '+0.44%', sc: 'a', stocks: 142, leaders: ['XOM', 'CVX', 'COP', 'SLB'] },
  healthcare: { sig: 'NEUTRAL', chg: '+0.12%', sc: 'a', stocks: 318, leaders: ['JNJ', 'UNH', 'ABBV', 'VRTX'] },
  financials: { sig: 'BEARISH', chg: '−0.73%', sc: 'r', stocks: 271, leaders: ['JPM', 'BAC', 'GS', 'MS'] },
  industrials: { sig: 'NEUTRAL', chg: '+0.28%', sc: 'a', stocks: 196, leaders: ['CAT', 'BA', 'HON', 'UPS'] },
  consumer: { sig: 'BULLISH', chg: '+0.61%', sc: 'g', stocks: 224, leaders: ['AMZN', 'TSLA', 'MCD', 'NKE'] },
  'real estate': { sig: 'BEARISH', chg: '−0.55%', sc: 'r', stocks: 98, leaders: ['PLD', 'AMT', 'EQIX', 'SPG'] },
  materials: { sig: 'NEUTRAL', chg: '+0.09%', sc: 'a', stocks: 114, leaders: ['LIN', 'APD', 'FCX', 'NUE'] },
  communications: { sig: 'BULLISH', chg: '+1.14%', sc: 'g', stocks: 88, leaders: ['META', 'GOOGL', 'NFLX', 'DIS'] },
};

@Injectable({ providedIn: 'root' })
export class StockDataService {
  getStockData(ticker: string): StockPulse {
    return STOCK_DATA[ticker] || DEFAULT_DATA;
  }

  getSectorData(sector: string): SectorData {
    return SECTOR_DATA_MAP[sector] || { sig: 'NEUTRAL', chg: '+0.00%', sc: 'a', stocks: 0, leaders: [] };
  }

  hsZoneInfo(score: number): HealthScoreZone {
    if (score <= 25) return { zone: 'Watch / Sell', col: '#e74c3c', sc: 'r', pct: score };
    if (score <= 50) return { zone: 'Buy Zone', col: '#27ae60', sc: 'g', pct: score };
    if (score <= 75) return { zone: 'Hold Zone', col: '#2980b9', sc: 'b', pct: score };
    return { zone: 'Hedge Zone', col: '#8e44ad', sc: 'r', pct: score };
  }

  rpBand(rp: number): ReversalBand {
    if (rp <= 33) return { band: 'Low', sc: 'g', idx: 0 };
    if (rp <= 66) return { band: 'Medium', sc: 'a', idx: 1 };
    return { band: 'High', sc: 'r', idx: 2 };
  }
}
