import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { changeView } from './../store/actions';
import { fromLayoutReducer, CoreState } from './../store/store';
import { getActiveLayoutView } from './../store/selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'bmd-core-app-container',
  template: `
    <nav class="o-navbar navbar flex-md-nowrap p-0">
      <h1 class="navbar-brand col-sm-3 col-md-2 mr-0">Blockchain Market Data</h1>
    </nav>
    <div class="c-main">
      <bmd-core-content-view
        class="c-main__content"
        [activeView]="activeView$ | async"
      ></bmd-core-content-view>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreAppContainerComponent {

  activeView$: Observable<fromLayoutReducer.LayoutView>;

  constructor(public store: Store<CoreState>) {

    this.activeView$ = this.store.pipe(select(getActiveLayoutView));
  }

  changeView(view: fromLayoutReducer.LayoutView) {

    this.store.dispatch(changeView({ view }));
  }
}
