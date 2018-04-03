import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { StatisticViewModel } from './../model.view';

@Component({
  selector: '<bmd-statistics-view></bmd-statistics-view>',
  templateUrl: './statistics.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsViewComponent {

  @Input() vModel: StatisticViewModel;

  @Output() refresh = new EventEmitter<void>();
}
