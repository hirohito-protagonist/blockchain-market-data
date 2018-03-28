import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule, CoreAppContainerComponent } from '@bmd/core';
import { ExchangeRatesModule } from '@bmd/exchange-rates';
import { BlockchainDataModule } from '@bmd/blockchain-data';
import { StatisticsModule } from './statistics/statistics.module';

import { reducers, metaReducers } from './store';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    NgbModule.forRoot(),
    CoreModule.forRoot(),
    ExchangeRatesModule.forRoot(),
    BlockchainDataModule.forRoot(),
    StatisticsModule.forRoot()
  ],
  bootstrap: [ CoreAppContainerComponent ]
})
export class AppModule { }
