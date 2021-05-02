import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token');

    const headers: HttpHeaders = request.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    if (token) {
      const clonedRequest = request.clone({headers});
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
