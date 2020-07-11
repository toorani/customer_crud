import { Component, OnInit } from '@angular/core';
import { BackEndService } from 'src/app/Services/back-end.service';


@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class CustomerListComponent implements OnInit {

  customers = this.serverApi.LoadAllCustomers();

  constructor(private serverApi:BackEndService) { }

  addCustomer(){

  }

  ngOnInit(): void {
  }

}
