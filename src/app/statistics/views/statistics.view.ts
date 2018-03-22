import {
  Component,
  Input,
  Output,
  EventEmitter,
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

  @Output() refresh = new EventEmitter<void>();

  tempChartData = [
    {
      'name': 'Transaction Rate',
      'series': [
        {
          'name': '1518726120',
          'value': 2.6359027777777753
        },
        {
          'name': '1518728100',
          'value': 2.7195486111111085
        },
        {
          'name': '1518730080',
          'value': 2.7224999999999984
        },
        {
          'name': '1518732060',
          'value': 2.6919444444444425
        }
      ]
    }
  ];
}
