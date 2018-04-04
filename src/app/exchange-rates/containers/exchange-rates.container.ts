import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  viewExchangeRatesModel,
  ExchangeRatesState
} from './../reducers/index.reducer';
import {  ConvertToBTC } from './../exchange-rates.type';
import { ExchangeRatesViewModel } from './../model.view';

import { fromMarketPricesAction, fromConvertBtcAction } from './../actions/index.action';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bmd-exchange-rates-container',
  template: `
    <bmd-exchange-rate-view
      [vModel]="exchangeRatesViewModel$ | async"
      (vActions)="handleViewActions($event)"></bmd-exchange-rate-view>
  `
})
export class ExchangeRatesContainerComponent implements OnInit {

  exchangeRatesViewModel$: Observable<ExchangeRatesViewModel>;

  constructor(private store: Store<ExchangeRatesState>) {

    this.exchangeRatesViewModel$ = this.store.select(viewExchangeRatesModel);
  }

  ngOnInit(): void {
    this.requestMarkerPrices();
  }

  convertToBtc(convert: ConvertToBTC) {
    this.store.dispatch(new fromConvertBtcAction.Convert(convert));
  }

  handleViewActions(viewAction: { type: string; e: any; }): void {

    switch (viewAction.type) {

      case 'convert': {

        this.convertToBtc(viewAction.e);
        break;
      }

      case 'refresh': {

        this.requestMarkerPrices();
        break;
      }
    }
  }

  requestMarkerPrices() {
    this.store.dispatch(new fromMarketPricesAction.FetchData());
  }
}
