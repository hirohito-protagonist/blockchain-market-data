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

      // Given
      const url = 'https://blockchain.info/ticker?cors=true';
      const testData: fromBlockchainDataMarketPriceEntity.MarketPricesEntities = {
        'USD' : { '15m' : 478.68, 'last' : 478.68, 'buy' : 478.55, 'sell' : 478.68,  'symbol' : '$' }
      };

      // When
      service.ticker().subscribe((responseBody) => {

        expect(responseBody).toMatchSnapshot();
      });

      const request = httpTestingController.expectOne(url);
      request.flush(testData);

      // Then
      expect(request.request.method).toMatchSnapshot();
    });
  });

  describe('tobtc', () => {

    it('should convert x value in the provided currency to btc', () => {

      // Given
      const url = 'https://blockchain.info/tobtc?cors=true&currency=USD&value=500';

      // When
      service.tobtc('USD', 500).subscribe(btc => {

        expect(btc).toMatchSnapshot();
      });

      const request = httpTestingController.expectOne(url);
      request.flush(10);

      // Then
      expect(request.request.method).toMatchSnapshot();
    });
  });
});
