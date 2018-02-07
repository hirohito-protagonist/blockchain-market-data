import { fromLayoutActions } from './../actions/index.action';

export enum LayoutView {
  ExchangeRate = 'Exchange rate',
  Statistic = 'Statistic'
}

export interface LayoutState {
  activeView: LayoutView;
}


const initialState: LayoutState = {
  activeView: LayoutView.ExchangeRate
};

export function reducer(state: LayoutState = initialState, action: fromLayoutActions.LayoutActionType): LayoutState {

  switch (action.type) {

    case fromLayoutActions.LayoutActions.ChangeView: {

      return Object.assign({}, state, {
        activeView: action.payload
      });
    }

    default: {

      return state;
    }
  }
}

