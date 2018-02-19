import { fromConvertBtcAction } from './../actions/index.action';

export interface ConvertToBTC {
  value: string|number;
  currency: string;
}

interface ConvertToBtcData extends ConvertToBTC {
  btc: number;
}

export interface ConvertBtcState {
  isFetching: boolean;
  convert: ConvertToBtcData;
  lastUpdate: number;
}

const initialState: ConvertBtcState = {
  isFetching: false,
  convert: {
    value: 0,
    currency: '',
    btc: 0
  },
  lastUpdate: null
};


export function reducer(state: ConvertBtcState = initialState, action: fromConvertBtcAction.ActionType): ConvertBtcState {

  switch (action.type) {

    case fromConvertBtcAction.ActionTypes.Convert: {

      return {
        ...state,
        convert: {
          ...state.convert,
          value: action.payload.value,
          currency: action.payload.currency
        }
      };
    }

    case fromConvertBtcAction.ActionTypes.Request: {

      return {
        ...state,
        isFetching: true
      };
    }

    case fromConvertBtcAction.ActionTypes.Response: {

      return {
        convert: {
          ...state.convert,
          btc: action.payload
        },
        isFetching: false,
        lastUpdate: Date.now()
      };
    }

    default: {

      return state;
    }
  }
}
