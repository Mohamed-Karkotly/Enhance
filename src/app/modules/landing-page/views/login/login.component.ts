import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { Credentials } from 'src/app/models/API/credentials.interface';

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
    private _formBuilder: FormBuilder,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this._spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._spinner.hide();
    }, 2000);
  }

  initLoginForm() {
    this.loginForm = this._formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
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
    console.warn(credentials);
  }
}
