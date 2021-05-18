import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageSnippet } from 'src/app/helpers/image-snippet';
import { ImageService } from 'src/app/services/image.service';
import { RegExService } from 'src/app/services/reg-ex.service';
import { mustMatch } from 'src/app/helpers/must-match.validator';
import { User } from 'src/app/models/entities/user.interface';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  imageSnippet: ImageSnippet;
  signUpForm: FormGroup;
  submitted: boolean;
  user: User;
  constructor(
    private _formBuilder: FormBuilder,
    private _regexService: RegExService,
    private _imageService: ImageService
  ) {}

  ngOnInit() {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = this._formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(this._regexService.name),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(this._regexService.name),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this._regexService.email),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(14),
        Validators.max(100),
      ]),
      phone: new FormControl('', [Validators.required]),
      profession: new FormControl(''),
      address: new FormControl(''),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this._regexService.password),
      ]),
    });
  }
  onSubmit(signUpForm: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    console.warn(this.user);
  }
  get form() {
    return this.signUpForm.controls;
  }

  /* processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.imageSnippet = new ImageSnippet(event.target.result, file);
      this.imageSnippet.pending = true;
      this._imageService.uploadImage(this.imageSnippet.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        }
      );
    });
    reader.readAsDataURL(file);
  }

  private onSuccess() {
    this.imageSnippet.pending = false;
    this.imageSnippet.status = 'ok';
  }

  private onError() {
    this.imageSnippet.pending = false;
    this.imageSnippet.status = 'fail';
    this.imageSnippet.src = '';
  } */
}
