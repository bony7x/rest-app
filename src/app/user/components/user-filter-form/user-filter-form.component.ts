import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-filter-form',
  templateUrl: './user-filter-form.component.html',
  styleUrls: ['./user-filter-form.component.css']
})
export class UserFilterFormComponent {

  @Output()
  formSubmit = new EventEmitter<Map<string, string>>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(""),
      email: new FormControl("")
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const email = this.form.controls.email.value;
      let map = new Map<string, string>()
        .set('name', name)
        .set('email', email)
      this.formSubmit.emit(map);
    }
  }
}
