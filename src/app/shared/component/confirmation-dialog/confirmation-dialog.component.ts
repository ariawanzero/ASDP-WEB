import { Component, OnInit, Injectable } from '@angular/core';
import { ConfirmationDialogService } from '../../service/confirmation-dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})

@Injectable()
export class ConfirmationDialogComponent implements OnInit {
  public title: string;
  public message: string;
  public okText: string;
  public cancelText: string;

  private _defaults = {
    title: 'Confirmation',
    message: 'Are you sure to process?',
    cancelText: 'No',
    okText: 'Yes'
  };
  private _confirmElement: any;
  private _cancelButton: any;
  private _okButton: any;

  constructor(confirmService: ConfirmationDialogService) {
    // assign a function to the property activate of ConfirmService.
    // After this, calling activate on ConfirmService will cause the function activate
    // from ConfirmComponent to be executed.
    confirmService.activate = this.activate.bind(this);
  }

  private setLabels(message = this._defaults.message, title = this._defaults.title) {
    this.title = title;
    this.message = message;
    this.okText = this._defaults.okText;
    this.cancelText = this._defaults.cancelText;
  }

  activate(message = this._defaults.message, title = this._defaults.title) {
    this.setLabels(message, title);

    let promise = new Promise<boolean>(resolve => {
      this.show(resolve);
    });
    return promise;
  }

  private show(resolve: (boolean) => any) {
    document.onkeyup = null;

    let negativeOnClick = (e: any) => resolve(false);
    let positiveOnClick = (e: any) => resolve(true);

    if (!this._confirmElement || !this._cancelButton || !this._okButton) {
      return;
    }
    this._confirmElement.style.opacity = 0;
    this._confirmElement.style.zIndex = 1;

    this._cancelButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!negativeOnClick(e)) {
        this.hideDialog();
      }
    });

    this._okButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!positiveOnClick(e)) {
        this.hideDialog();
      }
    });

    this._confirmElement.onclick = () => {
      this.hideDialog();
      return negativeOnClick(null);
    };

    document.onkeyup = (e: any) => {
      if (e.which === 27) {
        this.hideDialog();
        return negativeOnClick(null);
      }
    };

    this._confirmElement.style.opacity = 1;
    this._confirmElement.style.display = 'block';
  }

  private hideDialog() {
    document.onkeyup = null;
    this._confirmElement.style.opacity = 0;
    window.setTimeout(() => {
      this._confirmElement.style.zIndex = -1
      this._confirmElement.style.display = 'none';
    }, 400);
  }

  ngOnInit(): any {
    this._confirmElement = document.getElementById('confirmationModal');
    this._cancelButton = document.getElementById('cancelButton');
    this._okButton = document.getElementById('okButton');
  }
}
