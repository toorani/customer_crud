import { Injectable } from '@angular/core';
import { ICustomer } from '../Models/ICustomer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerActionResult } from '../Shared/ActionResult';

let customerList: ICustomer[] = [
  {
    "customerID": 1,
    "name": {
      "first": "Peter",
      "last": "Smith"
    },
    "birthday": "1996-10-12",
    "gender": "m",
    "lastContact": "2017-06-01T23:28:56.782Z",
    "customerLifetimeValue": 191.12
  },
  {
    "customerID": 2,
    "name": {
      "first": "Anna",
      "last": "Hopp"
    },
    "birthday": "1987-05-03",
    "gender": "w",
    "lastContact": "2017-07-08T13:18:56.888Z",
    "customerLifetimeValue": 50.99
  },
  {
    "customerID": 3,
    "name": {
      "first": "Christian",
      "last": "Cox"
    },
    "birthday": "1991-02-21",
    "gender": "m",
    "lastContact": "2017-08-01T11:57:47.142Z",
    "customerLifetimeValue": 0
  },
  {
    "customerID": 4,
    "name": {
      "first": "Roxy",
      "last": "Fox"
    },
    "birthday": "1979-06-30",
    "gender": "w",
    "lastContact": "2017-01-29T21:08:50.700Z",
    "customerLifetimeValue": 213.12
  },
  {
    "customerID": 5,
    "name": {
      "first": "Eric",
      "last": "Adam"
    },
    "birthday": "1969-11-21",
    "gender": "m",
    "lastContact": "2017-03-18T12:20:06.702Z",
    "customerLifetimeValue": 1019.91
  }
];



@Injectable({ providedIn: 'root' })


export class BackEndService {

  constructor() { }

  LoadAllCustomers(): Observable<ServerActionResult<ICustomer[]>> {
    let result = new ServerActionResult<ICustomer[]>();
    result.isSuccess = true;
    result.result = customerList;
    return of(result);
  }

  AddCustomer(customer: ICustomer): Observable<ServerActionResult<ICustomer>> {
    let tempData = [...customerList];
    customer.customerID = tempData.sort((x, y) => y.customerID - x.customerID)[0].customerID + 1;
    customerList = [...customerList, customer];
    let result = new ServerActionResult<ICustomer>();
    result.result = customer;
    result.messages.push('New customer was successfully saved.')
    return of(result);
  }

  UpdateCustomer(customer: ICustomer, id: number): Observable<ServerActionResult<ICustomer>> {
    let result = new ServerActionResult<ICustomer>();
    if (id === customer.customerID) {
      let dbCustomerIndex = customerList.findIndex(x => x.customerID === id);
      if (dbCustomerIndex != -1) {
        customerList[dbCustomerIndex] = customer;
        result.isSuccess = true;
        result.messages.push('the customer was successfully updated.')
      }
      else {
        result.isSuccess = false;
        result.messages.push('Customer not found!')
      }

    }
    else {
      result.isSuccess = false;
      result.messages.push('Bad request!');
    }
    return of(result);
  }

  DeleteCustomer(id: number): Observable<ServerActionResult<number>> {
    let result = new ServerActionResult<number>();
    let dbCustomerIndex = customerList.findIndex(x => x.customerID === id);
    if (dbCustomerIndex != -1) {
      customerList = [...customerList.slice(0, dbCustomerIndex), ...customerList.slice(dbCustomerIndex + 1, customerList.length)]
      result.result = id;
      result.isSuccess = true;
      result.messages.push('the customer was successfully deleted.')
    }
    else {
      result.isSuccess = false;
      result.messages.push('Customer not found!')
    }
    return of(result);
  }

  GetCustomer(id: number): Observable<ServerActionResult<ICustomer>> {

    return of(customerList).pipe(
      map((customers: ICustomer[]) => {
        let result = new ServerActionResult<ICustomer>();
        result.result = customers.find(x => x.customerID === id);
        return result;
      }));
  }

}
