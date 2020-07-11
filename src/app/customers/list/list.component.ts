import { Component, OnInit } from '@angular/core';
import { BackEndService } from 'src/app/Services/back-end.service';
import { IDataColumn } from 'src/app/Shared/IDataColumn';


@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

  customers = this.serverApi.LoadAllCustomers();

  constructor(private serverApi:BackEndService) { }

  ngOnInit(): void {
  }

}
