import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class CRUDService<T> {
  protected readonly apiURL: string;
  constructor(
    private http: HttpClient,
    protected readonly route: string,
    protected readonly baseURL: string = environment.baseURL
  ) {
    this.apiURL = `${this.baseURL}/${this.route}`;
  }

  createEntity(body: T): Observable<T> {
    return this.http.post<T>(this.apiURL, body);
  }

  readEntities(query?: { [key: string]: string }): Observable<T[]> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<T[]>(this.apiURL, { params });
  }

  readEntity(id: number): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.get<T>(url);
  }

  updateEntity(id: number, body: T): Observable<T> {
    const url = this.entityUrl(id);
    return this.http.put<T>(url, body);
  }

  deleteEntity(query?: { [key: string]: string }): Observable<T> {
    const params = new HttpParams({ fromObject: query });
    return this.http.delete<T>(this.apiURL, {params});
  }

  protected entityUrl(id: number): string {
    return [this.apiURL, id].join('/');
  }
}
