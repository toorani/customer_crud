import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';


const routes: Routes = [
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-detail/:id', component:CustomerDetailComponent },
  { path: 'customer-new', component: CustomerDetailComponent },
  { path: '', redirectTo:'/customer-list', pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
