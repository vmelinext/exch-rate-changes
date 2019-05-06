import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identity, pickBy } from 'lodash';
import { Observable } from 'rxjs';
import { delay, retryWhen, take } from 'rxjs/operators';

export class BaseService {
  private readonly httpHeaders = new HttpHeaders({
    Accept: 'application/json'
  });

  constructor(protected readonly http: HttpClient) {}

  protected get<T>(url: string, queryParamsDictionary?: object): Observable<T> {
    return this.http
      .get<T>(url, {
        headers: this.httpHeaders,
        params: { ...this.cleanse(queryParamsDictionary) }
      })
      .pipe(
        retryWhen(errors =>
          errors.pipe(
            delay(1000),
            take(3)
          )
        )
      );
  }

  protected cleanse(queryParamsDictionary?: object): object {
    const params = { ...queryParamsDictionary };

    return pickBy(params, identity);
  }
}
