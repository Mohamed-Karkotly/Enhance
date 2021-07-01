import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/entities/category.interface';
import { CommunityService } from 'src/app/modules/community/community.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-community-profile',
  templateUrl: './community-profile.component.html',
  styleUrls: ['./community-profile.component.scss'],
})
export class CommunityProfileComponent implements OnInit {
  loaded: boolean;
  communityId: number;
  communityForm: FormGroup;
  submitted: boolean; //Form submession for validation
  image: any;
  imageSrc: any;
  community: any;
  currentCommunity: any;
  copy: any = {};
  //API Requests to be stored in the following interfaces
  categories: Category[];
  subCategories: any[];
  subCategoriesCopy: any[] = [];
  categoriesButtonContent: string;
  showCategoryError: boolean;
  showSubcategoryError: boolean;
  deletedSubcategories: any[] = [];
  addedSubcategories: any[] = [];
  updatedSubcategories: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cpService: ControlPanelService,
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private _sharedService: SharedService,
    private _imageUploadService: ImageUploadService,
    private _toastService: ToastService,
    private _spinner: NgxSpinnerService,
    private _errorService: ErrorHandlerService,
    private _translate: TranslateService,
    private _communicationService: CommunicationService,
    private _storageService: StorageService
  ) {
    this.subCategories = [];
    this.categoriesButtonContent = this._translate.instant('form.category');
    this.getIdParam();
    this.constructCommunityForm();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getIdParam() {
    this._activatedRoute.params.subscribe((params) => {
      this.communityId = params['id'];
    });
  }

  constructCommunityForm() {
    this._cpService
      .getCommunityById(this.communityId)
      .subscribe((community: any) => {
        this.copy.imageSrc = community.coverImage;
        this.copy.subCategories = community.subcategories;
        this.copy.categoriesButtonContent = community.category.name;
        this.copy.subCategoriesCopy = community.subcategories;
        this.imageSrc = community.coverImage;
        this.currentCommunity = community;
        this.subCategories = community.subcategories;
        this.subCategoriesCopy = community.subcategories;
        console.warn(community);
        this.categoriesButtonContent = community.category.name;
        this.initCommunityForm();
        this.loaded = true;
        this._communicationService.sendCommunityData(community);
        this._storageService.setLocalObject('community', community);
      });
  }

  initCommunityForm() {
    this.communityForm = this._formBuilder.group({
      image: new FormControl(this.currentCommunity.coverImage),
      label: new FormControl(this.currentCommunity.label, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      description: new FormControl(this.currentCommunity.description),
      categoryId: new FormControl(this.currentCommunity.category.id, [
        Validators.required,
      ]),
      subCategories: new FormControl(this.currentCommunity.subCategories, [
        Validators.required,
      ]),
    });
  }

  initialize() {
    this.initCommunityForm();
    this.imageSrc = this.copy.imageSrc;
    this.subCategories = this.subCategoriesCopy;
    this.categoriesButtonContent = this.copy.categoriesButtonContent;
  }
  get form() {
    return this.communityForm.controls;
  }

  getCategories() {
    this._spinner.show();
    this._sharedService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        setTimeout(() => {
          this._spinner.hide();
        }, 700);
      },
      (err) => {
        if (this._errorService.checkConnectionError(err)) {
          this._toastService.showWarning('toastr.warning', 'toastr.lost');
        }
      }
    );
  }

  addSubcategory(event: MatChipInputEvent): void {
    let subCategory: any = {};
    const value = (event.value || '').trim();
    if (value) {
      this.showSubcategoryError = false;
      if (!this.subCategories.includes(value)) {
        subCategory.id = -1;
        subCategory.name = event.value;
        this.subCategories.push(subCategory);
        this.addedSubcategories.push(subCategory.name);
      }
    }
  }

  removeSubcategory(subcategory: any): void {
    const index = this.subCategories.indexOf(subcategory);
    if (index >= 0) {
      if (this.subCategoriesCopy.some((s) => s.id === subcategory.id)) {
        this.deletedSubcategories.push(this.subCategories[index]);
        this.subCategories.splice(index, 1);
      }
      if (subcategory.id === -1) {
        this.deletedSubcategories.splice(
          this.deletedSubcategories.indexOf(subcategory)
        );
        this.addedSubcategories.splice(
          this.addedSubcategories.indexOf(subcategory)
        );
      }
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
    !this.image && this.updateCommunity();
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
    this.community.updatedSubcategories = [];
    this.community.deletedSubcategories = this.deletedSubcategories.map(
      ({ id }) => id
    );
    this.community.addedSubcategories = this.addedSubcategories;
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
        this.updateCommunity();
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

  updateCommunity() {
    let finalCommunity = this.assignParameters();
    this._spinner.show();
    this._communityService.updateCommunity(finalCommunity).subscribe(
      (res) => {
        this._spinner.hide();
        this._toastService.showSuccess(
          'toastr.done',
          'toastr.communityUpdated'
        );
        let copy: any = finalCommunity;
        copy.category = this.categories.filter(
          (x) => x.id === finalCommunity.categoryId
        );
        copy.category = copy.category[0];
        copy.coverImage = copy.image;
        copy.communityId = this.communityId;
        this._communicationService.sendCommunityData(copy);
        this._storageService.setLocalObject('community', copy);
      },
      (err) => {
        this._spinner.hide();
        console.error(err.error);
        if (this._errorService.handleError(err)) {
          return;
        }
      }
    );
  }

  assignParameters() {
    let finalCommunity: any = {};
    finalCommunity.categoryId = this.communityForm.controls['categoryId'].value;
    finalCommunity.label = this.communityForm.controls['label'].value;
    finalCommunity.communityId = +this.communityId;
    finalCommunity.description =
      this.communityForm.controls['description'].value;
    finalCommunity.updatedSubcategories = [];
    finalCommunity.deletedSubcategories = this.deletedSubcategories.map(
      ({ id }) => id
    );
    finalCommunity.addedSubcategories = this.addedSubcategories;
    finalCommunity.image = this.community.image;
    return finalCommunity;
  }
}
