import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers/index.reducer';

import { BlockchainApiModule } from './../shared/blockchain-api/blockchain-api.module';

import { fromBlockchainDataAction } from './actions/index.action';

export {
  fromBlockchainDataAction
};

@NgModule({
  imports: [
    BlockchainApiModule,
    StoreModule.forFeature('blockchain-data', reducers)
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
