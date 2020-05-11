import * as fromDataService from './../store/data-service.reducer';


export interface DataServiceState {
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


