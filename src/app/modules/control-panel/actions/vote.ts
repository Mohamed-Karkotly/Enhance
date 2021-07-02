import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/app/services/crud.service';

export class VoteActions extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'posts/vote');
  }

  createVote(
    postId: number,
    userCommunityId: number,
    voteValue: number
  ): Observable<any> {
    return this.createEntity({
      postId: postId,
      userCommunityId: userCommunityId,
      voteValue: voteValue,
    });
  }
}
