import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/entities/feedback.interface';
import { LandingPage } from './actions/landing-page';
import { Login } from './actions/login';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  landingPageActions: LandingPage;
  loginActoins: Login;
  constructor(http: HttpClient) {
    this.landingPageActions = new LandingPage(http);
    this.loginActoins = new Login(http);
  }

  postFeedback(feedback: Feedback) : Observable<Feedback> {
    return this.landingPageActions.createFeedback(feedback);
  }
}
