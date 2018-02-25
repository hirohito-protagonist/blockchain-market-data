import { Action } from '@ngrx/store';


export interface DataServiceState {
  [key: string]: {
    isFetching: boolean;
    response: any;
    lastUpdate: number;
  };
}

const initialState: DataServiceState = {
  ticker: {
    isFetching: false,
    response: null,
    lastUpdate: 0
  },
  tobtc: {
    isFetching: false,
    response: null,
    lastUpdate: 0
  }
};


export function reducer(state: DataServiceState = initialState, action: Action): DataServiceState {

  switch (action.type) {

    default: {
      return state;
    }
  }
}
