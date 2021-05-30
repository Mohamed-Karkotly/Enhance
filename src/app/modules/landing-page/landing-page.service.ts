import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/API/credentials.interface';
import { Feedback } from 'src/app/models/entities/feedback.interface';
import { User } from 'src/app/models/entities/user.interface';
import { FeedbackActions } from './actions/feedback';
import { Login } from './actions/login';
import { SignUp } from './actions/sign-up';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  feedbackActions: FeedbackActions;
  loginActoins: Login;
  signUpActions: SignUp;
  constructor(http: HttpClient) {
    this.loginActoins = new Login(http);
    this.signUpActions = new SignUp(http);
    this.feedbackActions = new FeedbackActions(http);
  }

  postLogin(credentials: Credentials): Observable<any> {
    return this.loginActoins.createLogin(credentials);
  }

  postSignUp(user: User): Observable<User> {
    return this.signUpActions.createSignUp(user);
  }

  postFeedback(feedback: Feedback): Observable<any> {
    return this.feedbackActions.createFeedback(feedback);
  }
}
