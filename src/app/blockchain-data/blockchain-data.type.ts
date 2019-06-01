import {
  fromBlockchainDataMarketPriceEntity,
  fromBlockchainDataStatisticsEntity
} from './entities/index.entity';

export enum DataServiceType {
  Ticker = 'ticker',
  ToBTC = 'tobtc',
  Stats = 'stats',
  Charts = 'charts'
}

export interface BTCQuery {
  value: number | string;
  currency: string;
}

export interface ChartsQuery {
  name: string;
  timespan: string;
  rollingAverage: string;
  start: string;
  format: string;
  sampled: boolean;
}

export interface ServiceResponse<T> {
  status: number;
  response: T;
}

export type QueryType = BTCQuery | ChartsQuery | null;

export type DataResponseType = fromBlockchainDataMarketPriceEntity.MarketPricesEntities |
fromBlockchainDataStatisticsEntity.StatisticEntity | number;
