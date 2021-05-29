import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class CountryActions extends CRUDService<CountryAPI> {
  constructor(http: HttpClient) {
    super(http, 'constants/countries');
  }

  readCountries(): Observable<CountryAPI[]> {
    return this.readEntities();
  }
}
