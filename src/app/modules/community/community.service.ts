import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CommunityActions } from './actions/community';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  communityActions: CommunityActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
  }

  postCommunity(community: Community): Observable<any> {
    return this.communityActions.createCommunity(community);
  }
}
