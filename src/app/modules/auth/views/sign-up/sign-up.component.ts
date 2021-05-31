import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
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
    private _translate: TranslateService,
    private _spinner: NgxSpinnerService,
    private _imageUploadService: ImageUploadService,
    private _authService: AuthService
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
    /* this.submitted = true;
    if (!this.validateForm()) return; // stop here if form is invalid
    this.initUser(); */
    this.image && this.uploadImage();
    //this.signUp();
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
      (res: any) => {
        this.signUpForm.controls.progileImage.setValue(res.imageUrl);
        console.warn(res);
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  signUp() {
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
    const reader = new FileReader();
    const type = event.target.files[0].type;
    if (type.match(/image\/*/) == null) {
      return;
    }
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
      };
    }
  }
}
