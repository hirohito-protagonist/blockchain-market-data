import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: '<bmd-charts-view></bmd-charts-view>',
  templateUrl: './charts.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsViewComponent {

  @Input() chartData: any;

  @Output() chartTimeSpan = new EventEmitter<string>();
  @Output() chartName = new EventEmitter<string>();

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
