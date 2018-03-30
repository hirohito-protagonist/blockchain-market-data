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


export const getStatistics = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Stats), (s) => {

  return (s.response as StatisticsInfo) || ({} as StatisticsInfo);
});

export const getChartsData = createSelector(fromBlockchainDataSelectors.getServiceDataNode(DataServiceType.Charts), (s) => {

  if (s.response) {
    const v = s.response['values'] || [];
    return {
      name: s.response['name'],
      unit: s.response['unit'],
      description: s.response['description'],
      data: v.map((d) => d['y']),
      labels: v.map((d) => String(new Date(d['x'] * 1000).toUTCString())),
      type: 'line',
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
            fill: false,
            tension: 0
          }
        }
      }
    };
  }

  return null;
});
