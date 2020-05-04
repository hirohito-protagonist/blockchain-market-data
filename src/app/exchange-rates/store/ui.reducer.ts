import { createReducer, on } from '@ngrx/store';
import { updateUIState } from './actions';

export interface UIState {
  activeCurrency: string;
}

const initialState: UIState = {
  activeCurrency: ''
};

export const  reducer = createReducer(
  initialState,
  on(
    updateUIState,
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
