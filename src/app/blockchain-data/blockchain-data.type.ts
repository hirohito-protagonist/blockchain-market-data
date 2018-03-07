import { fromBlockchainDataMarketPriceEntity } from './entities/index.entity';

export enum DataServiceType {
  Ticker = 'ticker',
  ToBTC = 'tobtc'
}

export interface BTCQuery {
  value: number | string;
  currency: string;
}

export type QueryType = BTCQuery | null;

export type DataResponseType = fromBlockchainDataMarketPriceEntity.MarketPricesEntities | number;
