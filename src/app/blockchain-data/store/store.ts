import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDataService from './data-service.reducer';
import { DataServiceEffects } from './effects';

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


export const Store = [
  StoreModule.forFeature('blockchain-data', reducers),
  EffectsModule.forFeature([ DataServiceEffects ])
];

