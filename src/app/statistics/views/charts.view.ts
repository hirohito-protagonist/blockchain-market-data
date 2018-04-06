import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ChartViewModel } from './../model.view';

@Component({
  selector: '<bmd-charts-view></bmd-charts-view>',
  templateUrl: './charts.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsViewComponent {

  @Input() vModel: ChartViewModel;

  @Output() chartTimeSpan = new EventEmitter<string>();
  @Output() chartName = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();

  lineChartColors = [
    {
      backgroundColor: '#3f2a5d',
      borderColor: '#864DD9',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
}
