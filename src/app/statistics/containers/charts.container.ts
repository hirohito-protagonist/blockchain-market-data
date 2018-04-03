import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  StatisticsState,
  viewChartModel
} from './../reducers/index.reducer';
import { ChartQuery } from './../statistics.type';
import { ChartViewModel } from './../model.view';
import { Observable } from 'rxjs/Observable';

import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';


@Component({
  selector: 'bmd-statistics-charts-container',
  template: `
    <bmd-charts-view
      [vModel]="chartViewModel$ | async"
      (chartTimeSpan)="chartTimeSpan($event)"
      (chartName)="chartName($event)"
      (refresh)="refreshChart()"
      >
    </bmd-charts-view>
  `
})
export class ChartsContainerComponent implements OnInit {

  chartViewModel$: Observable<ChartViewModel>;
  chartQuery: ChartQuery;

  constructor(private store: Store<StatisticsState>) {

    this.chartViewModel$ = this.store.select(viewChartModel);
    this.chartQuery = {
      name: 'transactions-per-second',
      start: '',
      timespan: '30days',
      rollingAverage: '',
      format: 'json',
      sampled: true
    };
  }

  ngOnInit(): void {

    this.requestChart(this.chartQuery);
  }

  refreshChart(): void {

    this.requestChart(this.chartQuery);
  }

  chartTimeSpan(timespan: string) {

    this.chartQuery = {
      ...this.chartQuery,
      timespan
    };

    this.requestChart(this.chartQuery);
  }

  chartName(name: string) {

    this.chartQuery = {
      ...this.chartQuery,
      name
    };

    this.requestChart(this.chartQuery);
  }

  requestChart(query: ChartQuery): void {

    this.store.dispatch(new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Charts,
      query: query
    }));
  }
}
