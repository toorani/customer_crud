import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackEndService } from 'src/app/Services/back-end.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ICustomer } from 'src/app/Models/ICustomer';
import { observable, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

  customerEntity: ICustomer;
  customerEntity$: Observable<ICustomer>;
  customerFrom = this.formBuilder.group({
    name: this.formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    }),
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder
    , private serverApi: BackEndService
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.customerEntity$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.serverApi.GetCustomer(params.get('id')))
    );

    this.customerEntity$.subscribe(entity => {
      if (entity){
        this.customerEntity = entity;
        this.customerFrom.patchValue(entity)
      }
      
    })

  }

  onSubmit() {
    if (this.customerFrom.valid) {
      this.serverApi.AddCustomer(this.customerFrom.value);
      this.router.navigate(['/']);
    }
  }

}
