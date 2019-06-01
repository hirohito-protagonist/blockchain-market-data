import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { fromBlockchainDataMarketPriceEntity } from './../entities/index.entity';
import { ServiceResponse } from './../blockchain-data.type';


@Injectable()
export class ExchangeRatesService {

  private API_Path = 'https://blockchain.info/';

  constructor(private http: HttpClient) {}

  ticker(): Observable<ServiceResponse<fromBlockchainDataMarketPriceEntity.MarketPricesEntities>> {

    return this.http.get(`${this.API_Path}ticker?cors=true`).pipe(
      map<any, ServiceResponse<fromBlockchainDataMarketPriceEntity.MarketPricesEntities>>((response) => ({
        status: 200,
        response
      })),
      catchError((e) => of({
        status: e.status,
        response: null
      }))
    );
  }

  tobtc(currency: string, value: number): Observable<ServiceResponse<number>> {

    return this.http.get(`${this.API_Path}tobtc?cors=true&currency=${currency}&value=${value}`).pipe(
      map<any, ServiceResponse<number>>((response) => ({
        status: 200,
        response
      })),
      catchError((e) => of({
        status: e.status,
        response: null
      }))
    );
  }
}
