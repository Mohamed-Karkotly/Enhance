import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostParams } from 'src/app/models/API/post-params.interface';
import { CommunityActions } from '../community/actions/community';
import { CommunityJoinActions } from './actions/community-join';
import { PendingRequestActions } from './actions/pending-request';
import { PostActions } from './actions/post';
import { UserActions } from './actions/user';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelService {
  communityActions: CommunityActions;
  userActions: UserActions;
  pendingRequestsActions: PendingRequestActions;
  communityJoinActions: CommunityJoinActions;
  postActions: PostActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
    this.userActions = new UserActions(http);
    this.pendingRequestsActions = new PendingRequestActions(http);
    this.communityJoinActions = new CommunityJoinActions(http);
    this.postActions = new PostActions(http);
  }

  getCommunityById(id: number): Observable<any> {
    return this.communityActions.readCommunity(`${id}`);
  }

  updateCommunity(community: any): Observable<any> {
    return this.communityActions.updateCommunity(community);
  }

  updateUser(user: any): Observable<any> {
    return this.userActions.updateUser(user);
  }

  getPendingRequests(communityId: number): Observable<any> {
    return this.pendingRequestsActions.readPendingRequests(`${communityId}`);
  }

  postJoinState(userCommunityId: number, state: string): Observable<any> {
    return this.communityJoinActions.createJoinState(
      `${userCommunityId}`,
      state
    );
  }

  getAllPosts(params: PostParams): Observable<any> {
    return this.postActions.readAllPosts(params);
  }

  getPostsBySubcategory(params: PostParams): Observable<any> {
    return this.postActions.readPosts(params);
  }
}
