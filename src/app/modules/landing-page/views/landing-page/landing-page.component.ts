import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RellaxService } from 'src/app/helpers/rellax';
import { LandingPageService } from '../../landing-page.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  rellax: RellaxService;
  data: Date = new Date();
  focus: boolean;
  focus1: boolean;
  feedbackForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _landingPageService: LandingPageService,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private _translate: TranslateService
  ) {}

  ngOnInit() {
    this.rellax = new RellaxService();
    this.initFeedback();
  }

  initFeedback() {
    this.feedbackForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  get form() {
    return this.feedbackForm.controls;
  }

  onSubmit(feedbackForm: any) {
    if (this.feedbackForm.invalid) {
      return; // stop here if form is invalid
    } else {
      this._spinner.show();
      this._landingPageService.postFeedback(feedbackForm.value).subscribe(
        () => {
          this._spinner.hide();
          let title = this._translate.instant('feedback.thanks');
          let feedback = this._translate.instant('feedback.sent');
          this._toastr.success(feedback, title);
          this.feedbackForm.reset();
        },
        //! component scope error handling
        (error: HttpErrorResponse) => {
          console.error(error);
          let title = this._translate.instant('feedback.oops');
          let feedback = this._translate.instant('feedback.failed');
          setTimeout(() => {
            this._spinner.hide();
            this._toastr.error(feedback, title);
          }, 5000);
        }
      );
    }
  }

  ngOnDestroy() {
    this.rellax.destroyRellaxAnimation();
  }
}
