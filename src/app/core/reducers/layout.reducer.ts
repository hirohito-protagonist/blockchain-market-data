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

export function reducer(state: LayoutState = initialState, action: fromLayoutActions.ActionType): LayoutState {

  switch (action.type) {

    case fromLayoutActions.changeView.type: {

      return Object.assign({}, state, {
        activeView: action.view
      });
    }

    default: {

      return state;
    }
  }
}

