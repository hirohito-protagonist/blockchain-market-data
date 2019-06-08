import { createReducer, on } from '@ngrx/store';
import { fromUIAction } from './../actions/index.action';

export interface UIState {
  activeCurrency: string;
}

const initialState: UIState = {
  activeCurrency: ''
};

export const  reducer = createReducer(
  initialState,
  on(
    fromUIAction.updateUIState,
    (state, { key, value }) => {

      if (typeof state[key] !== 'undefined') {

        return {
          ...state,
          [key]: value
        };
      }

      return state;
    }
  )
);

export const activeCurrency = (s: UIState) => s.activeCurrency;
