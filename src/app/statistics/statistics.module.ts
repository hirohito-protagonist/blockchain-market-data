import { NgModule, ModuleWithProviders } from '@angular/core';

import { StatisticsContainerComponent } from './containers/statistics.container';
import { StatisticsViewComponent } from './views/statistics.view';

@NgModule({
  declarations: [ StatisticsContainerComponent, StatisticsViewComponent ],
  exports: [ StatisticsContainerComponent ]
})
export class StatisticsModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: StatisticsModule,
      providers: []
    };
  }
}
