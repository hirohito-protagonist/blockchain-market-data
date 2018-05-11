import {
  Component,
  OnInit
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import {
  StatisticsState,
  viewChartModel,
  getChartQuery
} from './../reducers/index.reducer';
import { ChartQuery } from './../statistics.type';
import { ChartViewModel } from './../model.view';
import { Observable } from 'rxjs';
import { fromUIActions } from './../actions/index.action';

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

    this.chartViewModel$ = this.store.pipe(select(viewChartModel));
    this.store.select(getChartQuery).subscribe((query) => {

      this.chartQuery = query;
    });
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
    this.store.dispatch(new fromUIActions.UpdateUIState({
      key: 'chartsView',
      value: {
        selectedChartTimeSpan: timespan
      }
    }));
  }

  chartName(name: string) {

    this.chartQuery = {
      ...this.chartQuery,
      name
    };

    this.requestChart(this.chartQuery);
    this.store.dispatch(new fromUIActions.UpdateUIState({
      key: 'chartsView',
      value: {
        selectedChart: name
      }
    }));
  }

  requestChart(query: ChartQuery): void {

    this.store.dispatch(new fromBlockchainDataAction.FetchData({
      key: DataServiceType.Charts,
      query: query
    }));
  }
}
