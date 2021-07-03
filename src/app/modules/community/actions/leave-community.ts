import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class LeaveCommunityActions extends CRUDService<Community> {
  constructor(http: HttpClient) {
    super(http, 'user/leaveCommunity');
  }

  deleteCommunity(communityId: string): Observable<any> {
    return this.deleteEntity({ communityId: communityId });
  }
}
