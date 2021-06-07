import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  title: string;
  body: string;
  isInternetConnectionError: boolean;
  constructor(private _toastService: ToastService) {}

  handleError(error: HttpErrorResponse): boolean {
    if (error.status === 0 && error.error instanceof ProgressEvent) {
      this.isInternetConnectionError = true;
      this._toastService.showError('toastr.oops', 'toastr.internet');
      return this.isInternetConnectionError;
    } else {
      return false;
    }
  }
}
