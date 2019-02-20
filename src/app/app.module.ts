import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NZ_I18N, en_US } from 'ng-zorro-antd';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule, CoreAppContainerComponent } from '@bmd/core';
import { ExchangeRatesModule } from '@bmd/exchange-rates';
import { BlockchainDataModule } from '@bmd/blockchain-data';
import { StatisticsModule } from './statistics/statistics.module';

import { reducers, metaReducers } from './store';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    ExchangeRatesModule.forRoot(),
    BlockchainDataModule.forRoot(),
    StatisticsModule.forRoot()
  ],
  bootstrap: [ CoreAppContainerComponent ],
  providers: [ { provide: NZ_I18N, useValue: en_US } ]
})
export class AppModule { }
