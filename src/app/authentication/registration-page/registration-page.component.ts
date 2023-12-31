import {Component, OnDestroy} from '@angular/core';
import {User} from "../../model/user";
import {AuthenticationService} from "../../services/authentication.service";
import {ToastService} from "angular-toastify";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnDestroy{

  subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService,) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

/*  registerUser(username: string, password: string): void {
    const user: User = new User(btoa(username), btoa(password));
    this.subscriptions.add(
    this.authenticationService.register(user)
      .subscribe(() => {
        this.toastService.success("User account was successfully created!")
      }))
  }*/

  registerUser(newUser: User): void {
    const user: User = new User(btoa(newUser.name), btoa(newUser.password), btoa(newUser.email));
    this.subscriptions.add(
      this.authenticationService.register(user)
        .subscribe(() => {
          this.toastService.success("User account was successfully created!")
        }))
  }
}
