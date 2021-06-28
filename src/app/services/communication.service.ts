import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private _subject = new Subject<any>();

  constructor() {}

  sendData(data: any) {
    this._subject.next(data);
  }

  getData(): Observable<any> {
    return this._subject.asObservable();
  }

  clear() {
    this._subject.next();
  }
}
