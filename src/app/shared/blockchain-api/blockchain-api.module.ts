import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  TickerResponse,
  ExchangeRatesService
} from './exchange-rates.service';

export {
  TickerResponse,
  ExchangeRatesService
};

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ ExchangeRatesService ]
})
export class BlockchainApiModule {}
