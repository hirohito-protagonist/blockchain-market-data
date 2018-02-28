import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, lastUpdate, response, getServiceDataNode } from './reducers/index.reducer';

import { BlockchainApiModule } from './../shared/blockchain-api/blockchain-api.module';

import { fromBlockchainDataAction, DataServiceType  } from './actions/index.action';
import { DataServiceEffects } from './effects/data-service.effect';

const fromBlockchainDataSelectors = { lastUpdate, response, getServiceDataNode };

export {
  fromBlockchainDataAction,
  fromBlockchainDataSelectors,
  DataServiceType
};


@NgModule({
  imports: [
    BlockchainApiModule,
    StoreModule.forFeature('blockchain-data', reducers),
    EffectsModule.forFeature([ DataServiceEffects ])
  ]
})
export class BlockchainDataModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: BlockchainDataModule,
      providers: []
    };
  }
}
