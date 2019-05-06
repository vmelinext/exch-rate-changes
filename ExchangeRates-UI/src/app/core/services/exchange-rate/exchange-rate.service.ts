import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExchangeRateChange } from 'src/app/shared/models/exchange-rate-change.model';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService extends BaseService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public findAll(date: string): Observable<Array<ExchangeRateChange>> {
    return this.get(`${environment.exchangeRateApiUrl}/exchange-rates`, {
      date
    }).pipe(map((list: Array<any>) => list.map(ExchangeRateChange.fromAny)));
  }
}
