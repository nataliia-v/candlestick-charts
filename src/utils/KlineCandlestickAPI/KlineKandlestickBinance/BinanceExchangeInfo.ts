type RateLimit = {
  interval: string;
  intervalNum: number;
  limit: number;
  rateLimitType: string;
};

type SymbolFilter = {
  filterType: string;
  maxPrice?: string;
  minPrice?: string;
  tickSize?: number;
  maxQty?: number;
  minQty?: number;
  stepSize?: number;
  limit?: number;
  multiplierUp: string;
  multiplierDown: string;
  multiplierDecimal: number;
};

type BinanceSymbol = {
  filters: SymbolFilter[];
  OrderType: string[];
  timeInForce: string[];
  liquidationFee: string; // liquidation fee rate
  marketTakeBound: string; // the max price difference rate( from mark price) a market order can make
  symbol: string; // contract symbol name
  pair: string; // underlying symbol
  contractType: string;
  deliveryDate: number;
  onboardDate: number;
  contractStatus: string;
  contractSize: number;
  quoteAsset: string;
  baseAsset: string;
  marginAsset: string;
  pricePrecision: string; // please do not use it as tickSize
  quantityPrecision: number; // please do not use it as stepSize
  baseAssetPrecision: number;
  quotePrecision: number;
  equalQtyPrecision: number; // ignore
  triggerProtect: string; // threshold for algo order with "priceProtect"
  maintMarginPercent: string; // ignore
  requiredMarginPercent: string; // ignore
  underlyingType: string;
  underlyingSubType: [];
};

export type BinanceExchangeInfo = {
  exchangeFilters: string[];
  rateLimits: RateLimit[];
  serverTime: number; // Ignore please. If you want to check current server time, please check via "GET /dapi/v1/time"
  symbols: BinanceSymbol[];
  timezone: string;
};
