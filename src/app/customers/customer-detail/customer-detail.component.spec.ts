import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { CustomerDetailComponent } from './customer-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { H3Element, ButtonElement, FormElement } from 'src/app/Shared/DOMElements';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICustomer } from 'src/app/Models/ICustomer';
import { CustomerAPIService } from 'src/app/Services/customer-api.service';
import { ServerActionResult } from 'src/app/Shared/ActionResult';



describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let customerApiService: any;
  let router;
  let mockApiMethod;
  let form;

  const makeCompiledTestBed = (providers?: any[]): void => {

    const moduleDef: TestModuleMetadata = {
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [CustomerDetailComponent],
      providers: []
    };
    if (moduleDef.providers && providers) {
      providers.map(prv => moduleDef.providers.push(prv));

    }
    mockApiMethod = new MockApiMethod();
    TestBed.configureTestingModule(moduleDef).compileComponents();
    router = TestBed.get(Router);
  };

  const setupTestVars = (): void => {
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    form = new FormElement(fixture);
  };

  describe('General', () => {
    beforeEach(async(makeCompiledTestBed));
    beforeEach(setupTestVars);

    it('should be customerFrom invalid when empty', () => {
      expect(component.customerFrom.valid).toBeFalsy();
    });

    it('customerFrom should has customerID,name :{first,last}, birthday, gender controls', () => {
      let checkControls = true;
      checkControls = checkControls && component.customerFrom.contains('customerID');
      checkControls = checkControls && (!!component.customerFrom.get("name.first"))
      checkControls = checkControls && (!!component.customerFrom.get("name.last"))

      checkControls = checkControls && component.customerFrom.contains('birthday');
      checkControls = checkControls && component.customerFrom.contains('gender');
      expect(checkControls).toBeTruthy();

    });

    it(`should be showed 'Fist name is required' when first name is not avaliable`, () => {
      let dataProvider = new MockDataProvider();
      let mockData = dataProvider.getNewCustomerMockData();
      mockData.name.first = null;

      component.customerFrom.patchValue(mockData);
      spyOn(window, 'alert');

      let form = new FormElement(fixture);
      form.sumbit();
      expect(component.customerFrom.valid).toBeFalse();
      expect(window.alert).toHaveBeenCalledWith('Fist name is required');

    });
  })

  describe('Customer New : when an ID is NOT provided in the URL param', () => {
    
    beforeEach(async(() => {
      customerApiService = jasmine.createSpyObj('CustomerAPIService', ['AddCustomer']);
      makeCompiledTestBed([{ provide: CustomerAPIService, useValue: customerApiService }]);
    }));
    beforeEach(setupTestVars);
    beforeEach(() => {
      mockApiMethod.AddCustomer(customerApiService, true);

      let dataProvider = new MockDataProvider();
      component.customerFrom.patchValue(dataProvider.getNewCustomerMockData());
      
    })
    describe('Initial state', () => {
      it(`should be page's title 'New Customer' `, () => {
        let headerEle = new H3Element(fixture);
        expect(headerEle.nativeElement.textContent).toBe('New Customer');
      });
    });
    describe('Add new customer', () => {
      it(`should be showed successfully message when customer was successfully saved`, () => {

        spyOn(window, 'alert');
        form.sumbit();
        expect(component.customerFrom.valid).toBeTrue();
        expect(window.alert).toHaveBeenCalledWith(mockApiMethod.Add_Sucessfull_Message);

      });

      it(`should navigate '/ 'when customer successfully saved`, () => {

        spyOn(router, 'navigateByUrl');
        form.sumbit();
        expect(component.customerFrom.valid).toBeTrue();
        expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/'])
          , { skipLocationChange: false });


      });

      it(`should show error message when customer cannot saved`, () => {

        mockApiMethod.AddCustomer(customerApiService, false);

        spyOn(window, 'alert');

        form.sumbit();
        expect(component.customerFrom.valid).toBeTrue();
        expect(window.alert).toHaveBeenCalledWith(mockApiMethod.Fail_Message);
      });

    });

  });

  describe('Customer Detail : when an ID is provided in the URL param', () => {
    beforeEach(async(() => {
      customerApiService = jasmine.createSpyObj('CustomerAPIService', ['UpdateCustomer'
        , 'DeleteCustomer', 'GetCustomer']);

      
      makeCompiledTestBed([
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 1 })) } },
        { provide: CustomerAPIService, useValue: customerApiService }
      ]);

      mockApiMethod.GetCustomer(customerApiService, true);

    }));
    beforeEach(setupTestVars);
    
    it(`should be page's title 'Customer Deatil' `, () => {
      let headerEle = new H3Element(fixture);
      expect(headerEle.nativeElement.textContent).toBe('Customer Detail');
    });

    it(`form data should equal the customer mock data`, () => {
      let dataProvider = new MockDataProvider();
      let mockData = dataProvider.getDeatilCustomerMockData();
      expect(component.customerFrom.get('name.first').value).toEqual(mockData.name.first);
      expect(component.customerFrom.get('name.last').value).toBe(mockData.name.last);
      expect(component.customerFrom.get('gender').value).toBe(mockData.gender);
      expect(component.customerFrom.get('birthday').value).toBe(mockData.birthday);
    });
    describe('Update customer', () => {
      it(`should show message of successfully updated when customer successfully updated`, () => {
        mockApiMethod.UpdateCustomer(customerApiService,true);
        spyOn(window, 'alert');
        form.sumbit();
        expect(component.customerFrom.valid).toBeTrue();
        expect(window.alert).toHaveBeenCalledWith(mockApiMethod.Update_Sucessfull_Message);
      });

      it(`should navigate '/ 'when customer successfully updated`, () => {
        mockApiMethod.UpdateCustomer(customerApiService,true);
        spyOn(router, 'navigateByUrl');
        form.sumbit();
        expect(component.customerFrom.valid).toBeTrue();
        expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/'])
          , { skipLocationChange: false });

      });

      it(`should show error message when customer cannot update`, () => {

        mockApiMethod.UpdateCustomer(customerApiService,false);
        spyOn(window, 'alert');
        form.sumbit();
        expect(component.customerFrom.valid).toBeTrue();
        expect(window.alert).toHaveBeenCalledWith(mockApiMethod.Fail_Message);
      });
    })

    describe('Delete customer', () => {
      let btnDelete;
      beforeEach(()=>{
        btnDelete = new ButtonElement(fixture,'Delete');
      })
      

      it(`should show message of successfully delete when customer successfully deleted`, () => {
        mockApiMethod.DeleteCutomers(customerApiService,true);
        spyOn(window, 'alert');
        
        btnDelete.click();
        
        expect(window.alert).toHaveBeenCalledWith(mockApiMethod.Delete_Sucessfull_Message);
      });

      it(`should navigate '/ 'when customer successfully deleted`, () => {
        mockApiMethod.DeleteCutomers(customerApiService,true);
        spyOn(router, 'navigateByUrl');
        btnDelete.click();
        
        expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['/'])
          , { skipLocationChange: false });

      });

      it(`should show error message when customer cannot delete`, () => {

        mockApiMethod.DeleteCutomers(customerApiService,false);
        spyOn(window, 'alert');
        btnDelete.click();
        
        expect(window.alert).toHaveBeenCalledWith(mockApiMethod.Fail_Message);
      });
      
    });


  });
});

class MockDataProvider {

  getNewCustomerMockData(): ICustomer {
    return {
      birthday: '1996-10-12',
      customerID: 0,
      gender: 'm',
      name: {
        last: 'Toorani',
        first: 'Reza'
      },
      customerLifetimeValue: 0,
      lastContact: '1996-10-12'
    }
  }

  getDeatilCustomerMockData(): ICustomer {
    let mockData = this.getNewCustomerMockData();
    mockData.customerID = 1
    return mockData;
  }

}

class MockApiMethod {
  private dataProvider = new MockDataProvider();
  private cutomersResult = new ServerActionResult<ICustomer>();
  Delete_Sucessfull_Message = 'the customer was successfully deleted.';
  Update_Sucessfull_Message = 'the customer was successfully updated.';
  Add_Sucessfull_Message = 'the customer was successfully saved.';
  Fail_Message = 'fail message';

  DeleteCutomers(customerApiService: any, isSuccess = true) {
    this.cutomersResult.isSuccess = isSuccess;
    this.cutomersResult.result = this.dataProvider.getDeatilCustomerMockData();
    this.cutomersResult.messages = [];
    if (isSuccess)
      this.cutomersResult.messages.push(this.Delete_Sucessfull_Message);
    else
      this.cutomersResult.messages.push(this.Fail_Message);
    customerApiService.DeleteCustomer.and.returnValue(of(this.cutomersResult));

  }

  UpdateCustomer(customerApiService: any, isSuccess = true) {

    this.cutomersResult.isSuccess = isSuccess;
    this.cutomersResult.result = this.dataProvider.getDeatilCustomerMockData();
    this.cutomersResult.messages = [];
    if (isSuccess)
      this.cutomersResult.messages.push(this.Update_Sucessfull_Message);
    else
      this.cutomersResult.messages.push(this.Fail_Message);
    customerApiService.UpdateCustomer.and.returnValue(of(this.cutomersResult));

  }

  AddCustomer(customerApiService: any, isSuccess = true) {

    this.cutomersResult.isSuccess = isSuccess;
    this.cutomersResult.result = this.dataProvider.getNewCustomerMockData();
    this.cutomersResult.messages = [];
    if (isSuccess)
      this.cutomersResult.messages.push(this.Add_Sucessfull_Message);
    else
      this.cutomersResult.messages.push(this.Fail_Message);
    customerApiService.AddCustomer.and.returnValue(of(this.cutomersResult));

  }

  GetCustomer(customerApiService: any, isSuccess = true) {
    this.cutomersResult.isSuccess = isSuccess;
    this.cutomersResult.result = this.dataProvider.getDeatilCustomerMockData();
    this.cutomersResult.messages = [];
    if (!isSuccess)
      this.cutomersResult.messages.push(this.Fail_Message);
    customerApiService.GetCustomer.and.returnValue(of(this.cutomersResult));

  }
}