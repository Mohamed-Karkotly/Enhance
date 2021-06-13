import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/entities/feedback.interface';
import { FeedbackActions } from './actions/feedback';

@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  feedbackActions: FeedbackActions;
  constructor(http: HttpClient) {
    this.feedbackActions = new FeedbackActions(http);
  }

  postFeedback(feedback: Feedback): Observable<any> {
    return this.feedbackActions.createFeedback(feedback);
  }
}
