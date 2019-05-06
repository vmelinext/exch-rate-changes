import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExchangeRateChange } from 'src/app/shared/models/exchange-rate-change.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateServiceMock {
  public exchangeRates = [new ExchangeRateChange(new Date('2014-01-01'), 'USD', 1)];

  public findAll(date: string): Observable<Array<ExchangeRateChange>> {
    return of(this.exchangeRates);
  }
}
