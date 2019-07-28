import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import { ConvertToBTC, ConvertBtcState } from './../exchange-rates.type';

@Component({
  selector: 'bmd-converter-view',
  templateUrl: './converter.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterViewComponent implements OnChanges {

  @Input() convert: ConvertBtcState;
  @Input() currencies: { currency: string; symbol: string; }[];
  @Output() convertToBtc = new EventEmitter<ConvertToBTC>();
  @Input() selectedCurrency = '';
  @Output() selectCurrency = new EventEmitter<string>();
  @ViewChild('value', { static: true }) inputValue: ElementRef;
  @ViewChild('currency', { static: true }) inputCurrency: ElementRef;

  currencySymbol = '';

  ngOnChanges(changes) {

    if (changes.selectedCurrency) {

      this.currencySymbol = this.resolveCurrencySymbol(this.selectedCurrency);
      this.convertToBtc.emit({
        value: (this.inputValue.nativeElement.value as string),
        currency: this.selectedCurrency
      });
    }
  }

  updateConvert(type: string, value: string) {

    if (type === 'value') {
      this.convertToBtc.emit({
        value,
        currency: this.inputCurrency.nativeElement.value
      });
    } else if (type === 'currency') {
      this.currencySymbol = this.resolveCurrencySymbol(value);
      this.selectCurrency.emit(value);
    }
  }

  resolveCurrencySymbol(currency: string): string {

    return this.currencies.reduce((previous, current) => {

      return current.currency === currency ? current.symbol : previous;
    }, '');
  }
}
