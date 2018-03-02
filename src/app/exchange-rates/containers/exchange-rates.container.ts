import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  fromMarketPrices,
  getCurrencies,
  getMarketPricesData,
  getConvertBtcState,
  ExchangeRatesState
} from './../reducers/index.reducer';
import {  ConvertBtcState, ConvertToBTC } from './../exchange-rates.type';

import { fromMarketPricesAction, fromConvertBtcAction } from './../actions/index.action';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bmd-exchange-rates-container',
  template: `
    <bmd-converter-view
      [currencies]="currencies$ | async"
      [convert]="convert$ | async"
      (convertToBtc)="convertToBtc($event)"></bmd-converter-view>
    <bmd-market-prices-view [prices]="data$ | async"></bmd-market-prices-view>
  `
})
export class ExchangeRatesContainerComponent implements OnInit {

  data$: Observable<fromMarketPrices.MarketPrices>;
  convert$: Observable<ConvertBtcState>;
  currencies$: Observable<{ currency: string; symbol: string; }[]>;

  constructor(private store: Store<ExchangeRatesState>) {

    this.data$ = this.store.select(getMarketPricesData);
    this.currencies$ = this.store.select(getCurrencies);
    this.convert$ = this.store.select(getConvertBtcState);
  }

  ngOnInit(): void {
    this.store.dispatch(new fromMarketPricesAction.FetchData());
  }

  convertToBtc(convert: ConvertToBTC) {
    this.store.dispatch(new fromConvertBtcAction.Convert(convert));
  }
}
