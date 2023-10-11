import {Component, EventEmitter, Output} from '@angular/core';
import {CustomerFilter} from "../../../filters/customer-filter";
import {FormControl, FormGroup} from "@angular/forms";
import {BorrowingFilter} from "../../../filters/borrowing-filter";

@Component({
  selector: 'app-borrowing-filter-form',
  templateUrl: './borrowing-filter-form.component.html',
  styleUrls: ['./borrowing-filter-form.component.css']
})
export class BorrowingFilterFormComponent {

  @Output()
  formSubmit = new EventEmitter<BorrowingFilter>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      date: new FormControl("")
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name= this.form.controls.name.value;
      const email = this.form.controls.email.value;
      const date = this.form.controls.date.value;
      const filter: BorrowingFilter = new BorrowingFilter(name,email,date);
      this.formSubmit.emit(filter);
    }
  }
}
