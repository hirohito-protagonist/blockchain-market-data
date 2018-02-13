import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { fromMarketPrices } from './../../reducers/index.reducer';

@Component({
  selector: 'bmd-market-prices-view',
  templateUrl: './market-prices.view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketPricesViewComponent implements OnChanges {

  currencies = [];

  @Input() prices: fromMarketPrices.MarketPrices;

  ngOnChanges(changes: SimpleChanges): void {
    this.currencies = Object.keys(this.prices);
  }
}
