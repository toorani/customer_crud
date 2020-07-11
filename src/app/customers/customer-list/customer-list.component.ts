import { Component, OnInit } from '@angular/core';
import { BackEndService } from 'src/app/Services/back-end.service';
import { ICustomer } from 'src/app/Models/ICustomer';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
})


export class CustomerListComponent implements OnInit {

  customers:ICustomer[];

  constructor(private serverApi:BackEndService) { }


  ngOnInit(): void {
    this.serverApi.LoadAllCustomers()
    .subscribe(data=>this.customers = data);
  }

}
