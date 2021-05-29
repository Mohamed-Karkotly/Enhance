import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryAPI } from 'src/app/models/API/country-api.interface';
import { Category } from 'src/app/models/entities/category.interface';
import { CategoryActions } from './actions/category';
import { CountryActions } from './actions/country';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  categoryActions: CategoryActions;
  countryActions: CountryActions;
  constructor(http: HttpClient) {
    this.categoryActions = new CategoryActions(http);
    this.countryActions = new CountryActions(http);
  }

  getCategories(): Observable<Category[]> {
    return this.categoryActions.readCategories();
  }

  getCountries(): Observable<CountryAPI[]> {
    return this.countryActions.readCountries();
  }
}
