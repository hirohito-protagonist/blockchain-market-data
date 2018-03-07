import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { ConvertToBTC, ConvertBtcState } from './../../exchange-rates.type';

@Component({
  selector: 'bmd-converter-view',
  templateUrl: './converter-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterViewComponent {

  @Input() convert: ConvertBtcState;
  @Input() currencies: { currency: string; symbol: string; }[];
  @Output() convertToBtc = new EventEmitter<ConvertToBTC>();
  @ViewChild('value') inputValue: ElementRef;
  @ViewChild('currency') inputCurrency: ElementRef;

  currencySymbol = '';

  updateConvert(type: string, value: string) {

    if (type === 'value') {
      this.convertToBtc.emit({
        value,
        currency: this.inputCurrency.nativeElement.value
      });
    } else if (type === 'currency') {
      this.convertToBtc.emit({
        value: (this.inputValue.nativeElement.value as string),
        currency: value
      });
      this.currencySymbol = this.currencies.reduce((previous, current) => {

        return current.currency === value ? current.symbol : previous;
      }, '');
    }
  }
}
