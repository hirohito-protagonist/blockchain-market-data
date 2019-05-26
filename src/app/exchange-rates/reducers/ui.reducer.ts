import { fromUIAction } from './../actions/index.action';

export interface UIState {
  activeCurrency: string;
}

const initialState: UIState = {
  activeCurrency: ''
};

export function reducer(state: UIState = initialState, action: fromUIAction.ActionType): UIState {

  switch (action.type) {

    case fromUIAction.updateUIState.type: {

      const { key, value } = action;

      if (typeof state[key] !== 'undefined') {

        return {
          ...state,
          [key]: value
        };
      }

      return state;
    }

    default:
      return state;
  }
}


export const activeCurrency = (s: UIState) => s.activeCurrency;
