import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegExService } from 'src/app/services/reg-ex.service';
import { User } from 'src/app/models/entities/user.interface';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { Category } from 'src/app/models/entities/category.interface';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { TranslateService } from '@ngx-translate/core';
import { City } from 'src/app/models/entities/city.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { TagInputModule } from 'ngx-chips';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { Credentials } from 'src/app/models/API/credentials.interface';

TagInputModule.withDefaults({
  tagInput: {
    placeholder: 'Add a new tag',
    secondaryPlaceholder: 'Your Custom PlaceHolder Here sssssssss',
  },
});
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean; //Form submession for validation
  image: any;
  imageSrc: any;
  credentials = {} as Credentials;
  //API Requests to be stored in the following interfaces
  categories: Category[];
  countries: CountryAPI[];
  cities: City[];
  user: User;
  //User subscribed to variables
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  //Buttons content
  countriesButtonContent: string;
  countryIsSelected: boolean;
  citiesButtonContent: string;
  showLocationError: boolean;
  constructor(
    private _formBuilder: FormBuilder,
    private _regexService: RegExService,
    private _sharedService: SharedService,
    private _imageUploadService: ImageUploadService,
    private _authService: AuthService,
    private _router: Router,
    private _storageService: StorageService,
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService,
    private _errorService: ErrorHandlerService,
    private _translate: TranslateService
  ) {
    this.countriesButtonContent = this._translate.instant('form.country');
    this.citiesButtonContent = this._translate.instant('form.city');
    this.countryIsSelected = false;
    this.showLocationError = false;
  }

  ngOnInit() {
    this.initSignUpForm();
    //-> Restore subscription by uncommenting code below
    //this.subscribeUser();
    this.getCategories();
    this.getCountries();
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
      username: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this._regexService.password),
      ]),
      cityId: new FormControl('', [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      bio: new FormControl(''),
      invitationOption: new FormControl(true),
      profileImage: new FormControl(''),
    });
  }

  get form() {
    return this.signUpForm.controls;
  }

  subscribeUser() {
    this.signUpForm.controls.firstName.valueChanges.subscribe((firsName) => {
      this.firstName = firsName;
    });
    this.signUpForm.controls.lastName.valueChanges.subscribe((lastName) => {
      this.lastName = lastName;
    });
    this.signUpForm.controls.username.valueChanges.subscribe((username) => {
      this.username = username;
    });
    this.signUpForm.controls.bio.valueChanges.subscribe((bio) => {
      this.bio = bio;
    });
  }

  getCountries() {
    this._spinner.show();
    this._sharedService.getCountries().subscribe((countries: CountryAPI[]) => {
      this.countries = countries;
      this._spinner.hide();
    });
  }

  getCategories() {
    this._spinner.show();
    this._sharedService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this._spinner.hide();
    });
  }

  chooseCountry(country: CountryAPI) {
    this.countriesButtonContent = country.name;
    this.cities = country.cities;
    this.countryIsSelected = true;
    this.citiesButtonContent = this._translate.instant('form.city');
    this.signUpForm.controls.cityId.setValue('');
  }

  chooseCity(city: City) {
    this.citiesButtonContent = city.name;
    this.signUpForm.controls.cityId.setValue(city.id);
    this.showLocationError = false;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.validateForm()) return; // stop here if form is invalid
    this.initUser();
    this.image && this.uploadImage();
    !this.image && this.signUp();
  }

  validateForm() {
    if (this.signUpForm.invalid) {
      if (this.signUpForm.controls.cityId.invalid) {
        this.showLocationError = true;
      }
      return false;
    } else {
      return true;
    }
  }

  initUser() {
    this.user = this.signUpForm.value;
    this.user.categories = this.signUpForm
      .get('categories')
      .value.map(({ id }) => id);
  }

  processFile(event: any) {
    const type = event.target.files[0].type;
    if (type.match(/image\/*/) == null) {
      return;
    }
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
      this.image = event.target.files.item(0);
    }
  }

  uploadImage() {
    this._spinner.show();
    this._imageUploadService.uploadImage(this.image).subscribe(
      (response: any) => {
        let imageUrl = response.imageUrl;
        this.user.profileImage = imageUrl;
        this.signUp();
      },
      //TODO: Use ToastService to handle errors instead of this
      (err) => {
        if (this._errorService.handleError(err)) {
          return;
        }
        console.error(err.error);
        let title = this._translate.instant('toastr.oops');
        let body = this._translate.instant('toastr.image');
        this._spinner.hide();
        this._toastr.error(body, title);
      }
    );
  }

  signUp() {
    this._spinner.show();
    this._authService.postSignUp(this.user).subscribe(
      (res) => {
        this._storageService.setLocalObject('user', this.user);
        this.saveCredentials();
        this._authService
          .postLogin(this.credentials)
          .subscribe((user: User) => {
            this._spinner.hide();
            this._storageService.setToken(user.jwtToken);
            this._storageService.setLocalObject('user', user);
            this._storageService.setLocalObject(
              'credentials',
              this.credentials
            );
            this._router.navigateByUrl('/communities');
          });
      },
      //TODO: Use ToastService to handle errors instead of this
      (err) => {
        if (this._errorService.handleError(err)) {
          return;
        }
        if (err.error.errors[0].param === 'email') {
          let title = this._translate.instant('toastr.oops');
          let body = this._translate.instant('toastr.email');
          this._spinner.hide();
          this._toastr.error(body, title);
        }
        if (err.error.errors[0].param === 'username') {
          let title = this._translate.instant('toastr.oops');
          let body = this._translate.instant('toastr.username');
          this._spinner.hide();
          this._toastr.error(body, title);
        }
      }
    );
  }

  saveCredentials() {
    this.credentials.email = this.signUpForm.controls.email.value;
    this.credentials.password = this.signUpForm.controls.password.value;
    this._storageService.setLocalObject('credentials', this.credentials);
  }
}
