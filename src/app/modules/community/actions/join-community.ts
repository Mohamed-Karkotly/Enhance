import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/app/services/crud.service';

export class JoinCommunityActions extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'user/joinCommunity');
  }

  createJoin(communityId: string): Observable<any> {
    return this.createEntity(undefined, { communityId: communityId });
  }
}
