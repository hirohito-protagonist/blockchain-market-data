import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import { fromMarketPrices, getMarketPricesData, ExchangeRatesState } from './../reducers/index.reducer';

import { fromMarketPricesAction } from './../actions/index.action';

@Component({
  selector: 'bmd-exchange-rates-container',
  template: `
    <h2>Feature Exchange rate</h2>
    {{ data | json }}
  `
})
export class ExchangeRatesContainerComponent implements OnInit {

  data;

  constructor(private store: Store<ExchangeRatesState>) {

    this.store.select(getMarketPricesData).subscribe((d) => {

      this.data = d;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new fromMarketPricesAction.FetchData());
  }
}
