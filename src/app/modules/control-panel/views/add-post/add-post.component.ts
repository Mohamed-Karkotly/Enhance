import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from 'src/app/models/entities/post.interface';
import { SubCategory } from 'src/app/models/entities/subcategory.interface';
import { User } from 'src/app/models/entities/user.interface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  post = {} as Post;
  owner = {} as User;
  subcategories: SubCategory[];
  postForm: FormGroup;
  imageSrc: any;
  image: any;
  subcategoryButtonContent: string;
  images: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _cpService: ControlPanelService,
    private _spinner: NgxSpinnerService,
    private _imageUploadService: ImageUploadService,
    private _errorService: ErrorHandlerService,
    private _toastService: ToastService
  ) {
    this.post.attachments = [];
    this.post.attachments[0] = '';
    this.subcategoryButtonContent = 'Subcategory';
    this.owner = this._storageService.getLocalObject('owner');
    this.subcategories =
      this._storageService.getLocalObject('community').subcategories;
    this.initPostForm();
  }

  ngOnInit(): void {}

  initPostForm() {
    this.postForm = this._formBuilder.group({
      userCommunityId: new FormControl(this.owner.settings.id),
      subCategoryId: new FormControl('', [Validators.required]),
      type: new FormControl(1, [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      isAnonymous: new FormControl(false, [Validators.required]),
      attachments: new FormControl(''),
    });
  }

  chooseSubcategory(subcategory: SubCategory) {
    this.subcategoryButtonContent = subcategory.name;
    this.postForm.controls.subCategoryId.setValue(subcategory.id);
  }

  uploadImage() {
    console.warn(this.post);
    this._spinner.show();
    this._imageUploadService.uploadImage(this.image).subscribe(
      (response: any) => {
        console.warn(response);
        let imageUrl = response.imageUrl;
        this.images.push(imageUrl);
        this.post.attachments = this.images;
        this.postPost(this.post);
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

  onSubmit() {
    this.post = this.postForm.value;
    this.image && this.uploadImage();
    !this.image && this.postPost(this.post);
  }

  postPost(post: Post) {
    this._spinner.show();
    this._cpService.postPost(post).subscribe(
      (res) => {
        console.warn(res);
        this._spinner.hide();
        this._toastService.showSuccess('toastr.done', 'toastr.posted');
      },
      (err) => {
        console.error(err);
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
