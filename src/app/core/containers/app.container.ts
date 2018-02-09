import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store } from '@ngrx/store';

import { fromLayoutActions } from './../actions/index.action';
import { fromLayoutReducer, CoreState, getActiveLayoutView } from './../reducers/index.reducer';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'bmd-core-app-container',
  template: `
    <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0">
      <h1 class="navbar-brand col-sm-3 col-md-2 mr-0">Blockchain Market Data</h1>
    </nav>
    <div class="container-fluid c-main">
      <div class="row">
        <bmd-core-sidebar-view
          class="col-md-2 d-none d-md-block bg-light c-sidebar"
          (changeView)="changeView($event)"></bmd-core-sidebar-view>
        <bmd-core-content-view
          class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4"
          [activeView]="activeView$ | async"></bmd-core-content-view>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreAppContainerComponent {

  activeView$: Observable<fromLayoutReducer.LayoutView>;

  constructor(public store: Store<CoreState>) {

    this.activeView$ = store.select(getActiveLayoutView);
  }

  changeView(view: fromLayoutReducer.LayoutView) {

    this.store.dispatch(new fromLayoutActions.ChangeView(view));
  }
}
