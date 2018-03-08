import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { fromBlockchainDataMarketPriceEntity } from './../entities/index.entity';


@Injectable()
export class ExchangeRatesService {

  private API_Path = 'https://blockchain.info/';

  constructor(private http: HttpClient) {}

  ticker(): Observable<fromBlockchainDataMarketPriceEntity.MarketPricesEntities> {

    return this.http.get<fromBlockchainDataMarketPriceEntity.MarketPricesEntities>(`${this.API_Path}ticker?cors=true`);
  }

  tobtc(currency: string, value: number): Observable<number> {

    return this.http.get<number>(`${this.API_Path}tobtc?cors=true&currency=${currency}&value=${value}`);
  }
}
