import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExchangeRatesService } from './exchange-rates.service';
import { fromBlockchainDataMarketPriceEntity } from './../entities/index.entity';

describe('ExchangeRatesService', () => {

  let service: ExchangeRatesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ExchangeRatesService
      ]
    });

    service = TestBed.get(ExchangeRatesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();
  });

  describe('ticker', () => {

    it('should return market prices', () => {

      const testData: fromBlockchainDataMarketPriceEntity.MarketPricesEntities = {
        'USD' : { '15m' : 478.68, 'last' : 478.68, 'buy' : 478.55, 'sell' : 478.68,  'symbol' : '$' }
      };

      service.ticker().subscribe((responseBody) => {

        expect(responseBody).toMatchSnapshot();
      });

      const req = httpTestingController.expectOne('https://blockchain.info/ticker?cors=true');

      expect(req.request.method).toMatchSnapshot();
      req.flush(testData);
    });
  });

  describe('tobtc', () => {

    it('should convert x value in the provided currency to btc', () => {


      service.tobtc('USD', 500).subscribe(btc => {

        expect(btc).toMatchSnapshot();
      });

      const req = httpTestingController.expectOne('https://blockchain.info/tobtc?cors=true&currency=USD&value=500');

      expect(req.request.method).toMatchSnapshot();
      req.flush(10);
    });
  });
});
