import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CommunityActions } from './actions/community';
import { CommunitySearchActions } from './actions/community-search';
import { JoinCommunityActions } from './actions/join-community';
import { JoinedCommunityActions } from './actions/joined-communities';
import { LeaveCommunityActions } from './actions/leave-community';
import { OwnedCommunityActions } from './actions/owned-communities';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  communityActions: CommunityActions;
  ownedCommunitiesActions: OwnedCommunityActions;
  joinedCommunityActions: JoinedCommunityActions;
  searchCommunityActions: CommunitySearchActions;
  joinCommunityActions: JoinCommunityActions;
  leaveCommunityActions: LeaveCommunityActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
    this.ownedCommunitiesActions = new OwnedCommunityActions(http);
    this.joinedCommunityActions = new JoinedCommunityActions(http);
    this.searchCommunityActions = new CommunitySearchActions(http);
    this.joinCommunityActions = new JoinCommunityActions(http);
    this.leaveCommunityActions = new LeaveCommunityActions(http);
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

  getCommunitiesByName(label: string): Observable<any> {
    return this.searchCommunityActions.readCommunitiesByName(label);
  }

  getCommunitiesByCategory(categoryId: number): Observable<any> {
    return this.searchCommunityActions.readCommunitiesByCategory(
      `${categoryId}`
    );
  }

  postJoinCommunity(communityId: number): Observable<any> {
    return this.joinCommunityActions.createJoin(`${communityId}`);
  }

  deleteLeaveCommunity(communityId: number): Observable<any> {
    return this.leaveCommunityActions.deleteCommunity(`${communityId}`);
  }
}
