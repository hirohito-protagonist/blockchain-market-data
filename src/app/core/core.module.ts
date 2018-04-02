import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { CoreAppContainerComponent } from './containers/app.container';
import { CoreContentViewComponent }  from './views/content.view';

import { ExchangeRatesModule } from './../exchange-rates/exchange-rates.module';
import { StatisticsModule } from './../statistics/statistics.module';

export {
  CoreAppContainerComponent
};

import { reducers } from './reducers/index.reducer';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ExchangeRatesModule,
    StatisticsModule,
    StoreModule.forFeature('core', reducers)
  ],
  declarations: [
    CoreAppContainerComponent,
    CoreContentViewComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
