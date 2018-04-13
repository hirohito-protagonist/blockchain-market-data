import { DatePipe } from '@angular/common';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType } from '@bmd/blockchain-data';
import { StatisticsInfo } from './../statistics.type';

export interface StatisticsState {
  version: string;
}

export function featureVersion() {
  return '1.0.0';
}

export const reducers = {
  version: featureVersion
};

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
      labels: v.map((d) => datePipe.transform(d['x'] * 1000, 'MMM yy')),
      type: 'line',
      datasets: [
        {
          label: s.response['unit'],
          data: v.map((d) => d['y'])
        }
      ],
      options: {
        responsive: true,
        animation: {
          duration: 0
        },
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        elements: {
          line: {
            borderWidth: 1,
            fill: true,
            tension: 0
          },
          point: {
            radius: 0
          }
        }
      }
    };
  }

  return null;
});

const getChartsLastUpdate = createSelector(chartsNode, (s) => s.lastUpdate);

const isChartLoading = createSelector(chartsNode, (s) => s.isFetching);

export const viewChartModel = createSelector(
  getChartsData,
  getChartsLastUpdate,
  isChartLoading,
  (data, update, isLoading) => {

    return { data, update, isLoading };
  }
);
