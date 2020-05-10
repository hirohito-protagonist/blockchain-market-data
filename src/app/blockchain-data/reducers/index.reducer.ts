import * as fromDataService from './../store/data-service.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataServiceType } from './../blockchain-data.type';

interface DataServiceState {
  data: fromDataService.DataServiceState;
  version: string;
}

export function featureVersion() {
  return '1.0.0';
}

export const reducers = {
  data: fromDataService.reducer,
  version: featureVersion
};

const getFeatureRootState = createFeatureSelector('blockchain-data');
const getDataServiceState = createSelector(getFeatureRootState, (s: DataServiceState) => s.data);
export const getServiceDataNode = (dataServiceType: DataServiceType) =>
  createSelector(getDataServiceState, (s: fromDataService.DataServiceState) => s[dataServiceType]);

export const lastUpdate = (dataServiceType: DataServiceType) =>
  createSelector(getServiceDataNode(dataServiceType), (node) => node.lastUpdate);

export const response = (dataServiceType: DataServiceType) =>
  createSelector(getServiceDataNode(dataServiceType), (node) => node.response);
