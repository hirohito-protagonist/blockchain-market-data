export interface MarketPriceEntity {
  '15m': number;
  'last': number;
  'buy': number;
  'sell': number;
  'symbol': string;
}

export interface MarketPricesEntities {
  [currency: string]: MarketPriceEntity;
}
