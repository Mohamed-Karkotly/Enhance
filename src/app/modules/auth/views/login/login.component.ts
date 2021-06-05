import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Credentials } from 'src/app/models/API/credentials.interface';
import { User } from 'src/app/models/entities/user.interface';
import { RegExService } from 'src/app/services/reg-ex.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  input1Focus: boolean;
  input2Focus: boolean;
  submitted: boolean;
  loginForm: FormGroup;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _regexService: RegExService,
    private _spinner: NgxSpinnerService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngAfterViewInit(): void {
    document.body.classList.add('bg-gradient');
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
      },
      //! component scope error handling
      (error: HttpErrorResponse) => {
        console.error(error);
        setTimeout(() => {
          this._spinner.hide();
        }, 5000);
      }
    );
  }
}
