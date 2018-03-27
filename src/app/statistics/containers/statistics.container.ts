import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  StatisticsState,
  getStatistics,
  getChartsData
} from './../reducers/index.reducer';
import { Observable } from 'rxjs/Observable';

import { StatisticsInfo } from './../statistics.type';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';


@Component({
  selector: 'bmd-statistics-container',
  template: `
    <bmd-statistics-view
      [stats]="stats$ | async"
      [chartData]="chartData$ | async"
      (refresh)="requestStatistics()"
      (chartTimeSpan)="chartTimeSpan($event)"
      (chartName)="chartName($event)"
      >
    </bmd-statistics-view>
  `
})
export class StatisticsContainerComponent implements OnInit {

  stats$: Observable<StatisticsInfo>;
  chartData$: Observable<any>;
  chartQuery: any;

  constructor(private store: Store<StatisticsState>) {

    this.stats$ = this.store.select(getStatistics);
    this.chartData$ = this.store.select(getChartsData);
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
    this.requestStatistics();
    this.store.dispatch(new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Charts,
      query: this.chartQuery
    }));
  }

  requestStatistics() {
    this.store.dispatch(new fromBlockchainDataAction.FetchData({ key: DataServiceType.Stats, query: null }));
  }

  chartTimeSpan(timespan: string) {

    this.chartQuery = {
      ...this.chartQuery,
      timespan
    };

    this.store.dispatch(new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Charts,
      query: this.chartQuery
    }));
  }

  chartName(name: string) {

    this.chartQuery = {
      ...this.chartQuery,
      name
    };

    this.store.dispatch(new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Charts,
      query: this.chartQuery
    }));
  }
}
