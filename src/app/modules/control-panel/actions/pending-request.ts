import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/entities/user.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class PendingRequestActions extends CRUDService<User> {
  constructor(http: HttpClient) {
    super(http, 'community/pendingRequests');
  }

  readPendingRequests(communityId: string): Observable<User[]> {
    return this.readEntities({ communityId: communityId });
  }
}
