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
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/models/entities/user.interface';
import { ToastService } from 'src/app/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastService
  ) {}
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
              this._spinner.hide();
              this._toastr.showWarning('toastr.expired', 'toastr.refreshed');
              this._authService
                .postLogin(this._storageService.getLocalObject('credentials'))
                .subscribe((user: User) => {
                  this._storageService.setLocalObject('user', user);
                  this._storageService.setToken(user.jwtToken);
                });
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
