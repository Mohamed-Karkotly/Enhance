import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/models/entities/user.interface";
import { CRUDService } from "src/app/services/crud.service";

export class SignUp  extends CRUDService<User>{
  constructor(http: HttpClient) {
    super(http, 'auth/signUp');
  }

  createSignUp(user: User): Observable<User> {
    return this.createEntity(user);
  }
}
