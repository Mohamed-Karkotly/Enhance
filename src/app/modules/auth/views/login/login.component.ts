import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Credentials } from 'src/app/models/API/credentials.interface';
import { User } from 'src/app/models/entities/user.interface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { RegExService } from 'src/app/services/reg-ex.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  input1Focus: boolean;
  input2Focus: boolean;
  submitted: boolean;
  loginForm: FormGroup;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _regexService: RegExService,
    private _spinner: NgxSpinnerService,
    private _storageService: StorageService,
    private _errorService: ErrorHandlerService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this._regexService.email),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  // For easier accessibility to the form
  get form() {
    return this.loginForm.controls;
  }

  onSubmit(credentials: Credentials) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this._spinner.show();
    this.login(credentials);
  }

  login(credentials: Credentials) {
    this._authService.postLogin(credentials).subscribe(
      (user: User) => {
        this._spinner.hide();
        this._storageService.setToken(user.jwtToken);
        this._storageService.setLocalObject('user', user);
        this._storageService.setLocalObject('credentials', credentials);
        this._router.navigateByUrl('/communities');
      },
      (err: HttpErrorResponse) => {
        if (this._errorService.handleError(err)) {
          return;
        }
        if (err.status === 404) {
          this._toastService.showError('toastr.oops', 'toastr.not-registered');
        }
        if (err.status === 401) {
          this._toastService.showError('toastr.oops', 'toastr.mismatch');
        }
      }
    );
  }
}
