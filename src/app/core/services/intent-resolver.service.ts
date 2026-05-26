import { Injectable } from '@angular/core';
import { ActionObject, StockEntity, Scope } from '../models/intent.model';

const NAME_MAP: [string, string, string, 'stock' | 'etf'][] = [
  ['apple', 'AAPL', 'Apple Inc.', 'stock'],
  ['microsoft', 'MSFT', 'Microsoft Corp.', 'stock'],
  ['nvidia', 'NVDA', 'Nvidia Corp.', 'stock'],
  ['amazon', 'AMZN', 'Amazon.com Inc.', 'stock'],
  ['alphabet', 'GOOGL', 'Alphabet Inc.', 'stock'],
  ['google', 'GOOGL', 'Alphabet Inc.', 'stock'],
  ['meta', 'META', 'Meta Platforms', 'stock'],
  ['facebook', 'META', 'Meta Platforms', 'stock'],
  ['tesla', 'TSLA', 'Tesla Inc.', 'stock'],
  ['berkshire', 'BRK.B', 'Berkshire Hathaway', 'stock'],
  ['netflix', 'NFLX', 'Netflix Inc.', 'stock'],
  ['adobe', 'ADBE', 'Adobe Inc.', 'stock'],
  ['amd', 'AMD', 'Adv. Micro Devices', 'stock'],
  ['intel', 'INTC', 'Intel Corp.', 'stock'],
  ['palantir', 'PLTR', 'Palantir Technologies', 'stock'],
  ['crowdstrike', 'CRWD', 'CrowdStrike Holdings', 'stock'],
  ['exxon', 'XOM', 'ExxonMobil Corp.', 'stock'],
  ['ibm', 'IBM', 'IBM Corp.', 'stock'],
  ['coinbase', 'COIN', 'Coinbase Global', 'stock'],
  ['disney', 'DIS', 'Walt Disney Co.', 'stock'],
  ['jpmorgan', 'JPM', 'JP Morgan Chase', 'stock'],
  ['visa', 'V', 'Visa Inc.', 'stock'],
  ['walmart', 'WMT', 'Walmart Inc.', 'stock'],
  ['nike', 'NKE', 'Nike Inc.', 'stock'],
  ['uber', 'UBER', 'Uber Technologies', 'stock'],
  ['airbnb', 'ABNB', 'Airbnb Inc.', 'stock'],
  ['snowflake', 'SNOW', 'Snowflake Inc.', 'stock'],
  ['shopify', 'SHOP', 'Shopify Inc.', 'stock'],
  ['spotify', 'SPOT', 'Spotify Technology', 'stock'],
  ['paypal', 'PYPL', 'PayPal Holdings', 'stock'],
  ['salesforce', 'CRM', 'Salesforce Inc.', 'stock'],
  ['oracle', 'ORCL', 'Oracle Corp.', 'stock'],
  ['cisco', 'CSCO', 'Cisco Systems', 'stock'],
  ['boeing', 'BA', 'Boeing Co.', 'stock'],
  ['caterpillar', 'CAT', 'Caterpillar Inc.', 'stock'],
  ['goldman', 'GS', 'Goldman Sachs', 'stock'],
  ['morgan stanley', 'MS', 'Morgan Stanley', 'stock'],
  ['gold etf', 'GLD', 'SPDR Gold Shares', 'etf'],
  ['gold', 'GLD', 'SPDR Gold Shares', 'etf'],
  ['s&p etf', 'SPY', 'SPDR S&P 500 ETF', 'etf'],
  ['spy', 'SPY', 'SPDR S&P 500 ETF', 'etf'],
  ['nasdaq etf', 'QQQ', 'Invesco QQQ Trust', 'etf'],
  ['qqq', 'QQQ', 'Invesco QQQ Trust', 'etf'],
  ['vanguard', 'VTI', 'Vanguard Total Market ETF', 'etf'],
];

const EXCLUDED = new Set([
  'AI', 'US', 'ETF', 'MY', 'DO', 'IT', 'IN', 'ON', 'UP', 'HOW',
  'THE', 'FOR', 'AND', 'ADD', 'ARE', 'IS', 'A', 'AN', 'ME', 'I', 'TO', 'AT',
  'OF', 'OR', 'IF', 'SO', 'NO', 'BE', 'BY', 'WE', 'HE', 'AS', 'GO',
  'ALL', 'CAN', 'HAS', 'HAD', 'WAS', 'NOT', 'BUT', 'OUT', 'NEW', 'OLD',
  'GET', 'GOT', 'LET', 'PUT', 'SAY', 'SET', 'SEE', 'TRY', 'USE', 'RUN',
  'SHOW', 'GIVE', 'FIND', 'TELL', 'TAKE', 'MAKE', 'COME', 'LOOK', 'WANT',
  'WHAT', 'WHEN', 'WHERE', 'WHICH', 'WHO', 'WHY', 'THIS', 'THAT', 'THEY',
  'WITH', 'FROM', 'HAVE', 'BEEN', 'WILL', 'YOUR', 'THEM', 'THAN', 'EACH',
  'SOME', 'DOES', 'DONE', 'JUST', 'ALSO', 'WELL', 'GOOD', 'BEST', 'MUCH',
  'OVER', 'ONLY', 'VERY', 'LIKE', 'ABOUT', 'STOCK', 'MARKET', 'PRICE',
  'CHECK', 'TODAY', 'HELP', 'PLEASE', 'HELLO', 'THANKS', 'THINK', 'THERE',
  'HERE', 'BACK', 'SHOULD', 'COULD', 'WOULD', 'THEIR', 'THESE', 'THOSE',
  'ABOUT', 'AFTER', 'AGAIN', 'OTHER', 'EVERY', 'THING', 'STILL', 'GREAT',
  'BEING', 'GOING', 'DOING', 'KNOW', 'NEED', 'KEEP', 'OPEN', 'CLOSE',
  'HIGH', 'LOW', 'LONG', 'SHORT', 'BIG', 'TOP', 'FULL', 'LIST', 'VIEW',
]);

const SECTOR_KEYWORDS: string[][] = [
  ['technology', 'tech', 'software', 'hardware', 'semiconductors', 'chips', 'cloud', 'saas'],
  ['energy', 'oil', 'gas', 'fossil fuels', 'renewables', 'clean energy', 'solar', 'wind', 'utilities'],
  ['healthcare', 'health', 'pharma', 'pharmaceuticals', 'biotech', 'medtech', 'medical'],
  ['financials', 'finance', 'banking', 'banks', 'insurance', 'fintech'],
  ['consumer', 'retail', 'e-commerce', 'ecommerce', 'discretionary', 'staples'],
  ['industrials', 'manufacturing', 'aerospace', 'defense', 'logistics'],
  ['real estate', 'reits', 'reit', 'property'],
  ['materials', 'metals', 'mining', 'chemicals'],
  ['communications', 'media', 'telecom', 'streaming'],
];

const MARKET_WORDS = [
  'market', 'stock market', 's&p', 's&p 500', 'nasdaq', 'dow', 'dow jones',
  'russell', 'indices', 'index', 'overall market', 'us market', 'equity',
  'equities', 'economy', 'wall street', 'vix', 'volatility',
];

const TICKER_INTEREST = /\b(buy|sell|short|long|trade|invest|investing|purchase|acquire|hold|holding|dump|exit|enter|watch|track|research|look( up| into)?|check( out)?|analyse|analyze|analysis|tell me about|what about|thoughts? on|opinion on|interested in|considering|thinking (about|of)|should i|worth it|good (buy|pick|stock)|price of|value of|target (for|price)|signal for|setup (for|on)|chart (of|for)|position (in|on)|exposure to)\b/;

const MARKET_INTEREST = /\b(buy|sell|invest|investing|trade|how('?s| is)|doing|performing|performance|outlook|sentiment|direction|trend|conditions?|what about|thoughts? on|opinion on|check|analyse|analyze|analysis|tell me about|thoughts? on|worried about|concerned about|watch|look( up| into)?|thoughts|feel(ing)? about|state of|status of)\b/;

const INTENT_RULES: [string, RegExp[]][] = [
  ['agent.show', [/my agent/, /show.*agent/, /about leo/, /what.*leo/, /leo.*settings?/, /agent.*settings?/, /leo.*capabilities/, /what can.*leo/, /leo.*profile/]],
  ['money_persona.assess', [/assess.*persona/, /start.*persona/, /take.*persona/, /begin.*persona/]],
  ['money_persona.show', [/money persona/, /my persona/, /what.*persona/]],
  ['money_persona.redo', [/redo.*persona/, /reassess.*persona/, /retake.*persona/]],
  ['risk_profile.assess', [/assess.*risk/, /start.*risk/, /take.*risk.*profile/, /begin.*risk/]],
  ['risk_profile.show', [/risk profile/, /my risk/, /what is my risk/]],
  ['risk_profile.redo', [/redo.*risk/, /reassess.*risk/]],
  ['blind_spots.assess', [/assess.*blind/, /start.*blind/, /take.*blind/, /begin.*blind/]],
  ['blind_spots.show', [/blind spots?/, /my blind/]],
  ['blind_spots.redo', [/redo.*blind/, /reassess.*blind/]],
  ['goals.add', [/add.*goal/, /new goal/, /create.*goal/, /set.*goal/]],
  ['goals.remove', [/remove.*goal/, /delete.*goal/]],
  ['goals.edit', [/edit.*goal/, /update.*goal/, /change.*goal/]],
  ['goals.investments', [/goal.*invest/, /invest.*for.*goal/, /stocks.*for.*goal/]],
  ['goals.show', [/my goals?/, /show.*goals?/, /list.*goals?/]],
  ['universe.setup', [/set.?up.*universe/, /create.*universe/, /build.*universe/]],
  ['universe.delete', [/delete.*universe/, /remove.*universe/, /clear.*universe/]],
  ['universe.show', [/my universe/, /show.*universe/]],
  ['themes.not_following', [/themes.*not.*follow/, /not.*following.*themes/, /themes.*i.*don.?t.*follow/, /unfollowed.*themes/]],
  ['themes.all', [/all themes/, /show.*themes/, /available themes/, /list.*themes/, /my themes/]],
  ['themes.following', [/themes.*follow/, /following.*themes/]],
  ['portfolio.show', [/portfolio/, /my holdings/, /what do i own/]],
  ['watchlist.add', [/add.*watchlist/, /watchlist.*add/]],
  ['watchlist.remove', [/remove.*watchlist/, /delete.*watchlist/]],
  ['watchlist.show', [/watchlist/, /my watchlist/]],
  ['opportunities.show', [/opportunit/, /recommend.*stock/, /find.*stock/, /matching stock/]],
  ['favorites.add', [/add.*favorites?/, /save.*favorites?/]],
  ['favorites.remove', [/remove.*favorites?/, /delete.*favorites?/]],
  ['favorites.show', [/my favorites?/, /show.*favorites?/]],
  ['notifications.show', [/notification/, /alerts?/, /my alerts?/]],
  ['trades.review', [/review.*trade/, /trade.*review/, /past.*review/, /decision.*review/, /review.*decision/]],
  ['trades.history', [/trade.*history/, /past.*trade/, /all.*trade/, /trade.*all/, /show.*all.*trade/]],
  ['trades.log', [/\b(bought|sold|purchased|acquired|exited|shorted)\b.*\b(share|stock|at \$|at \d)/, /review (this|it|my)/, /i (bought|sold|purchased|acquired)\b/]],
  ['account.show', [/my account/, /account details?/, /show.*account/]],
  ['subscription.upgrade', [/upgrade.*subscri/, /go pro/, /upgrade.*plan/]],
  ['subscription.renew', [/renew.*subscri/, /subscription.*renew/]],
  ['subscription.cancel', [/cancel.*subscri/]],
  ['subscription.history', [/subscri.*history/, /billing.*history/, /payment.*history/]],
  ['auth.signout', [/sign out/, /log out/, /logout/]],
  ['auth.signin', [/sign in/, /log in/, /login/]],
];

const USER_INTENTS = [
  'agent', 'money_persona', 'risk_profile', 'blind_spots', 'goals', 'universe',
  'themes', 'portfolio', 'notifications', 'trades', 'account', 'subscription', 'auth',
];

@Injectable({ providedIn: 'root' })
export class IntentResolverService {
  resolve(raw: string): ActionObject {
    const q = this.norm(raw);
    const intent = this.classifyIntent(q);
    const entity = this.extractEntity(q, raw);
    const sector = this.extractSector(q);
    const isMarket = this.mentionsMarket(q);

    if (intent !== 'unknown') {
      let scope: Scope = 'UNKNOWN';
      if (USER_INTENTS.some((u) => intent.startsWith(u))) scope = 'USER';
      else if (entity) scope = 'STOCK';
      else if (sector) scope = 'SECTOR';
      else if (isMarket) scope = 'MARKET';
      return { intent, entity, sector, scope, raw };
    }

    const hasTickerInterest = TICKER_INTEREST.test(q);
    const hasMarketInterest = MARKET_INTEREST.test(q);

    if (entity && (hasTickerInterest || hasMarketInterest)) {
      return { intent: 'stock_pulse', entity, sector: null, scope: 'STOCK', raw };
    }
    if (sector && hasMarketInterest) {
      return { intent: 'sector_pulse', entity: null, sector, scope: 'SECTOR', raw };
    }
    if (isMarket && hasMarketInterest) {
      return { intent: 'market_pulse', entity: null, sector: null, scope: 'MARKET', raw };
    }
    if (entity) {
      return { intent: 'stock_pulse', entity, sector: null, scope: 'STOCK', raw };
    }
    if (sector) {
      return { intent: 'sector_pulse', entity: null, sector, scope: 'SECTOR', raw };
    }
    if (isMarket) {
      return { intent: 'market_pulse', entity: null, sector: null, scope: 'MARKET', raw };
    }

    return { intent: 'unknown', entity: null, sector: null, scope: 'UNKNOWN', raw };
  }

  private norm(s: string): string {
    return s.toLowerCase().trim().replace(/[^\w\s&'.\-]/g, ' ').replace(/\s+/g, ' ');
  }

  private classifyIntent(q: string): string {
    for (const [intent, patterns] of INTENT_RULES) {
      if (patterns.some((p) => p.test(q))) return intent;
    }
    return 'unknown';
  }

  private extractEntity(q: string, raw: string): StockEntity | null {
    // Check known names/tickers (lowercase match)
    for (const [n, t, fn, type] of NAME_MAP) {
      if (q.includes(n)) return { ticker: t, name: fn, type };
    }
    // Check if any word matches a known ticker from NAME_MAP (uppercase match)
    const hits = (q.toUpperCase().match(/\b([A-Z]{1,5}(?:\.[A-Z])?)\b/g) || []).filter(
      (t) => !EXCLUDED.has(t)
    );
    for (const t of hits) {
      const row = NAME_MAP.find(([, tk]) => tk === t);
      if (row) return { ticker: row[1], name: row[2], type: row[3] };
    }
    // If the entire input is a single short word (2-5 chars), treat as a ticker lookup
    const trimmed = raw.trim();
    if (/^[a-zA-Z]{2,5}$/.test(trimmed) && !EXCLUDED.has(trimmed.toUpperCase())) {
      const ticker = trimmed.toUpperCase();
      return { ticker, name: ticker, type: 'stock' };
    }
    // Only treat as unknown ticker if the user explicitly typed uppercase in their original input
    const originalUpper = (raw.match(/\b([A-Z]{2,5})\b/g) || []).filter(
      (t) => !EXCLUDED.has(t)
    );
    if (originalUpper.length > 0) {
      return { ticker: originalUpper[0], name: originalUpper[0], type: 'stock' };
    }
    return null;
  }

  private extractSector(q: string): string | null {
    for (const group of SECTOR_KEYWORDS) {
      for (const kw of group) {
        if (q.includes(kw)) return group[0];
      }
    }
    return null;
  }

  private mentionsMarket(q: string): boolean {
    return MARKET_WORDS.some((w) => q.includes(w));
  }
}
