import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/models/entities/feedback.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class FeedbackActions extends CRUDService<Feedback> {
  constructor(http: HttpClient) {
    super(http, 'constants/feedback');
  }

  createFeedback(feedback: Feedback): Observable<Feedback> {
    return this.createEntity(feedback);
  }
}
