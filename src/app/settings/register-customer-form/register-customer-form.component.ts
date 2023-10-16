import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {RegisterCustomer} from "../../model/customer.model";

@Component({
  selector: 'app-register-customer-form',
  templateUrl: './register-customer-form.component.html',
  styleUrls: ['./register-customer-form.component.css']
})
export class RegisterCustomerFormComponent{

  form: FormGroup

  @Output()
  formSubmit = new EventEmitter<RegisterCustomer>();

  constructor() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
  }

  onFormSubmit() {
    if (this.form.valid) {
      const firstName = this.form.controls.firstName.value;
      const lastName = this.form.controls.lastName.value;
      const address = this.form.controls.address.value;
      const registerCustomer: RegisterCustomer = new RegisterCustomer(firstName, lastName, address)
      this.formSubmit.emit(registerCustomer);
    }
  }
}
