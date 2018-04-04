import {
  Component,
  ChangeDetectionStrategy,
  Input,
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

  currencies = [];

  @Input() prices: MarketPrices;

  ngOnChanges(changes: SimpleChanges): void {
    this.currencies = Object.keys(this.prices || {});
  }
}
