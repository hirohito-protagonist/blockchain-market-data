import { ConvertBtcState } from './exchange-rates.type';

export interface ExchangeRatesViewModel {
  update: number;
  data: {
    marketPrices: any;
    currencies: {
      currency: string;
      symbol: string;
    }[];
    convert: ConvertBtcState;
  };
}
