import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackEndService } from 'src/app/Services/back-end.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerFrom = this.formBuilder.group({
    name: this.formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required]
    }),
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private serverApi: BackEndService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.customerFrom.valid) {
      this.serverApi.AddCustomer(this.customerFrom.value);
      this.router.navigate(['/']);
    }

    console.log(this.customerFrom.value);
  }

}
