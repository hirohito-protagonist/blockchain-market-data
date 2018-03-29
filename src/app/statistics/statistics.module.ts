import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers/index.reducer';

import { StatisticsContainerComponent } from './containers/statistics.container';
import { StatisticsViewComponent } from './views/statistics.view';
import { ChartsContainerComponent } from './containers/charts.container';
import { ChartsViewComponent } from './views/charts.view';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgxChartsModule,
    StoreModule.forFeature('statistics', reducers),
  ],
  declarations: [
    StatisticsContainerComponent,
    ChartsContainerComponent,
    StatisticsViewComponent,
    ChartsViewComponent
  ],
  exports: [
    StatisticsContainerComponent,
    ChartsContainerComponent
  ]
})
export class StatisticsModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: StatisticsModule,
      providers: []
    };
  }
}
