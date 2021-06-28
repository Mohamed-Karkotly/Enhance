import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CommunityActions } from './actions/community';
import { JoinedCommunityActions } from './actions/joined-communities';
import { OwnedCommunityActions } from './actions/owned-communities';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  communityActions: CommunityActions;
  ownedCommunitiesActions: OwnedCommunityActions;
  joinedCommunityActions: JoinedCommunityActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
    this.ownedCommunitiesActions = new OwnedCommunityActions(http);
    this.joinedCommunityActions = new JoinedCommunityActions(http);
  }

  postCommunity(community: Community): Observable<any> {
    return this.communityActions.createCommunity(community);
  }

  deleteCommunity(id: number): Observable<any> {
    return this.communityActions.deleteCommunity(`${id}`);
  }

  updateCommunity(community: any): Observable<any> {
    return this.communityActions.updateCommunity(community);
  }
  getOwnedCommunities(): Observable<any> {
    return this.ownedCommunitiesActions.readCommunities();
  }

  getJoinedCommunities(): Observable<any> {
    return this.joinedCommunityActions.readCommunities();
  }
}
