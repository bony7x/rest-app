import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-borrowing-filter-form',
  templateUrl: './borrowing-filter-form.component.html',
  styleUrls: ['./borrowing-filter-form.component.css']
})
export class BorrowingFilterFormComponent {

  @Output()
  formSubmit = new EventEmitter<Map<string, string>>();

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
      const name = this.form.controls.name.value;
      const email = this.form.controls.email.value;
      const date = this.form.controls.date.value;
      let map = new Map<string, string>()
        .set('name', name)
        .set('email', email)
        .set('date', date);
      this.formSubmit.emit(map);
    }
  }
}
