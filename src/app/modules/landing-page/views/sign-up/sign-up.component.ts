import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/entities/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  translatedKey: any;
  generalInfo: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

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
}
