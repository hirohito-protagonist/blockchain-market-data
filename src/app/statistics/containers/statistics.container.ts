import {
  Component,
  OnInit
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import { StatisticsState } from './../store/store';
import { statisticViewModel } from './../store/selectors';
import { Observable } from 'rxjs';

import { StatisticViewModel } from './../model.view';
import { fetchData, DataServiceType } from '@bmd/blockchain-data';


@Component({
  selector: 'bmd-statistics-container',
  template: `
    <bmd-statistics-view
      [vModel]="statisticViewModel$ | async"
      (refresh)="requestStatistics()"
      >
    </bmd-statistics-view>
  `
})
export class StatisticsContainerComponent implements OnInit {

  statisticViewModel$: Observable<StatisticViewModel>;

  constructor(private store: Store<StatisticsState>) {

    this.statisticViewModel$ = this.store.pipe(select(statisticViewModel));
  }

  ngOnInit(): void {
    this.requestStatistics();
  }

  requestStatistics() {
    this.store.dispatch(fetchData({
      key: DataServiceType.Stats, query: null
    }));
  }
}
