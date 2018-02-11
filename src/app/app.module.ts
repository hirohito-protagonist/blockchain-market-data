import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { StoreModule } from '@ngrx/store';

import { CoreModule, CoreAppContainerComponent } from './core/core.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';

import { reducers, metaReducers } from './store';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    CoreModule.forRoot(),
    ExchangeRatesModule.forRoot()
  ],
  bootstrap: [ CoreAppContainerComponent ]
})
export class AppModule { }
