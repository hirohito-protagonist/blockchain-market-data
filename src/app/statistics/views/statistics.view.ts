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
  @Input() transPerSeconds: any;

  @Output() refresh = new EventEmitter<void>();
  @Output() chartTimeSpan = new EventEmitter<string>();

  lineChartOptions = {
    responsive: true,
    animation: {
      duration: 0
    },
    hover: {
        animationDuration: 0
    },
    responsiveAnimationDuration: 0,
    elements: {
      line: {
        fill: false,
        tension: 0
      }
    }
  };

  lineChartColors = [
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
}
