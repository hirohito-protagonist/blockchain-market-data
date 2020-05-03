import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreAppContainerComponent } from './containers/app.container';
import { CoreContentViewComponent } from './views/content.view';

import { ExchangeRatesModule } from './../exchange-rates/exchange-rates.module';
import { StatisticsModule } from './../statistics/statistics.module';

export {
  CoreAppContainerComponent
};

import { Store } from './store/store';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ExchangeRatesModule,
    StatisticsModule,
    Store
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
