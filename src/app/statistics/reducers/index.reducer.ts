import { DatePipe } from '@angular/common';
import {
  createFeatureSelector,
  createSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType } from '@bmd/blockchain-data';
import { StatisticsInfo } from './../statistics.type';
import * as fromUIReducer from './ui.reducer';

export interface StatisticsState {
  version: string;
  ui: fromUIReducer.UIState;
}

export function featureVersion() {
  return '1.0.0';
}

export function reducers(state: StatisticsState | undefined, action: Action) {
  return combineReducers({
    version: featureVersion,
    ui: fromUIReducer.reducer
  })(state, action);
}

const statisticsNode = fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Stats);
const chartsNode = fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Charts);

const getStatistics = createSelector(statisticsNode, (s) => {

  return (s.response as StatisticsInfo) || ({} as StatisticsInfo);
});

const getStatisticsLastUpdate = createSelector(statisticsNode, (s) => s.lastUpdate);
const isStatisticsLoading = createSelector(statisticsNode, (s) => s.isFetching);

export const statisticViewModel = createSelector(
  getStatistics,
  getStatisticsLastUpdate,
  isStatisticsLoading,
  (data, update, isLoading) => {

    return { data, update, isLoading };
  }
);

const getChartsData = createSelector(chartsNode, (s) => {

  const datePipe = new DatePipe('en');
  if (s.response) {
    const v = s.response['values'] || [];
    return {
      name: s.response['name'],
      description: s.response['description'],
      options: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: v.map((d) => datePipe.transform(d['x'] * 1000, 'MMM yy')),
            boundaryGap: false
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
        ],
        grid: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          left: '8%',
          right: '8%'
        },
        series: [
          {
            name: s.response['unit'],
            type: 'line',
            data: v.map((d) => d['y']),
            showSymbol: false,
            lineStyle: {
              color: '#49D8EB'
            },
            areaStyle: {
              color: '#49D8EB'
            }
          }
        ]
      }
    };
  }

  return null;
});

const getChartsLastUpdate = createSelector(chartsNode, (s) => s.lastUpdate);

const isChartLoading = createSelector(chartsNode, (s) => s.isFetching);

const getStatisticsState = createFeatureSelector('statistics');
const getUIState = createSelector(getStatisticsState, (s: StatisticsState) => s.ui);
const getChartViewState = createSelector(getUIState, (s) => s.chartsView);

export const viewChartModel = createSelector(
  getChartsData,
  getChartsLastUpdate,
  isChartLoading,
  getChartViewState,
  (data, update, isLoading, state) => {

    return { data, update, isLoading, state };
  }
);

export const getChartQuery = createSelector(getChartViewState, (s) => {

  return {
    name: s.selectedChart,
    start: '',
    timespan: s.selectedChartTimeSpan,
    rollingAverage: '',
    format: 'json',
    sampled: true
  };
});
