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

  createEntity(body: T, query?: { [key: string]: string }): Observable<T> {
    const params = new HttpParams({ fromObject: query });
    return this.http.post<T>(this.apiURL, body, { params });
  }

  readEntities(query?: { [key: string]: string }): Observable<T[]> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<T[]>(this.apiURL, { params });
  }

  readEntity(query?: { [key: string]: string }): Observable<T> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<T>(this.apiURL, { params });
  }

  updateEntity(body: T): Observable<T> {
    return this.http.put<T>(this.apiURL, body);
  }

  deleteEntity(query?: { [key: string]: string }): Observable<T> {
    const params = new HttpParams({ fromObject: query });
    return this.http.delete<T>(this.apiURL, { params });
  }

  protected entityUrl(id: number): string {
    return [this.apiURL, id].join('/');
  }
}
