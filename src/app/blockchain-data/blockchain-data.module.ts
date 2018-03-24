import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, lastUpdate, response, getServiceDataNode } from './reducers/index.reducer';

import { ExchangeRatesService } from './services/exchange-rates.service';
import { StatisticsService } from './services/statistics.service';

import { fromBlockchainDataAction } from './actions/index.action';
import { DataServiceType, BTCQuery, ChartsQuery } from './blockchain-data.type';
import { DataServiceEffects } from './effects/data-service.effect';

const fromBlockchainDataSelectors = { lastUpdate, response, getServiceDataNode };

export {
  fromBlockchainDataAction,
  fromBlockchainDataSelectors,
  DataServiceType,
  BTCQuery,
  ChartsQuery
};


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('blockchain-data', reducers),
    EffectsModule.forFeature([ DataServiceEffects ])
  ]
})
export class BlockchainDataModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: BlockchainDataModule,
      providers: [
        ExchangeRatesService,
        StatisticsService
      ]
    };
  }
}
