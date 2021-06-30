import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunityActions } from '../community/actions/community';
import { PendingRequestActions } from './actions/pending-request';
import { UserActions } from './actions/user';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelService {
  communityActions: CommunityActions;
  userActions: UserActions;
  pendingRequestsActions: PendingRequestActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
    this.userActions = new UserActions(http);
    this.pendingRequestsActions = new PendingRequestActions(http);
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
}
