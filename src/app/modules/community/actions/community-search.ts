import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Community } from 'src/app/models/entities/community.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class CommunitySearchActions extends CRUDService<Community> {
  constructor(http: HttpClient) {
    super(http, 'community/search');
  }

  readCommunitiesByName(label: string): Observable<Community[]> {
    return this.readEntities({ label: label });
  }

  readCommunitiesByCategory(categoryId: string): Observable<Community[]> {
    return this.readEntities({ categoryId: categoryId });
  }
}
