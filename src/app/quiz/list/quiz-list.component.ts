import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { GlobalMessageService } from '../../shared/service/global-message.service';

declare let jQuery: any;

@Component({
  selector: 'asdp-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onCollapse(id: string): void {
    let state: boolean = JSON.parse(jQuery(id).attr("aria-expanded"));
    
    jQuery('.collapse').collapse('hide')
    !state ? jQuery(id).collapse('show') : jQuery(id).collapse('hide')
    jQuery(id).attr("aria-expanded", !state);
  }
}
