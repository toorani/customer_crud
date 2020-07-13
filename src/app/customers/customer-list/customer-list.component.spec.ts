import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ICustomer } from 'src/app/Models/ICustomer';

import { of } from 'rxjs';
import { ServerActionResult } from 'src/app/Shared/ActionResult';
import { CustomerAPIService } from 'src/app/Services/customer-api.service';
import { TableElement, AnchorElement, H3Element } from 'src/app/Shared/DOMElements';
import { Router } from '@angular/router';


describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerApiService: any;
  let mockLoadAllCustomers: MockLoadAllCustomers;
  let router;
  beforeEach(async(() => {

    customerApiService = jasmine.createSpyObj('CustomerAPIService', ['LoadAllCustomers']);
    mockLoadAllCustomers = new MockLoadAllCustomers(customerApiService);
    mockLoadAllCustomers.byNoRecord();


    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CustomerAPIService, useValue: customerApiService }
      ]
    })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML Elements', () => {

    it(`should be page's capation 'Customer List' `, () => {
      let headerEle = new H3Element(fixture);
      expect(headerEle.nativeElement.textContent).toBe('Customer List');
    });
    
  })
  describe('Customer Detail buuton', () => {

    beforeEach(()=>{
      mockLoadAllCustomers.byDefaultMockData();
      component.ngOnInit();

      fixture.detectChanges();
    });

    it(`should be 'Customer Detail' button count 2 when there are 2 customers avaliable`, () => {

      let anchorElemts = new AnchorElement(fixture);
      expect(anchorElemts.debugElements.slice(1).length).toEqual(2);

    });
    it(`Should navigate to '/customer-detail/' + customerID after 'Customer Detail' click`, () => {

      spyOn(router, 'navigateByUrl');

      let tableElement = new TableElement(fixture);
      let btn_customer_detail = tableElement.nativeElement.rows[1].querySelector('a');
      btn_customer_detail.click();

      fixture.detectChanges();
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/customer-detail', mockLoadAllCustomers.defaultMockData[0].customerID])
        , { skipLocationChange: false, replaceUrl: false, state: undefined });

    });
  });
  describe('Customer List', () => {

    let tableElement;

    beforeEach(()=>{
      mockLoadAllCustomers.byDefaultMockData();
      component.ngOnInit();
      fixture.detectChanges();

      tableElement = new TableElement<CustomerListComponent>(fixture);
    })
    it(`should be one table element`, () => {
      expect(tableElement.debugElements.length).toEqual(1);
    });
    
    it(`should be table rows three (1 header + 2 data) when there are 2 customers avaliable`, () => {
      expect(tableElement.nativeElement.rows.length).toEqual(3)

    });
  });
  describe('New Customer buuton', () => {

    let btn_NewCustomer :HTMLAnchorElement;
    beforeEach(()=>{
      let linkElemnts = new AnchorElement(fixture);
      btn_NewCustomer = linkElemnts.debugElements[0].nativeElement;
    })  

    it(`should be <a/> tage with text 'New Customer' `, () => {
      
      expect(btn_NewCustomer.textContent).toBe('New Customer');
    });
    it(`Should navigate to '/customer-new' after 'New Customer' click `, () => {

      spyOn(router, 'navigateByUrl');

      btn_NewCustomer.click();
      fixture.detectChanges();
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['customer-new'])
        , { skipLocationChange: false, replaceUrl: false, state: undefined });

    });

  });
  describe('Data binding', () => {

    let customerData: ICustomer = {
      customerID: 1,
      name: { first: 'Reza', last: 'Toorani' },
      birthday: '05/05/1980',
      gender: 'm',
      customerLifetimeValue: 12.5,
      lastContact: ''
    }
    let tableElement;
    beforeEach(()=>{
      mockLoadAllCustomers.byMockData([customerData]);
      component.ngOnInit();
      fixture.detectChanges();

      tableElement = new TableElement(fixture);
    })

    it(`should show Man when gender field is 'm' at 4th column of the table`, () => {
      expect(tableElement.nativeElement.rows[1].cells[3].textContent).toEqual('Man');
    });

    it(`should show Reza Toorani as Full Name(name.first = reza  name.last=Toorani) at second column of the table`, () => {
      expect(tableElement.nativeElement.rows[1].cells[1].textContent).toEqual(customerData.name.first + ' ' + customerData.name.last);
    });
  })

  describe('Functionality', () => {
    it(`should show error message 'Application server is not accessible' when isSucess is false`, () => {
      spyOn(window, 'alert');

      const errorMsg = 'Application server is not accessible';
      mockLoadAllCustomers.byNoSuccess([errorMsg]);
      component.ngOnInit();

      fixture.detectChanges();
      expect(window.alert).toHaveBeenCalledWith(errorMsg);

    });
    it(`should show text 'There is no customer for showing.'  when there are not customers avaliable`, () => {
      let noDataElement = fixture.debugElement.nativeElement.querySelector("#emptyDataAlert");
      expect(noDataElement.innerText).toEqual('There is no customer for showing.');
    });
  })

});


class MockLoadAllCustomers {
  private loadAllCutomersResult = new ServerActionResult<ICustomer[]>()
  private customerApiService: any;
  constructor(_customerApiService: any) {
    this.customerApiService = _customerApiService;
  }

  defaultMockData :ICustomer[] = [
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

  byDefaultMockData() {
    this.loadAllCutomersResult.result = this.defaultMockData;
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




