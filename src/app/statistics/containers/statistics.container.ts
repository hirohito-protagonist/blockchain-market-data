import {
  Component,
  OnInit
} from '@angular/core';

import { Store, select } from '@ngrx/store';
import {
  StatisticsState,
  statisticViewModel
} from './../reducers/index.reducer';
import { Observable } from 'rxjs/Observable';

import { StatisticViewModel } from './../model.view';
import { fromBlockchainDataAction, DataServiceType } from '@bmd/blockchain-data';


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
    this.store.dispatch(new fromBlockchainDataAction.FetchData({ key: DataServiceType.Stats, query: null }));
  }
}
