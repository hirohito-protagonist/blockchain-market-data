import {
  fromBlockchainDataMarketPriceEntity,
  fromBlockchainDataStatisticsEntity
} from './entities/index.entity';

export enum DataServiceType {
  Ticker = 'ticker',
  ToBTC = 'tobtc',
  Stats = 'stats'
}

export interface BTCQuery {
  value: number | string;
  currency: string;
}

export type QueryType = BTCQuery | null;

export type DataResponseType = fromBlockchainDataMarketPriceEntity.MarketPricesEntities |
fromBlockchainDataStatisticsEntity.StatisticEntity | number;
