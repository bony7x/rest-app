import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserUpdateAddress, UserUpdateEmail, UserUpdatePassword, UserUpdateUsername} from "../../../model/user";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.css']
})
export class UserUpdateFormComponent {

  @Input()
  isCustomer: boolean

  @Input()
  isAdmin: boolean;

  @Input()
  isUser: boolean;

  fieldTextTypeName: boolean;
  fieldTextTypeEmail: boolean;
  fieldTextTypeAddress: boolean;
  fieldTextTypePasswordOld: boolean;
  fieldTextTypePasswordNew: boolean;
  fieldTextTypePasswordConfirm: boolean;

  @Output()
  formNameSubmit = new EventEmitter<UserUpdateUsername>();

  @Output()
  formEmailSubmit = new EventEmitter<UserUpdateEmail>();

  @Output()
  formAddressSubmit = new EventEmitter<UserUpdateAddress>();

  @Output()
  formPasswordSubmit = new EventEmitter<UserUpdatePassword>();

  formName: FormGroup
  formEmail: FormGroup
  formAddress: FormGroup
  formPassword: FormGroup

  constructor(
    private toastService: ToastService
  ) {
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
    this.formPassword = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required)
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

  onFormPasswordSubmit() {
    if (this.formPassword.valid) {
      if (this.formPassword.controls.newPassword.value !== this.formPassword.controls.confirmNewPassword.value) {
        return this.toastService.error('New password doesn\'t match confirm password!');
      }
      const old = btoa(this.formPassword.controls.currentPassword.value);
      const newP = btoa(this.formPassword.controls.newPassword.value);
      const userUpdate: UserUpdatePassword = new UserUpdatePassword(old, newP);
      this.formPasswordSubmit.emit(userUpdate);
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

  toggleFieldTextTypePasswordOld() {
    this.fieldTextTypePasswordOld = !this.fieldTextTypePasswordOld;
  }

  toggleFieldTextTypePasswordNew() {
    this.fieldTextTypePasswordNew = !this.fieldTextTypePasswordNew;
  }

  toggleFieldTextTypePasswordConfirm() {
    this.fieldTextTypePasswordConfirm = !this.fieldTextTypePasswordConfirm;
  }
}
