import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CRUDService } from 'src/app/services/crud.service';

export class UserSettingsActions extends CRUDService<any> {
  constructor(http: HttpClient) {
    super(http, 'community/userSettings');
  }

  updateUserSettings(
    communityId: number,
    userId: number,
    priority: number
  ): Observable<any> {
    return this.updateEntity({
      communityId: communityId,
      userId: userId,
      priority: priority,
    });
  }
}
