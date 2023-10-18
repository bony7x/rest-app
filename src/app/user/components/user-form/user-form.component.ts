import {Component, EventEmitter, Output} from '@angular/core';
import {BookCreate} from "../../../model/book.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserUpdateNameEmail} from "../../../model/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Output()
  formSubmit = new EventEmitter<UserUpdateNameEmail>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const email = this.form.controls.email.value;
      const userUpdate: UserUpdateNameEmail = new UserUpdateNameEmail(name, email);
      this.formSubmit.emit(userUpdate);
    }
  }
}
