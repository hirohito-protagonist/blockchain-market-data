import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule, CoreAppContainerComponent } from './core/core.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { BlockchainDataModule } from './blockchain-data/blockchain-data.module';

import { reducers, metaReducers } from './store';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    ExchangeRatesModule.forRoot(),
    BlockchainDataModule.forRoot()
  ],
  bootstrap: [ CoreAppContainerComponent ]
})
export class AppModule { }
