import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  insertValue(key:string, value:any) {
    localStorage.setItem(key, value);
  }

  getValue(key:string): any {
    return localStorage.getItem(key);
  }

  removeValue(key:string) {
    localStorage.removeItem(key);
  }

  clearAll(){
    localStorage.clear();
  }
}
