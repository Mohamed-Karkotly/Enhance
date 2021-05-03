import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
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
}
