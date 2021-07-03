import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/app/services/crud.service';

export class DeleteMemberActions extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'community/member');
  }

  deleteMember(userCommunityId: string): Observable<any> {
    return this.deleteEntity({ userCommunityId: userCommunityId });
  }
}
