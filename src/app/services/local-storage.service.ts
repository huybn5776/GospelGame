import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isObject } from 'util';

import { isEmpty, isNil, pipe } from 'ramda';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  watchData<T>(observable: Observable<T>): void {
    observable.subscribe(this.setObject, console.error);
  }

  get<T>(key: string): T {
    return pipe(
      k => localStorage.getItem(k),
      JSON.parse,
    )(key) as T;
  }

  set<T>(key: string, value: T): T {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  setObject(obj: any) {
    if (!isObject(obj)) {
      return;
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (isNil(obj)) {
        localStorage.removeItem(key);
      }
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  update<T>(key: string, updateFunc: (value: T) => any): T {
    const currentValue = this.get<T>(key);
    const updatedValue = updateFunc(currentValue);
    const finalValue = <T>(isEmpty(updatedValue) ? currentValue : updatedValue);
    return this.set(key, finalValue);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
