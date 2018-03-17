import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { StatisticsInfo } from './../statistics.type';

@Component({
  selector: '<bmd-statistics-view></bmd-statistics-view>',
  templateUrl: './statistics.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsViewComponent {

  @Input() stats: StatisticsInfo;
}
