export interface StockPulse {
  price: string;
  cap: string;
  sector: string;
  industry: string;
  index: string;
  volRange: string;
  hs: number;
  rp: number;
  trend: 'UPTREND' | 'DOWNTREND' | 'NEUTRAL';
  trendStr: 'STRONG' | 'MODERATE' | 'WEAK';
  vol: 'LOW' | 'MEDIUM' | 'HIGH';
  alpha: string;
  sentiment: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  alpha2: string;
  beta: string;
  corr: string;
  spPerf: string;
  weekMov: string;
  swingProb: string;
  sectorHsZone: string;
  indexHsZone: string;
}

export interface HealthScoreZone {
  zone: string;
  col: string;
  sc: string;
  pct: number;
}

export interface ReversalBand {
  band: 'Low' | 'Medium' | 'High';
  sc: string;
  idx: number;
}

export interface SectorData {
  sig: 'BULLISH' | 'NEUTRAL' | 'BEARISH';
  chg: string;
  sc: string;
  stocks: number;
  leaders: string[];
}
