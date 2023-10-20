import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  fieldTextTypePw: boolean;
  fieldTextTypeCf: boolean;

  form: FormGroup

  url: string;

  @Output()
  formSubmit = new EventEmitter<User>();

  @Output()
  formCancel = new EventEmitter<void>();

  constructor(
    private toastService: ToastService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('',Validators.required)
    })
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      if (this.form.controls.password.value !== this.form.controls.confirmPassword.value) {
        return this.toastService.error('Password\'s do not match!')
      }
      const name = this.form.controls.name.value;
      const email = this.form.controls.email.value;
      const password = this.form.controls.password.value;
      let user: User = new User(name, password, email);
      this.formSubmit.emit(user)
    }
  }

  toggleFieldTextTypePw() {
    this.fieldTextTypePw = !this.fieldTextTypePw;
  }

  toggleFieldTextTypeCf() {
    this.fieldTextTypeCf = !this.fieldTextTypeCf;
  }
}
