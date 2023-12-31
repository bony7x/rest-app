import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer-filter-form',
  templateUrl: './customer-filter-form.component.html',
  styleUrls: ['./customer-filter-form.component.css']
})
export class CustomerFilterFormComponent {

  @Output()
  formSubmit = new EventEmitter<Map<string, string>>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("")
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const firstName = this.form.controls.firstName.value;
      const lastName = this.form.controls.lastName.value;
      const email = this.form.controls.email.value;
      let map = new Map<string, string>()
        .set('firstName', firstName)
        .set('lastName', lastName)
        .set('email', email);
      this.formSubmit.emit(map);
    }
  }
}
