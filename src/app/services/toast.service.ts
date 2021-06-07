import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  title: string;
  body: string;
  constructor(
    private _toastr: ToastrService,
    private _translate: TranslateService,
    private _spinner: NgxSpinnerService
  ) {}

  showSuccess(JSONKeyTitle: string, JSONKeyBody: string) {
    this._spinner.hide();
    this.title = this._translate.instant(JSONKeyTitle);
    this.body = this._translate.instant(JSONKeyBody);
    this._toastr.success(this.body, this.title);
  }

  showError(JSONKeyTitle: string, JSONKeyBody: string) {
    this._spinner.hide();
    this.title = this._translate.instant(JSONKeyTitle);
    this.body = this._translate.instant(JSONKeyBody);
    this._toastr.error(this.body, this.title);
  }

  showWarning(JSONKeyTitle: string, JSONKeyBody: string) {
    this._spinner.hide();
    this.title = this._translate.instant(JSONKeyTitle);
    this.body = this._translate.instant(JSONKeyBody);
    this._toastr.warning(this.body, this.title);
  }
}
