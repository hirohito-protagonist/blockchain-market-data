import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers/index.reducer';

@NgModule({
  imports: [
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
