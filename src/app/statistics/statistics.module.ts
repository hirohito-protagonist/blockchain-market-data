import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import { Store } from './store/store';

import { StatisticsContainerComponent } from './containers/statistics.container';
import { StatisticsViewComponent } from './views/statistics.view';
import { ChartsContainerComponent } from './containers/charts.container';
import { ChartsViewComponent } from './views/charts.view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxEchartsModule,
    Store,
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
