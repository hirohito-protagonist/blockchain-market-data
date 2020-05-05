import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/store';

import { ExchangeRatesContainerComponent } from './containers/exchange-rates.container';
import { MarketPricesViewComponent } from './views/market-prices.view';
import { ConverterViewComponent } from './views/converter.view';
import { ExchangeRatesViewComponent } from './views/exchange-rates.view';

import { Effects } from './store/effects';


@NgModule({
  imports: [
    StoreModule.forFeature('exchangeRates', reducers),
    EffectsModule.forFeature([Effects])
  ]
})
export class RootExchangeRateModule {}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CdkTableModule
  ],
  declarations: [
    ExchangeRatesContainerComponent,
    MarketPricesViewComponent,
    ConverterViewComponent,
    ExchangeRatesViewComponent
  ],
  exports: [
    ExchangeRatesContainerComponent
  ]
})
export class ExchangeRatesModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: RootExchangeRateModule,
      providers: []
    };
  }
}
