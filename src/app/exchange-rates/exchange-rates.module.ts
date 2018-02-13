import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers/index.reducer';

import { ExchangeRatesContainerComponent } from './containers/exchange-rates.container';
import { MarketPricesViewComponent } from './views/market-prices/market-prices.view';

import { MarketPricesEffects } from './effects/market-prices.effect';

import { BlockchainApiModule } from './../shared/blockchain-api/blockchain-api.module';


@NgModule({
  imports: [
    BlockchainApiModule,
    StoreModule.forFeature('exchangeRates', reducers),
    EffectsModule.forFeature([MarketPricesEffects])
  ]
})
class RootExchangeRateModule {}


@NgModule({
  imports: [CommonModule],
  declarations: [ ExchangeRatesContainerComponent, MarketPricesViewComponent ],
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
