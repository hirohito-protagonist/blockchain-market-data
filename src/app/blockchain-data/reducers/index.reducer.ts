import * as fromDataService from './data-service.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromDataServiceAction } from './../actions/index.action';

interface DataServiceState {
  data: fromDataService.DataServiceState;
}

export const reducers = {
  data: fromDataService.reducer
};

const getFeatureRootState = createFeatureSelector('blockchain-data');
const getDataServiceState = createSelector(getFeatureRootState, (s: DataServiceState) => s.data);
export const getServiceDataNode = (dataServiceType: fromDataServiceAction.DataServiceType) =>
  createSelector(getDataServiceState, (s: fromDataService.DataServiceState) => s[dataServiceType]);

export const lastUpdate = (dataServiceType: fromDataServiceAction.DataServiceType) =>
  createSelector(getServiceDataNode(dataServiceType), (node) => node.lastUpdate);

export const response = (dataServiceType: fromDataServiceAction.DataServiceType) =>
  createSelector(getServiceDataNode(dataServiceType), (node) => node.response);
