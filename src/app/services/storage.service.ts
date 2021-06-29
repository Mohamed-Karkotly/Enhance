import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  _tokenExist: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {
    if (this.getToken() !== null) {
      this._tokenExist.next(true);
    } else {
      this._tokenExist.next(false);
    }
  }

  watchStorage(): Observable<any> {
    return this._tokenExist.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._tokenExist.next(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    this._tokenExist.next(false);
  }

  setLocalObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalObject(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  removeLocalObject(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
