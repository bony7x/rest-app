import {Component, OnInit} from '@angular/core';
import {RegisterCustomer} from "../../../model/customer.model";
import {UserService} from "../../../services/user.service";
import {User, UserUpdateAddress, UserUpdateEmail, UserUpdatePassword, UserUpdateUsername} from "../../../model/user";
import {AuthenticationService} from "../../../services/authentication.service";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  currentUser: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(response => this.currentUser = response);
  }

  createRegRequest(registerCustomer: RegisterCustomer): void {
    registerCustomer.user = this.currentUser;
    this.userService.registerCustomer(registerCustomer).subscribe(response => {
      this.toastService.success("Successfully registered as a customer!");
      this.authService.setToken(response.token);
    });
  }

  updateName(update: UserUpdateUsername) {
    this.userService.updateUserName(update).subscribe(response => {
      this.toastService.success('Username successfully changed!')
      this.authService.setToken(response.token)
    });
  }

  updateEmail(update: UserUpdateEmail) {
    this.userService.updateUserEmail(update).subscribe(() => {
      this.toastService.success('Username successfully changed!')
    });
  }

  updateAddress(update: UserUpdateAddress) {
    this.userService.updateUserAddress(update).subscribe(() => {
      this.toastService.success('Username successfully changed!')
    });
  }

  updatePassword(update: UserUpdatePassword) {
    this.userService.updateUserPassword(update).subscribe(response => {
      this.toastService.success('Username successfully changed!')
      this.authService.setToken(response.token)
    });
  }

  isCustomer(): boolean {
    return this.authService.getUserRole() === 'CUSTOMER';
  }

  isAdmin(): boolean{
    return this.authService.getUserRole() === 'ADMINISTRATOR';
  }

  isUser(): boolean {
    return this.authService.getUserRole() === 'USER';
  }
}
