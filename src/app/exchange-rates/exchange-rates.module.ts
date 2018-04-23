import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers/index.reducer';

import { ExchangeRatesContainerComponent } from './containers/exchange-rates.container';
import { MarketPricesViewComponent } from './views/market-prices.view';
import { ConverterViewComponent } from './views/converter.view';
import { ExchangeRatesViewComponent } from './views/exchange-rates.view';

import { MarketPricesEffects } from './effects/market-prices.effect';
import { ConvertBtcEffects } from './effects/convert-btc.effect';


@NgModule({
  imports: [
    StoreModule.forFeature('exchangeRates', reducers),
    EffectsModule.forFeature([MarketPricesEffects, ConvertBtcEffects])
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
