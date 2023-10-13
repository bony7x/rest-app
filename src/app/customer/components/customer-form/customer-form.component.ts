import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Borrowing} from "../../../model/borrowing.model";
import {Customer, CustomerCreate} from "../../../model/customer.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-customer-page-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  @Input()
  borrowings?: Borrowing[];

  @Output()
  formSubmit = new EventEmitter<CustomerCreate>()

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup;

  @Input()
  set customerData(customer: Customer | undefined) {
    if (customer) {
      this.form.controls.id.setValue(customer.id);
    }
  }

  constructor() {
    this.form = new FormGroup({
      id: new FormControl(undefined),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const fName = this.form.controls.firstName.value;
      const lName = this.form.controls.lastName.value;
      const email = this.form.controls.email.value;
      const customerCreate: CustomerCreate = new CustomerCreate(fName, lName, email)
      this.formSubmit.emit(customerCreate)
    }
  }
}
