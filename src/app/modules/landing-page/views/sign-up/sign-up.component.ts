import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageSnippet } from 'src/app/helper-classes/image-snippet';
import { User } from 'src/app/models/entities/user.interface';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  imageSnippet: ImageSnippet;
  generalInfo: FormGroup;
  constructor(
    private _imageService: ImageService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.generalInfo = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      profession: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  processFile(imageInput: any) {
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
  }
}
