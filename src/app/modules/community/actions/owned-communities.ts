import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Community } from "src/app/models/entities/community.interface";
import { CRUDService } from "src/app/services/crud.service";

export class OwnedCommunityActions extends CRUDService<Community> {
  constructor(http: HttpClient) {
    super(http, 'user/ownedCommunities');
  }

  readCommunities(): Observable<Community[]> {
    return this.readEntities();
  }
}
