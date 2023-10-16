import {Component, OnInit} from '@angular/core';
import {RegisterCustomer} from "../../model/customer.model";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  currentUser: User;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
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
    this.userService.registerCustomer(registerCustomer).subscribe();
  }
}
