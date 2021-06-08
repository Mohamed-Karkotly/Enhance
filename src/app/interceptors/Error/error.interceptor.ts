import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  //!Global scope error handling
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      //TODO: Reactivate the following line on production
      // -> retry(1),
      catchError((error: HttpErrorResponse) => {
        //TODO: Make a global enum for error codes
        if (error.error instanceof ErrorEvent) {
          // handle client-side error
        } else {
          // handle server-side error
          //TODO: Manage global response error
          //-> i.e. 401, 404, 500, etc..
          //-> Also refresh token for expired token
          switch (error.status) {
            case 401: //login
              break;
            case 403: //forbidden
              break;
            case 404: //not found
              //this.router.navigateByUrl('');
              break;
            case 500: //internal server error
              //this.router.navigateByUrl('');
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
