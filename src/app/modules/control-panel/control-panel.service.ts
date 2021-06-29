import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CommunityActions } from '../community/actions/community';
import { UserActions } from './actions/user';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelService {
  communityActions: CommunityActions;
  userActions: UserActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
    this.userActions = new UserActions(http);
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
}
