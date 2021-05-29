import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ImageSnippet } from 'src/app/helpers/image-snippet';
import { ImageService } from 'src/app/services/image.service';
import { RegExService } from 'src/app/services/reg-ex.service';
import { User } from 'src/app/models/entities/user.interface';
import { ConstantsService } from 'src/app/modules/constants/constants.service';
import { Category } from 'src/app/models/entities/category.interface';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { TranslateService } from '@ngx-translate/core';
import { City } from 'src/app/models/entities/city.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { TagInputModule } from 'ngx-chips';

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
  categories: Category[];
  countries: CountryAPI[];
  cities: City[];
  imageSnippet: ImageSnippet;
  submitted: boolean;
  user: User;
  //Buttons content
  countriesButtonContent: string;
  countryIsSelected: boolean;
  citiesButtonContent: string;
  showLocationError: boolean;
  constructor(
    private _formBuilder: FormBuilder,
    private _regexService: RegExService,
    private _constantsService: ConstantsService,
    private _translate: TranslateService,
    private _spinner: NgxSpinnerService,
    private _imageService: ImageService
  ) {
    this.countriesButtonContent = this._translate.instant('form.country');
    this.citiesButtonContent = this._translate.instant('form.city');
    this.countryIsSelected = false;
    this.showLocationError = false;
  }

  ngOnInit() {
    this.initSignUpForm();
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
      phone: new FormControl(''),
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
      invitaionOptions: new FormControl(true),
    });
  }

  getCountries() {
    this._constantsService
      .getCountries()
      .subscribe((countries: CountryAPI[]) => {
        this.countries = countries;
        console.warn(this.countries);
      });
  }

  log(data) {
    console.warn(data);
  }
  getCategories() {
    this._constantsService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.warn(this.categories);
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
  onSubmit(signUpForm: any) {
    this.submitted = true;
    // stop here if form is invalid
    /* if (this.signUpForm.invalid) {
      this.showLocationError = true;
      return;
    } */
    this.user = this.signUpForm.value;
    this.user.categories = this.signUpForm
      .get('categories')
      .value.map(({ id }) => id);
    console.warn(signUpForm.value);
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
