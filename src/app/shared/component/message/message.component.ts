import { Component, OnInit } from '@angular/core';

import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { debounceTime } from 'rxjs/operators';

import { GlobalMessageService } from '../../service/global-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  staticAlertClosed = false;
  errorMessage: string = null;
  
  private _success: BehaviorSubject<string> = new BehaviorSubject<string>(this.errorMessage);

  constructor(private messageService: GlobalMessageService) {
    messageService.changeMessage = this.changeMessage.bind(this);
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.errorMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = null);
  }

  public changeMessage(message?: string): void {
    this._success.next(message);
  }
}
