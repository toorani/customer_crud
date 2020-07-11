import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/list/list.component';
import { AddCustomerComponent } from './customers/add/add.component';


const routes: Routes = [
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: '', redirectTo:'/customer-list', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
