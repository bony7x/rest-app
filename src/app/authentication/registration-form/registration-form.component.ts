import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  fieldTextType: boolean;

  form: FormGroup

  url: string;

  @Output()
  formSubmit = new EventEmitter<User>();

  @Output()
  formCancel = new EventEmitter<void>();

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const name = this.form.controls.name.value;
      const email = this.form.controls.email.value;
      const password = this.form.controls.password.value;
      let user: User = new User(name, password, email);
      this.formSubmit.emit(user)
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
