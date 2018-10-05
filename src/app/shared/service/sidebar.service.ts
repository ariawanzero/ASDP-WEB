import { Injectable } from '@angular/core';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class SidebarService {
  private currentStat: boolean = false;

  toggleMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.currentStat);

  constructor() { }

  toogleOnOff(): void {
    this.currentStat = !this.currentStat;
    this.toggleMenu.next(this.currentStat);
  }

  toogleOff(): void {
    this.currentStat = false;
    this.toggleMenu.next(this.currentStat);
  }

  listenStatus(): Observable<boolean> {
    return this.toggleMenu.asObservable();
  }
}
