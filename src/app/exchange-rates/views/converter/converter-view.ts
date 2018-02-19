import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { fromConvertBtc } from './../../reducers/index.reducer';

@Component({
  selector: 'bmd-converter-view',
  templateUrl: './converter-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterViewComponent {

  @Input() convert: fromConvertBtc.ConvertBtcState;
  @Output() convertToBtc = new EventEmitter<fromConvertBtc.ConvertToBTC>();
  @ViewChild('value') inputValue: ElementRef;
  @ViewChild('currency') inputCurrency: ElementRef;

  updateConvert(type: string, value: string) {

    if (type === 'value') {
      this.convertToBtc.emit({
        value,
        currency: this.inputCurrency.nativeElement.value
      });
    } else if (type === 'currency') {
      this.convertToBtc.emit({
        value: this.inputValue.nativeElement.value,
        currency: value
      });
    }
  }
}
