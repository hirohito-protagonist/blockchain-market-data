import { environment } from './../environments/environment';


import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';


export interface State {
  version: string;
}


export const reducers: ActionReducerMap<State> = {
  version: () => '1.0.0'
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {

    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

