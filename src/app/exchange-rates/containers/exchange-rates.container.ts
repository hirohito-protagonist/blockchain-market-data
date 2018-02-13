import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { fromMarketPrices, getMarketPricesData, ExchangeRatesState } from './../reducers/index.reducer';

import { fromMarketPricesAction } from './../actions/index.action';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bmd-exchange-rates-container',
  template: `
    <bmd-market-prices-view [prices]="data$ | async"></bmd-market-prices-view>
  `
})
export class ExchangeRatesContainerComponent implements OnInit {

  data$: Observable<fromMarketPrices.MarketPrices>;

  constructor(private store: Store<ExchangeRatesState>) {

    this.data$ = this.store.select(getMarketPricesData);
  }

  ngOnInit(): void {
    this.store.dispatch(new fromMarketPricesAction.FetchData());
  }
}
