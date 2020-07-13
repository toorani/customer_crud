import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerAPIService } from 'src/app/Services/customer-api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ICustomer } from 'src/app/Models/ICustomer';
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { ServerActionResult } from 'src/app/Shared/ActionResult';
import { MessageDialogService } from 'src/app/Services/message-dialog.service';


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

  customerEntity: ICustomer;
  customerEntity$: Observable<ServerActionResult<ICustomer>>;
  idSelected = 0;
  customerFrom = this.formBuilder.group({
    customerID: [0],
    name: this.formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    }),
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder
    , private serverApi: CustomerAPIService
    , private router: Router
    , private route: ActivatedRoute
    , private messageDlg: MessageDialogService) { }

  ngOnInit(): void {

    this.customerEntity$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has('id')){
          this.idSelected = +params.get('id');
          return this.serverApi.GetCustomer(this.idSelected)
        }
        return new Observable<ServerActionResult<ICustomer>>()
      })
    );

    
    this.customerEntity$.subscribe(entity => {

      if (entity.isSuccess) {
        this.customerEntity = entity.result;
        this.customerFrom.patchValue(this.customerEntity)
      }
      else {
        this.messageDlg.showError(entity.messages);
      }
    })

  }
  onSubmit() {
    if (this.customerFrom.valid) {
      let actionResult = new Observable<ServerActionResult<ICustomer>>();
      if (this.idSelected === 0) {
        actionResult = this.serverApi.AddCustomer(this.customerFrom.value)

      }
      else {
        actionResult = this.serverApi.UpdateCustomer(this.customerFrom.value, this.idSelected);
      }

      this.showResult(actionResult);
    }
    else {
      this.showErrorValidation();
    }
  }

  deleteCustomer() {
    this.showResult(this.serverApi.DeleteCustomer(this.idSelected))
  }

  showResult(serverResult: Observable<ServerActionResult<any>>) {
    serverResult.subscribe(result => {
      if (result.isSuccess) {
        this.messageDlg.showSuccess(result.messages);
        this.router.navigate(['/']);
      }
      else {

        this.messageDlg.showError(result.messages);
      }
    });
  }

  showErrorValidation() {
    let errMsg: string[] = [];

    if (!this.customerFrom.get("name.first").valid)
      errMsg.push('Fist name is required');
    if (!this.customerFrom.get("name.last").valid)
      errMsg.push('Last name is required');
    if (!this.customerFrom.get("birthday").valid)
      errMsg.push('Birthday is required');
    if (!this.customerFrom.get("gender").valid)
      errMsg.push('Gender is required');

    this.messageDlg.showError(errMsg);
  }

}
