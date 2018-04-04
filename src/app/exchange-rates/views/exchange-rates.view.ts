import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ExchangeRatesViewModel } from './../model.view';

@Component({
  selector: 'bmd-exchange-rate-view',
  templateUrl: './exchange-rates.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ExchangeRatesViewComponent {

  @Input() vModel: ExchangeRatesViewModel;

  @Output() vActions = new EventEmitter<{ type: string; e: any; }>();
}
