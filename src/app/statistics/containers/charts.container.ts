import {
  Component,
  OnInit
} from '@angular/core';

import { Store } from '@ngrx/store';
import {
  StatisticsState,
  getChartsData
} from './../reducers/index.reducer';
import { Observable } from 'rxjs/Observable';

import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';


@Component({
  selector: 'bmd-statistics-charts-container',
  template: `
    <bmd-charts-view
      [chartData]="chartData$ | async"
      (chartTimeSpan)="chartTimeSpan($event)"
      (chartName)="chartName($event)"
      >
    </bmd-charts-view>
  `
})
export class ChartsContainerComponent implements OnInit {

  chartData$: Observable<any>;
  chartQuery: any;

  constructor(private store: Store<StatisticsState>) {

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

    this.store.dispatch(new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Charts,
      query: this.chartQuery
    }));
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
