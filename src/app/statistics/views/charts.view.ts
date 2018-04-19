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

}
