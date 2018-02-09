import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { fromLayoutReducer } from './../../reducers/index.reducer';

@Component({
  selector: 'bmd-core-sidebar-view',
  templateUrl: './sidebar.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreSidebarViewComponent {

  layoutView = fromLayoutReducer.LayoutView;

  @Output() changeView = new EventEmitter<fromLayoutReducer.LayoutView>();
}
