import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/entities/category.interface';
import { Community } from 'src/app/models/entities/community.interface';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { CommunityService } from '../../community.service';
@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
})
export class CreateCommunityComponent implements OnInit {
  communityForm: FormGroup;
  submitted: boolean; //Form submession for validation
  image: any;
  imageSrc: any;
  community: Community;
  //API Requests to be stored in the following interfaces
  categories: Category[];
  subCategories: string[];
  categoriesButtonContent: string;
  showCategoryError: boolean;
  showSubcategoryError: boolean;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private _sharedService: SharedService,
    private _imageUploadService: ImageUploadService,
    private _router: Router,
    private _toastService: ToastService,
    private _spinner: NgxSpinnerService,
    private _errorService: ErrorHandlerService,
    private _translate: TranslateService
  ) {
    this.subCategories = [];
    this.categoriesButtonContent = this._translate.instant('form.category');
  }

  ngOnInit(): void {
    this.initCommunityForm();
    this.getCategories();
  }

  initCommunityForm() {
    this.communityForm = this._formBuilder.group({
      image: new FormControl(''),
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      description: new FormControl(''),
      categoryId: new FormControl('', [Validators.required]),
      subCategories: new FormControl('', [Validators.required]),
    });
  }

  get form() {
    return this.communityForm.controls;
  }

  getCategories() {
    this._spinner.show();
    this._sharedService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this._spinner.hide();
      },
      (err) => {
        if (this._errorService.checkConnectionError(err)) {
          this._toastService.showWarning('toastr.warning', 'toastr.lost');
        }
      }
    );
  }

  addSubcategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.showSubcategoryError = false;
      if (!this.subCategories.includes(value)) {
        this.subCategories.push(value);
      }
    }
  }

  removeSubcategory(subcategory: string): void {
    const index = this.subCategories.indexOf(subcategory);

    if (index >= 0) {
      this.subCategories.splice(index, 1);
    }
  }

  chooseCategory(category: Category) {
    this.categoriesButtonContent = category.name;
    this.communityForm.controls.categoryId.setValue(category.id);
    this.showCategoryError = false;
  }

  onSubmit() {
    this.communityForm.controls.subCategories.setValue(this.subCategories);
    this.submitted = true;
    if (!this.validateForm()) return; // stop here if form is invalid
    this.initCommunityCategory();
    this.image && this.uploadImage();
    !this.image && this.signUpCommunity();
  }

  validateForm() {
    if (this.communityForm.invalid) {
      if (this.communityForm.controls.categoryId.invalid) {
        this.showCategoryError = true;
      }
      if (this.communityForm.controls.subCategories.invalid) {
        this.showSubcategoryError = true;
      }
      return false;
    } else {
      return true;
    }
  }

  initCommunityCategory() {
    this.community = this.communityForm.value;
    this.community.subCategories = this.subCategories;
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
        this.community.image = imageUrl;
        this.signUpCommunity();
      },
      (err) => {
        if (this._errorService.handleError(err)) {
          return;
        }
        console.error(err.error);
        this._toastService.showWarning('toastr.oops', 'toastr.image');
      }
    );
  }

  //TODO: Check that the spinner hides after signingup cmmunity with an image (Also in signUp)
  signUpCommunity() {
    this._spinner.show();
    this._communityService.postCommunity(this.community).subscribe(
      (res) => {
        this._spinner.hide();
        this._toastService.showSuccess(
          'toastr.done',
          'toastr.communityCreated'
        );
        this.communityForm.reset();
      },
      (err) => {
        console.error(err);
        if (this._errorService.handleError(err)) {
          return;
        }
        /**
         * TODO: Check errors from backend
         */
        /* if (err.error.errors[0].param === 'email') {
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
        } */
      }
    );
  }
}
