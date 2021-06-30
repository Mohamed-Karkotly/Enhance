import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/app/services/crud.service';

export class CommunityJoinActions extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'community/joinState');
  }

  createJoinState(userCommunityId: string, state: string): Observable<any> {
    return this.createEntity(undefined, {
      userCommunityId: userCommunityId,
      state: state,
    });
  }
}
