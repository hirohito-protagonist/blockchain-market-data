import { StatisticsInfo, Chart } from './statistics.type';

export interface StatisticViewModel {
  data: StatisticsInfo;
  update: number;
}

export interface ChartViewModel {
  data: Chart;
  update: number;
}
