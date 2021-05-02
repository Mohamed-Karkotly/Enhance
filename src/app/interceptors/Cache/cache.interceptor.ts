/* import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor() {}

  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    if (request.headers.get('reset')) {
      this.cache.delete(request);
    }

    const cachedResponse: HttpResponse<any> = this.cache.get(request);

    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next
        .handle(request)
        .pipe(
          tap((stateEvent) => {
            if (stateEvent instanceof HttpResponse) {
              this.cache.set(request, stateEvent.clone());
            }
          })
        )
    }
  }
}
 */
