import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { Category } from 'src/app/models/entities/category.interface';
import { City } from 'src/app/models/entities/city.interface';
import { User } from 'src/app/models/entities/user.interface';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { StorageService } from 'src/app/services/storage.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  userId: number;
  communityId: number;
  priority: number;
  userForm: FormGroup;
  user: User;
  categories: Category[];
  loaded: boolean;
  //Buttons content
  countriesButtonContent: string;
  citiesButtonContent: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _sharedService: SharedService,
    private _spinner: NgxSpinnerService,
    private _cpService: ControlPanelService,
    private _storageService: StorageService
  ) {
    this.getIdParam();
    this.communityId = this._storageService.getLocalObject('community').id;
    console.warn(this.communityId);
  }

  ngOnInit() {
    this.getUserById();
  }

  getIdParam() {
    this._activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
      this.priority = params.priority;
    });
  }

  getUserById() {
    this._spinner.show();
    this._cpService.getUserById(this.userId).subscribe((res) => {
      this.user = res;
      console.warn(this.user);

      this.initSignUpForm();
      this.citiesButtonContent = this.user.city.name;
      this.countriesButtonContent = this.user.city.country.name;
      this.loaded = true;
      this._spinner.hide();
    });
  }

  initSignUpForm() {
    this.userForm = this._formBuilder.group({
      firstName: new FormControl({
        value: this.user.firstName,
        disabled: true,
      }),
      lastName: new FormControl({ value: this.user.lastName, disabled: true }),
      email: new FormControl({ value: this.user.email, disabled: true }),
      age: new FormControl({ value: this.user.age, disabled: true }, []),
      phone: new FormControl({ value: this.user.phone, disabled: true }, []),
      profession: new FormControl({
        value: this.user.profession,
        disabled: true,
      }),
      cityId: new FormControl({ value: this.user.city, disabled: true }, []),
      categories: new FormControl({ value: '', disabled: true }, []),
      bio: new FormControl({ value: this.user.bio, disabled: true }),
      invitationOption: new FormControl({
        value: this.user.invitationOption,
        disabled: true,
      }),
      profileImage: new FormControl({
        value: this.user.profileImage,
        disabled: true,
      }),
    });
  }

  getCategories() {
    this._sharedService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    console.warn(+this.communityId, +this.userId, +this.priority);
    this._spinner.show();
    this._cpService
      .putUserSettings(+this.communityId, +this.userId, +this.priority)
      .subscribe((res) => {
        console.warn(res);
        this._spinner.hide();
      });
  }
}
