import {Component, Input} from '@angular/core';
import {Borrowing} from "../../model/borrowing.model";
import {Customer} from "../../model/customer.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-page-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  @Input()
  borrowings?: Borrowing[];

  form:FormGroup;
  customer?: Customer;

  @Input()
  set customerData(customer: Customer | undefined){
    if(customer){
      this.form.controls.id.setValue(customer.id);
      this.form.controls.firstName.setValue(customer.firstName);
      this.form.controls.lastName.setValue(customer.lastName);
      this.form.controls.email.setValue(customer.email);
      this.customer = customer;
    }
  }

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(undefined),
      firstName: new FormControl(),
      lastName: new FormControl,
      email: new FormControl,
      borrowings: new FormControl
    })
  }
}
