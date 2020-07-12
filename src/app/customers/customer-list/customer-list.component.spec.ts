import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ICustomer } from 'src/app/Models/ICustomer';

import { of } from 'rxjs';
import { ServerActionResult } from 'src/app/Shared/ActionResult';
import { CustomerAPIService } from 'src/app/Services/customer-api.service';


describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerApiService: any;
  let mockLoadAllCustomers: MockLoadAllCustomers;
  beforeEach(async(() => {

    customerApiService = jasmine.createSpyObj('CustomerAPIService', ['LoadAllCustomers']);
    mockLoadAllCustomers = new MockLoadAllCustomers(customerApiService);
    mockLoadAllCustomers.byNoRecord();


    TestBed.configureTestingModule({
      declarations: [
        CustomerListComponent,
        CustomerDetailMock
      ],
      imports: [RouterTestingModule.withRoutes([
        { path: 'customer-new', component: CustomerDetailMock, pathMatch: 'full' }
      ])],
      providers: [
        { provide: CustomerAPIService, useValue: customerApiService }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('there should be one H3 tage ', () => {
    let h3Elemts = fixture.debugElement
      .queryAll(By.css("h3"));
    expect(h3Elemts.length).toEqual(1);
  });

  it(`the page's capation should be 'Customer List' `, () => {
    let headerEle = fixture.debugElement.query(By.css("h3"))
    expect(headerEle.nativeElement.textContent).toBe('Customer List');
  });

  it(`should be <a/> tage with text 'New Customer' `, () => {
    let linkElemnts = fixture.debugElement.queryAll(By.css("a"))
    expect(linkElemnts[0].nativeElement.textContent).toBe('New Customer');
  });

  it(`Should navigate to '' before 'New Customer' button click `, () => {
    const location = TestBed.get(Location);
    expect(location.path()).toBe('')
  });

  it(`Should navigate to '/customer-new' after 'New Customer' click `, () => {
    const location = TestBed.get(Location);
    let linkElemnts = fixture.debugElement.queryAll(By.css("a"))
    let btn_NewCustomer = linkElemnts[0].nativeElement as HTMLAnchorElement;
    btn_NewCustomer.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/customer-new')
    });
  });

  it(`should be there one table element`, () => {
    mockLoadAllCustomers.byDefaultMockData();
    component.ngOnInit();
    fixture.detectChanges();
    let tableElements = fixture.debugElement.queryAll(By.css("table"))
    expect(tableElements.length).toEqual(1);
  });

  it(`should show text 'There is no customer for showing.'  when there are not customers avaliable`, () => {
    let noDataElement = fixture.debugElement.nativeElement.querySelector("#emptyDataAlert");
    expect(noDataElement.innerText).toEqual('There is no customer for showing.');
  });

  it(`should be table rows three (1 header + 2 data) when there are 2 customers avaliable`, () => {

    mockLoadAllCustomers.byDefaultMockData();
    component.ngOnInit();

    fixture.detectChanges();
    let tableElement = fixture.debugElement.query(By.css("table"));
    let rows = tableElement.nativeElement.rows;
    expect(rows.length).toEqual(3)

  });

  it(`should be 'Customer Detail' button count 2 when there are 2 customers avaliable`, () => {

    mockLoadAllCustomers.byDefaultMockData();
    component.ngOnInit();

    fixture.detectChanges();
    let anchorElemts = fixture.debugElement.queryAll(By.css("a"));
    expect(anchorElemts.slice(1).length).toEqual(2);

  });

  it(`should show error message 'Application server is not accessible' when isSucess is false`, () => {
    spyOn(window, 'alert');

    const errorMsg = 'Application server is not accessible';
    mockLoadAllCustomers.byNoSuccess([errorMsg]);
    component.ngOnInit();

    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith([errorMsg]);

  });


  it(`should show Reza Toorani as Full Name(name.first ' ' name.last) at second column of the table`, () => {
    mockLoadAllCustomers.byMockData([{
      customerID: 1,
      name: { first: 'Reza', last: 'Toorani' },
      birthday: '05/05/1980',
      gender: 'm',
      customerLifetimeValue: 12.5,
      lastContact: ''
    }]);
    component.ngOnInit();

    fixture.detectChanges();
    

  });



});

@Component({ template: '' })
class CustomerDetailMock {

}

class MockLoadAllCustomers {
  private loadAllCutomersResult = new ServerActionResult<ICustomer[]>()
  private customerApiService: any;
  constructor(_customerApiService: any) {
    this.customerApiService = _customerApiService;
  }

  byDefaultMockData() {
    this.loadAllCutomersResult.result = [
      {
        customerID: 1,
        name: { first: 'Reza', last: 'Toorani' },
        birthday: '05/05/1980',
        gender: 'm',
        customerLifetimeValue: 12.5,
        lastContact: ''
      },
      {
        customerID: 2,
        name: { first: 'Sam', last: 'Toorani' },
        birthday: '04/05/2014',
        gender: 'm',
        customerLifetimeValue: 12.5,
        lastContact: ''
      }
    ];
    this.customerApiService.LoadAllCustomers.and.returnValue(of(this.loadAllCutomersResult))
  }
  byMockData(mockData: ICustomer[]) {
    this.loadAllCutomersResult.result = mockData;
    this.customerApiService.LoadAllCustomers.and.returnValue(of(this.loadAllCutomersResult))
  }
  byNoSuccess(errorMsg: string[]) {
    this.loadAllCutomersResult.isSuccess = false;
    this.loadAllCutomersResult.messages = errorMsg;
    this.customerApiService.LoadAllCustomers.and.returnValue(of(this.loadAllCutomersResult))
  }
  bySuccess() {
    this.loadAllCutomersResult.isSuccess = true;
    this.customerApiService.LoadAllCustomers.and.returnValue(of(this.loadAllCutomersResult))
  }
  byNoRecord() {
    this.loadAllCutomersResult.isSuccess = true;
    this.loadAllCutomersResult.result = [];
    this.customerApiService.LoadAllCustomers.and.returnValue(of(this.loadAllCutomersResult))
  }
}

class DOMHelper<T>{

  getTable<TComponent>(fixture : ComponentFixture<TComponent>){
    return fixture.debugElement.query(By.css("table"));
  } 

}


