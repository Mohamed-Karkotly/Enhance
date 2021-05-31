import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/API/credentials.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class Login extends CRUDService<Credentials> {
  constructor(http: HttpClient) {
    super(http, 'auth');
  }

  createLogin(credentials: Credentials): Observable<any> {
    return this.createEntity(credentials);
  }
}
