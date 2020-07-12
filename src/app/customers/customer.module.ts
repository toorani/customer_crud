import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule    
  ]
})
export class CustomerModule { }
