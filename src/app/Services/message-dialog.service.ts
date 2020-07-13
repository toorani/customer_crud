import { Injectable } from '@angular/core';
import { IMessageDialogService } from '../Shared/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService implements IMessageDialogService {

  constructor() { }

  showError(msg:string[]){
    alert(msg.join('\r\n'));
  }
  showSuccess(msg:string[]){
    alert(msg.join('\r\n'));
  }
}
