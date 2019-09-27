import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor(  ) { }

  get(key) {
    return localStorage.getItem(key) || '{}';
  }

  set(key, value) {
    localStorage.setItem(key, value);
  }

  setObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key) {
    localStorage.removeItem(key);
  }
}
