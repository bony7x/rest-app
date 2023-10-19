import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserUpdateAddress, UserUpdateEmail, UserUpdateUsername} from "../../model/user";

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css']
})
export class UserUpdateFormComponent {

  @Input()
  isCustomer: boolean

  fieldTextTypeName: boolean;
  fieldTextTypeEmail: boolean;
  fieldTextTypeAddress: boolean;

  @Output()
  formNameSubmit = new EventEmitter<UserUpdateUsername>();

  @Output()
  formEmailSubmit = new EventEmitter<UserUpdateEmail>();

  @Output()
  formAddressSubmit = new EventEmitter<UserUpdateAddress>();

  formName: FormGroup
  formEmail: FormGroup
  formAddress: FormGroup

  constructor() {
    this.formName = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.formEmail = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.formAddress = new FormGroup({
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onFormNameSubmit() {
    if (this.formName.valid) {
      const name = this.formName.controls.name.value;
      const password = btoa(this.formName.controls.password.value)
      const userUpdate: UserUpdateUsername = new UserUpdateUsername(name, password);
      this.formNameSubmit.emit(userUpdate);
    }
  }

  onFormEmailSubmit() {
    if (this.formEmail.valid) {
      const email = this.formEmail.controls.email.value;
      const password = btoa(this.formEmail.controls.password.value)
      const userUpdate: UserUpdateEmail = new UserUpdateEmail(email, password);
      this.formEmailSubmit.emit(userUpdate)
    }
  }

  onFormAddressSubmit() {
    if (this.formAddress.valid) {
      const address = this.formAddress.controls.address.value;
      const password = btoa(this.formAddress.controls.password.value)
      const userUpdate: UserUpdateAddress = new UserUpdateAddress(address, password);
      this.formAddressSubmit.emit(userUpdate);
    }
  }

  toggleFieldTextTypeName() {
    this.fieldTextTypeName = !this.fieldTextTypeName;
  }

  toggleFieldTextTypeEmail() {
    this.fieldTextTypeEmail = !this.fieldTextTypeEmail;
  }

  toggleFieldTextTypeAddress() {
    this.fieldTextTypeAddress = !this.fieldTextTypeAddress;
  }

}
