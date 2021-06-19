import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';
import { LandingPageService } from '../../landing-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: Date = new Date();
  focus: boolean;
  focus1: boolean;
  feedbackForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _landingPageService: LandingPageService,
    private _spinner: NgxSpinnerService,
    private _toastService: ToastService
  ) {}

  ngOnInit() {
    this.initFeedback();
    this._spinner.hide();
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
          this._toastService.showSuccess(
            'toastr.thanks',
            'toastr.feedback-sent'
          );
          this.feedbackForm.reset();
        },
        () => {
          this._toastService.showError('toastr.oops', 'toastr.feedback-failed');
        }
      );
    }
  }
}
