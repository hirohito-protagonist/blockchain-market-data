import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { MarketPrices } from './../exchange-rates.type';

@Component({
  selector: 'bmd-market-prices-view',
  templateUrl: './market-prices.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketPricesViewComponent implements OnChanges {

  displayedColumns = ['currency',  'symbol', 'm', 'last', 'sell', 'buy'];
  dataSource = [];

  @Input() prices: MarketPrices;
  @Input() selectedCurrency = '';

  @Output() selectCurrency = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {

    this.dataSource = Object.keys(this.prices || {}).map((currency) => {

      return {
        ...this.prices[currency],
        currency
      };
    });
  }
}
