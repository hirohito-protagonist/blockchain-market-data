import { environment } from './../environments/environment';

import { InjectionToken } from '@angular/core';
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';


export interface State {
  version: string;
}

export function appVersion(): string {
  return '1.0.0';
}

export const reducers: ActionReducerMap<State> = {
  version: appVersion
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<State>>('root reducer');

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {

    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

