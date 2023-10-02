import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User, UserRole, UserUpdate} from "../../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-administration-page-form',
  templateUrl: './administration-page-form.component.html',
  styleUrls: ['./administration-page-form.component.css']
})
export class AdministrationPageFormComponent {

  @Input()
  users?: User[];

  @Output()
  formSubmit = new EventEmitter<UserUpdate>();

  @Output()
  formCancel = new EventEmitter<void>();

  form: FormGroup

  selectedUser?: User;

  roles: UserRole[] = [UserRole.USER, UserRole.ADMINISTRATOR]

  constructor() {
    this.form = new FormGroup({
      user: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required)
    })
  }

  changeSelectedUser(userId: string){
    if(userId !== undefined){
      this.selectedUser = this.users?.find(user => user.id === Number(userId));
    }
  }

  onFormSubmit(){
    console.log("DSA")
    if(this.form.valid){
      console.log("ASDASD")
      const userId = this.form.controls.user.value;
      const role = this.form.controls.role.value;
      const userUpdate: UserUpdate = new UserUpdate(userId,role);
      this.formSubmit.emit(userUpdate);
    }
  }

  protected readonly UserRole = UserRole;
}
