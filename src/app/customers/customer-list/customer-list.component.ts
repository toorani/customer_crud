import { Component, OnInit } from '@angular/core';
import { BackEndService } from 'src/app/Services/back-end.service';
import { ICustomer } from 'src/app/Models/ICustomer';

import { MessageDialogService } from 'src/app/Services/message-dialog.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
})


export class CustomerListComponent implements OnInit {

  customers: ICustomer[];

  constructor(private serverApi: BackEndService,
    private messageDlg: MessageDialogService) { }


  ngOnInit(): void {
    this.serverApi.LoadAllCustomers()
      .subscribe(result => {
        if (result.isSuccess) {
          this.customers = result.result;
        }
        else {
          this.messageDlg.showError(result.messages);
        }
      });
  }

}
