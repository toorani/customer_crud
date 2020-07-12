import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  constructor() { }

  showError(msg:string[]){
    alert(msg);
  }
  showSuccess(msg:string[]){
    alert(msg);
  }
}
