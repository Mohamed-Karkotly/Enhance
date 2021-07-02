import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/app/services/crud.service';

export class UserActions extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'user');
  }

  updateUser(user: any): Observable<any> {
    return this.updateEntity(user);
  }

  readUser(id: string): Observable<any> {
    return this.readEntity({ id: id });
  }
}
