import { StatisticsInfo, Chart } from './statistics.type';

export interface StatisticViewModel {
  data: StatisticsInfo;
  update: number;
  isLoading: boolean;
}

export interface ChartViewModel {
  data: Chart;
  update: number;
  isLoading: boolean;
  state: any;
}
