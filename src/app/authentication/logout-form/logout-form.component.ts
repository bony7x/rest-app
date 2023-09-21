import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.css']
})
export class LogoutFormComponent {

  form:FormGroup

  @Output()
  formSubmit = new EventEmitter<User>();

  @Output()
  formCancel = new EventEmitter<void>();

  @Input()
  set userData(user: User | undefined){
    if(user){
      this.form.controls.name.setValue(user.name);
      this.form.controls.password.setValue(user.password);
    }
  }

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onFormSubmit(): void {
    if(this.form.valid){
      const name = this.form.controls.name.value;
      const password = this.form.controls.password.value;
      const user: User = new User(btoa(name),btoa(password));
      this.formSubmit.emit(user)
    }
  }
}
