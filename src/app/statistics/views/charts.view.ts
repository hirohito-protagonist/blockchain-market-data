import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Chart } from './../statistics.type';

@Component({
  selector: '<bmd-charts-view></bmd-charts-view>',
  templateUrl: './charts.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsViewComponent {

  @Input() chartData: Chart;

  @Output() chartTimeSpan = new EventEmitter<string>();
  @Output() chartName = new EventEmitter<string>();

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
