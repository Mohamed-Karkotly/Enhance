import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CommunityActions } from '../community/actions/community';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelService {
  communityActions: CommunityActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
  }

  getCommunityById(id: number): Observable<any> {
    return this.communityActions.readCommunity(`${id}`);
  }

  updateCommunity(community: any) {
    return this.communityActions.updateCommunity(community);
  }
}
