import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostParams } from 'src/app/models/API/post-params.interface';
import { Post } from 'src/app/models/entities/post.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class PostActions extends CRUDService<Post> {
  constructor(http: HttpClient) {
    super(http, 'posts');
  }

  createPost(post: Post): Observable<any> {
    return this.createEntity(post);
  }

  readAllPosts(params: PostParams): Observable<any[]> {
    return this.readEntities({
      communityId: params.communityId,
      userCommunityId: params.userCommunityId,
    });
  }

  readPosts(params: PostParams): Observable<any[]> {
    return this.readEntities({
      communityId: params.communityId,
      userCommunityId: params.userCommunityId,
      subCategoryId: params.subCategoryId,
    });
  }
}
