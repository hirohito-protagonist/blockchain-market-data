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

export interface MarketPrices {
  [key: string]: {
    '15m': number;
    'last': number;
    'buy': number;
    'sell': number;
    'symbol': string;
  };
}
