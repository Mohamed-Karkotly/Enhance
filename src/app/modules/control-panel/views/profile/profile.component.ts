import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { Category } from 'src/app/models/entities/category.interface';
import { City } from 'src/app/models/entities/city.interface';
import { User } from 'src/app/models/entities/user.interface';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { RegExService } from 'src/app/services/reg-ex.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean; //Form submession for validation
  image: any;
  //API Requests to be stored in the following interfaces
  categories: Category[];
  countries: CountryAPI[];
  cities: City[];
  user: User;
  currentUser: User;
  //Buttons content
  countriesButtonContent: string;
  citiesButtonContent: string;
  showLocationError: boolean;
  constructor(
    private _formBuilder: FormBuilder,
    private _regexService: RegExService,
    private _sharedService: SharedService,
    private _translate: TranslateService,
    private _spinner: NgxSpinnerService,
    private _imageUploadService: ImageUploadService,
    private _authService: AuthService,
    private _storageService: StorageService
  ) {
    this.constructProfile();
  }

  ngOnInit() {
    this.initSignUpForm();
    this.getCategories();
    this.getCountries();
  }

  constructProfile() {
    this.currentUser = this._storageService.getLocalObject('user');
    console.warn(this.currentUser);
    this.countriesButtonContent = this.currentUser.city.country.name;
    this.citiesButtonContent = this.currentUser.city.name;
  }

  initSignUpForm() {
    this.signUpForm = this._formBuilder.group({
      firstName: new FormControl(this.currentUser.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(this._regexService.name),
      ]),
      lastName: new FormControl(this.currentUser.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern(this._regexService.name),
      ]),
      email: new FormControl(this.currentUser.email, [
        Validators.required,
        Validators.pattern(this._regexService.email),
      ]),
      age: new FormControl(this.currentUser.age, [
        Validators.required,
        Validators.min(14),
        Validators.max(100),
      ]),
      phone: new FormControl(this.currentUser.phone, [Validators.required]),
      profession: new FormControl(this.currentUser.profession),
      cityId: new FormControl(this.currentUser.city, [Validators.required]),
      categories: new FormControl('', [Validators.required]),
      bio: new FormControl(this.currentUser.bio),
      invitationOption: new FormControl(this.currentUser.invitationOption),
      profileImage: new FormControl(this.currentUser.profileImage),
    });
  }

  reInitProfile() {
    this.constructProfile();
    this.initSignUpForm();
  }

  get form() {
    return this.signUpForm.controls;
  }

  getCountries() {
    this._sharedService.getCountries().subscribe((countries: CountryAPI[]) => {
      this.countries = countries;
    });
  }

  getCategories() {
    this._sharedService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  chooseCountry(country: CountryAPI) {
    this.countriesButtonContent = country.name;
    this.cities = country.cities;
    this.citiesButtonContent = this._translate.instant('form.city');
    this.signUpForm.controls.cityId.setValue('');
  }

  chooseCity(city: City) {
    this.citiesButtonContent = city.name;
    this.signUpForm.controls.cityId.setValue(city.id);
  }

  // Returns true if the user has changed the value in the form
  isDifferent(obj: any, prop: string) {
    return this.currentUser[prop] !== obj[prop];
  }

  onSubmit() {
    let hasChanges: boolean = false;
    this.submitted = true;
    if (!this.validateForm()) return; // stop here if form is invalid
    for (let prop in this.signUpForm.value) {
      if (this.isDifferent(this.signUpForm.value, prop)) {
        hasChanges = true;
      }
    }
    console.warn(hasChanges);
    // If no changes, cancel form submition
    if (!hasChanges) {
      return;
    }
    this.image && this.uploadImage();
    //this.initUser();
    //this.updateUser();
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

  uploadImage() {
    this._imageUploadService.uploadImage(this.image).subscribe(
      (imageUrl: any) => {
        //this.signUpForm.controls.progileImage.setValue(imageUrl);
        console.warn(imageUrl);
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  updateUser() {
    console.warn(this.user);
    this._authService.postSignUp(this.user).subscribe(
      (res) => {
        console.warn(res);
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  processFile(event: any) {
    const type = event.target.files[0].type;
    if (type.match(/image\/*/) == null) {
      return;
    }
    if (event.target.files && event.target.files.length) {
      this.image = event.target.files.item(0);
      console.warn(this.image);
    }
  }
}
