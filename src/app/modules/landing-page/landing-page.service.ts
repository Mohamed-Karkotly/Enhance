import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { Feedback } from 'src/app/models/entities/feedback.interface';
import { CommunityActions } from './actions/community';
import { FeedbackActions } from './actions/feedback';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  feedbackActions: FeedbackActions;
  communityActions: CommunityActions;
  constructor(http: HttpClient) {
    this.feedbackActions = new FeedbackActions(http);
    this.communityActions = new CommunityActions(http);
  }

  postFeedback(feedback: Feedback): Observable<any> {
    return this.feedbackActions.createFeedback(feedback);
  }

  postCommunity(community: Community): Observable<any> {
    return this.communityActions.createCommunity(community);
  }
}
