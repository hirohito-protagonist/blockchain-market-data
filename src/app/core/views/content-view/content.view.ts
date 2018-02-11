import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { fromLayoutReducer } from './../../reducers/index.reducer';

@Component({
  selector: 'bmd-core-content-view',
  templateUrl: './content.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreContentViewComponent {

  layoutView = fromLayoutReducer.LayoutView;

  @Input() activeView: fromLayoutReducer.LayoutView;
}
