import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostParams } from 'src/app/models/API/post-params.interface';
import { Post } from 'src/app/models/entities/post.interface';
import { CommunityActions } from '../community/actions/community';
import { CommunityJoinActions } from './actions/community-join';
import { DeleteMemberActions } from './actions/delete-member';
import { PendingRequestActions } from './actions/pending-request';
import { PostActions } from './actions/post';
import { UserActions } from './actions/user';
import { UserSettingsActions } from './actions/user-settings';
import { VoteActions } from './actions/vote';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelService {
  communityActions: CommunityActions;
  userActions: UserActions;
  pendingRequestsActions: PendingRequestActions;
  communityJoinActions: CommunityJoinActions;
  postActions: PostActions;
  userSettingsActions: UserSettingsActions;
  voteActions: VoteActions;
  deleteMemberActions: DeleteMemberActions;
  constructor(http: HttpClient) {
    this.communityActions = new CommunityActions(http);
    this.userActions = new UserActions(http);
    this.pendingRequestsActions = new PendingRequestActions(http);
    this.communityJoinActions = new CommunityJoinActions(http);
    this.postActions = new PostActions(http);
    this.userSettingsActions = new UserSettingsActions(http);
    this.voteActions = new VoteActions(http);
    this.deleteMemberActions = new DeleteMemberActions(http);
  }

  getCommunityById(id: number): Observable<any> {
    return this.communityActions.readCommunity(`${id}`);
  }

  updateCommunity(community: any): Observable<any> {
    return this.communityActions.updateCommunity(community);
  }

  getUserById(id: any): Observable<any> {
    return this.userActions.readUser(id);
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

  postPost(post: Post): Observable<any> {
    return this.postActions.createPost(post);
  }

  putUserSettings(
    communityId: number,
    userId: number,
    priority: number
  ): Observable<any> {
    return this.userSettingsActions.updateUserSettings(
      communityId,
      userId,
      priority
    );
  }

  deletePost(
    postId: number,
    communityId: number,
    userCommunityId: number
  ): Observable<any> {
    return this.postActions.deletePost(
      `${postId}`,
      `${communityId}`,
      `${userCommunityId}`
    );
  }

  postUpVote(postId: number, userCommunityId: number): Observable<any> {
    return this.voteActions.createVote(postId, userCommunityId, 1);
  }

  postDownVote(postId: number, userCommunityId: number): Observable<any> {
    return this.voteActions.createVote(postId, userCommunityId, -1);
  }

  postResetVote(postId: number, userCommunityId: number): Observable<any> {
    return this.voteActions.createVote(postId, userCommunityId, 0);
  }

  deleteMember(userCommunityId: string): Observable<any> {
    return this.deleteMemberActions.deleteMember(userCommunityId);
  }
}
