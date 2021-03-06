import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class CommunityActions extends CRUDService<Community> {
  constructor(http: HttpClient) {
    super(http, 'community');
  }

  createCommunity(community: Community): Observable<Community> {
    return this.createEntity(community);
  }

  readCommunity(communityId: string): Observable<Community> {
    return this.readEntity({ communityId });
  }

  updateCommunity(community: any): Observable<any> {
    return this.updateEntity(community);
  }
  deleteCommunity(communityId: string): Observable<Community> {
    return this.deleteEntity({ communityId });
  }
}
