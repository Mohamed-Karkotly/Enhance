import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { UpdatedUser } from 'src/app/models/API/updated-user';
import { Category } from 'src/app/models/entities/category.interface';
import { City } from 'src/app/models/entities/city.interface';
import { User } from 'src/app/models/entities/user.interface';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { RegExService } from 'src/app/services/reg-ex.service';
import { StorageService } from 'src/app/services/storage.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  updatedUser = {} as UpdatedUser;
  signUpForm: FormGroup;
  submitted: boolean; //Form submession for validation
  image: any;
  imageSrc: any;
  //API Requests to be stored in the following interfaces
  categories: Category[];
  countries: CountryAPI[];
  categoriesCopy: number[];
  categoriesFullCopy: any[];
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
    private _cpService: ControlPanelService,
    private _storageService: StorageService,
    private _communicationService: CommunicationService
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
    this.imageSrc = this.currentUser.profileImage;
    this.updatedUser.city = this.currentUser.city;
    this.updatedUser.phone = this.currentUser.phone;
    this.updatedUser.email = this.currentUser.email;
    this.categoriesCopy = this.currentUser.categories.map(({ id }) => id);
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
      email: new FormControl(
        { value: this.currentUser.email, disabled: true },
        [Validators.required, Validators.pattern(this._regexService.email)]
      ),
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
    this.updatedUser.city.country.name = country.name;
    this.countriesButtonContent = country.name;
    this.cities = country.cities;
    this.citiesButtonContent = this._translate.instant('form.city');
    this.signUpForm.controls.cityId.setValue('');
  }

  chooseCity(city: City) {
    this.updatedUser.city.name = city.name;
    this.updatedUser.city.id = city.id;
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
    // If no changes, cancel form submition
    if (!hasChanges) {
      return;
    }
    this.initUser();
    this.image && this.uploadImage();
    !this.image && this.updateUser();
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
    this.categoriesFullCopy = this.user.categories;
    this.user.categories = this.signUpForm
      .get('categories')
      .value.map(({ id }) => id);
    this.assignUpdatedUser();
  }
  assignUpdatedUser() {
    this.updatedUser.firstName = this.user.firstName;
    this.updatedUser.lastName = this.user.lastName;
    this.updatedUser.bio = this.user.bio;
    this.updatedUser.profession = this.user.profession;
    this.updatedUser.phone = this.user.phone;
    this.updatedUser.age = this.user.age;
    this.updatedUser.profileImage = this.user.profileImage;
    this.updatedUser.cityId = this.form['cityId'].value.id;
    this.updatedUser.invitationOption = this.user.invitationOption;
    this.updatedUser.deletedCategories = this.categoriesCopy.filter(function (
      e
    ) {
      return this.indexOf(e) < 0;
    },
    this.user.categories);
    this.updatedUser.addedCategories = this.user.categories.filter(
      (category) => !this.categoriesCopy.includes(category)
    );
  }
  uploadImage() {
    this._spinner.show();
    this._imageUploadService.uploadImage(this.image).subscribe(
      (res: any) => {
        //this.signUpForm.controls.progileImage.setValue(imageUrl);
        this.updatedUser.profileImage = res.imageUrl;
        this.imageSrc = res.imageUrl;
        this.updateUser();
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  updateUser() {
    this._spinner.show();
    this._cpService.updateUser(this.updatedUser).subscribe(
      (res) => {
        let finalUser: any = {};
        finalUser.id = this.currentUser.id;
        finalUser.firstName = this.updatedUser.firstName;
        finalUser.lastName = this.updatedUser.lastName;
        finalUser.bio = this.updatedUser.bio;
        finalUser.profession = this.updatedUser.profession;
        finalUser.invitationOption = this.updatedUser.invitationOption;
        finalUser.profileImage = this.imageSrc;
        finalUser.age = this.updatedUser.age;
        finalUser.categories = this.categoriesFullCopy;
        finalUser.city = this.updatedUser.city;
        finalUser.cityId = finalUser.city.id;
        finalUser.email = this.updatedUser.email;
        finalUser.phone = this.updatedUser.phone;
        7;
        this.categories = this.categoriesFullCopy;
        this.currentUser.categories = this.categories;
        console.warn(finalUser);
        this._storageService.setLocalObject('user', finalUser);
        this._communicationService.sendUserData(finalUser);

        console.warn(res);
        this._spinner.hide();
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
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
      this.image = event.target.files.item(0);
    }
  }
}
