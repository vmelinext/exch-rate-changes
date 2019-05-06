import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExchangeRateChange } from 'src/app/shared/models/exchange-rate-change.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SharedModule, HttpClientTestingModule],
      providers: [ExchangeRateService]
    });

    service = TestBed.get(ExchangeRateService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findAll', () => {
    it(`should call service using GET`, () => {
      const date = '2014-01-01';
      service.findAll(date).subscribe(() => {
        const request = httpMock.expectOne(`${environment.exchangeRateApiUrl}/exchange-rates?Date=${date}`);

        expect(request.request.method).toBe('GET');
      });
    });

    it('should map json response to exchange rate change object array', () => {
      const date = '2014-01-01';

      const httpResponseMock = [
        { date: '2014-01-01', currency: 'USD', change: 1 },
        { date: '2014-01-01', currency: 'AED', change: 2 }
      ];

      const expectedResponse = [
        new ExchangeRateChange(new Date('2014-01-01'), 'USD', 1),
        new ExchangeRateChange(new Date('2014-01-01'), 'AED', 2)
      ];

      service.findAll(date).subscribe(response => {
        expect(response).toEqual(expectedResponse);

        const request = httpMock
          .expectOne(`${environment.exchangeRateApiUrl}/exchange-rates?Date=${date}`)
          .flush(httpResponseMock);
      });
    });
  });
});
