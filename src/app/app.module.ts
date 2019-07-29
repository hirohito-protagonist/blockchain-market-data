import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule, CoreAppContainerComponent } from '@bmd/core';
import { ExchangeRatesModule } from '@bmd/exchange-rates';
import { BlockchainDataModule } from '@bmd/blockchain-data';
import { StatisticsModule } from './statistics/statistics.module';

import { reducers, metaReducers, REDUCER_TOKEN } from './store';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers }),
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    ExchangeRatesModule.forRoot(),
    BlockchainDataModule.forRoot(),
    StatisticsModule.forRoot()
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useValue: reducers
    }
  ],
  bootstrap: [ CoreAppContainerComponent ]
})
export class AppModule { }
