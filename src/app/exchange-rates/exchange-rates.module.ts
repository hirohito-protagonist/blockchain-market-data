import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers/index.reducer';

import { ExchangeRatesContainerComponent } from './containers/exchange-rates.container';


@NgModule({
  imports: [
    StoreModule.forFeature('exchangeRates', reducers)
  ]
})
class RootExchangeRateModule {}


@NgModule({
  declarations: [ ExchangeRatesContainerComponent ],
  exports: [ ExchangeRatesContainerComponent ]
})
export class ExchangeRatesModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: RootExchangeRateModule,
      providers: []
    };
  }
}
