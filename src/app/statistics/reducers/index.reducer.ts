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


const getStatistics = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Stats), (s) => {

  return (s.response as StatisticsInfo) || ({} as StatisticsInfo);
});

const getStatisticsLastUpdate = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Stats), (s) => {

  return s.lastUpdate;
});

export const statisticViewModel = createSelector(getStatistics, getStatisticsLastUpdate, (data, update) => {

  return {
    data,
    update
  };
});

const getChartsData = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Charts), (s) => {

  const datePipe = new DatePipe('en');
  if (s.response) {
    const v = s.response['values'] || [];
    return {
      name: s.response['name'],
      unit: s.response['unit'],
      description: s.response['description'],
      data: v.map((d) => d['y']),
      labels: v.map((d) => datePipe.transform(d['x'] * 1000, 'MMM yy')),
      type: 'line',
      options: {
        responsive: false,
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

const getChartsLastUpdate = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Charts), (s) => {

  return s.lastUpdate;
});

export const viewChartModel = createSelector(getChartsData, getChartsLastUpdate, (data, update) => {

  return {
    data,
    update
  };
});
