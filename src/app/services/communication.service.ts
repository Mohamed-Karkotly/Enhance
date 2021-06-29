import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private _userSubject = new Subject<any>();
  private _communitySubject = new Subject<any>();

  constructor() {}

  sendCommunityData(data: any) {
    this._communitySubject.next(data);
  }

  sendUserData(data: any) {
    this._userSubject.next(data);
  }

  getCommunityData(): Observable<any> {
    return this._communitySubject.asObservable();
  }

  getUserData(): Observable<any> {
    return this._userSubject.asObservable();
  }

  clear() {
    this._communitySubject.next();
    this._userSubject.next();
  }
}
