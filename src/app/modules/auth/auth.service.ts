import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/API/credentials.interface';
import { User } from 'src/app/models/entities/user.interface';
import { Login } from './actions/login';
import { SignUp } from './actions/sign-up';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginActoins: Login;
  signUpActions: SignUp;
  constructor(http: HttpClient) {
    this.loginActoins = new Login(http);
    this.signUpActions = new SignUp(http);
  }

  postLogin(credentials: Credentials): Observable<any> {
    return this.loginActoins.createLogin(credentials);
  }

  postSignUp(user: any): Observable<User> {
    return this.signUpActions.createSignUp(user);
  }
}
