export type Scope = 'USER' | 'STOCK' | 'SECTOR' | 'MARKET' | 'UNKNOWN';

export interface StockEntity {
  ticker: string;
  name: string;
  type: 'stock' | 'etf';
}

export interface ActionObject {
  intent: string;
  entity: StockEntity | null;
  sector: string | null;
  scope: Scope;
  raw: string;
}
