import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface TickerResponse {
  [key: string]: {
    '15m': number;
    'last': number;
    'buy': number;
    'sell': number;
    'symbol': string;
  };
}

@Injectable()
export class ExchangeRatesService {

  private API_Path = 'https://blockchain.info/';

  constructor(private http: HttpClient) {}

  ticker(): Observable<TickerResponse> {

    return this.http.get<TickerResponse>(`${this.API_Path}ticker?cors=true`);
  }

  tobtc(currency: string, value: number): Observable<number> {

    return this.http.get<number>(`${this.API_Path}tobtc?cors=true&currency=${currency}&value=${value}`);
  }
}
