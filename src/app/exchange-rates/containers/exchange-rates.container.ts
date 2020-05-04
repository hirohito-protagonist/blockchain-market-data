import {
  Component,
  OnInit
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import {
  viewExchangeRatesModel,
} from './../store/selectors';
import { ExchangeRatesState } from './../store/store';
import { ConvertToBTC } from './../exchange-rates.type';
import { ExchangeRatesViewModel } from './../model.view';

import { convert, updateUIState, fetchData } from './../store/actions';
import { Observable } from 'rxjs';

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

    this.exchangeRatesViewModel$ = this.store.pipe(select(viewExchangeRatesModel));
  }

  ngOnInit(): void {
    this.requestMarkerPrices();
  }

  convertToBtc(cvrt: ConvertToBTC) {
    this.store.dispatch(convert({ convert: cvrt }));
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

      case 'selectCurrency': {

        this.store.dispatch(updateUIState({
          key: 'activeCurrency',
          value: viewAction.e
        }));
        break;
      }
    }
  }

  requestMarkerPrices() {
    this.store.dispatch(fetchData());
  }
}
