import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';


const routes: Routes = [
  { path: '', redirectTo:'/customer-list', pathMatch:'full' },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-detail/:id', component:CustomerDetailComponent },
  { path: 'customer-new', component: CustomerDetailComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})

export class CustomerRoutingModule { 
  static customerRoutes: Routes = routes;
}
