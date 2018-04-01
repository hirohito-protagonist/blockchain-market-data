import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  getCurrencies,
  getMarketPricesData,
  getConvertBtcState,
  ExchangeRatesState
} from './../reducers/index.reducer';
import {  ConvertBtcState, ConvertToBTC, MarketPrices } from './../exchange-rates.type';

import { fromMarketPricesAction, fromConvertBtcAction } from './../actions/index.action';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bmd-exchange-rates-container',
  template: `
    <bmd-converter-view
      class="navbar"
      [currencies]="currencies$ | async"
      [convert]="convert$ | async"
      (convertToBtc)="convertToBtc($event)"></bmd-converter-view>
    <bmd-market-prices-view [prices]="data$ | async" (refresh)="requestMarkerPrices()"></bmd-market-prices-view>
  `
})
export class ExchangeRatesContainerComponent implements OnInit {

  data$: Observable<MarketPrices>;
  convert$: Observable<ConvertBtcState>;
  currencies$: Observable<{ currency: string; symbol: string; }[]>;

  constructor(private store: Store<ExchangeRatesState>) {

    this.data$ = this.store.select(getMarketPricesData);
    this.currencies$ = this.store.select(getCurrencies);
    this.convert$ = this.store.select(getConvertBtcState);
  }

  ngOnInit(): void {
    this.requestMarkerPrices();
  }

  convertToBtc(convert: ConvertToBTC) {
    this.store.dispatch(new fromConvertBtcAction.Convert(convert));
  }

  requestMarkerPrices() {
    this.store.dispatch(new fromMarketPricesAction.FetchData());
  }
}
