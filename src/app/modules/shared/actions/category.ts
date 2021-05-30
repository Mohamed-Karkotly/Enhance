import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/entities/category.interface';
import { CRUDService } from 'src/app/services/crud.service';

export class CategoryActions extends CRUDService<Category> {
  constructor(http: HttpClient) {
    super(http, 'constants/categories');
  }

  readCategories(): Observable<Category[]> {
    return this.readEntities();
  }
}
