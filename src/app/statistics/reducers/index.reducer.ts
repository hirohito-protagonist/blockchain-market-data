import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fromBlockchainDataSelectors, DataServiceType } from '@bmd/blockchain-data';

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

  return s.response || {};
});
