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
      (refresh)="requestStatistics()"
      >
    </bmd-statistics-view>
  `
})
export class StatisticsContainerComponent implements OnInit {

  stats$: Observable<StatisticsInfo>;

  constructor(private store: Store<StatisticsState>) {

    this.stats$ = this.store.select(getStatistics);
  }

  ngOnInit(): void {
    this.requestStatistics();
  }

  requestStatistics() {
    this.store.dispatch(new fromBlockchainDataAction.FetchData({ key: DataServiceType.Stats, query: null }));
  }
}
