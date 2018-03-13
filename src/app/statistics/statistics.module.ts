import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers/index.reducer';

import { StatisticsContainerComponent } from './containers/statistics.container';
import { StatisticsViewComponent } from './views/statistics.view';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('statistics', reducers),
  ],
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
