import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailComponent } from './customer-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IMessageDialogService } from 'src/app/Shared/Interfaces';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageDialogService } from 'src/app/Services/message-dialog.service';


describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDetailComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MessageDialogService, useClass: MessageDialogServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


class MessageDialogServiceMock implements IMessageDialogService {
  showError(msg: string[]) {
    throw new Error("Method not implemented.");
  }
  showSuccess(msg: string[]) {
    throw new Error("Method not implemented.");
  }

}