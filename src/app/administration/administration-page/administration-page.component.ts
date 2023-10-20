import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserUpdate} from "../../model/user";
import {UserService} from "../../services/user.service";
import {ToastService} from "angular-toastify";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-administration-page',
  templateUrl: './administration-page.component.html',
  styleUrls: ['./administration-page.component.css']
})
export class AdministrationPageComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private toastService: ToastService) {
  }

  userList: User[] = [];

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getUsers(): void {
    this.subscriptions.add(
      this.userService.getUsers().subscribe(users => this.userList = users));
  }

  updateUserRole(userUpdate: UserUpdate): void {
    this.subscriptions.add(
      this.userService.updateUserRole(userUpdate).subscribe(() => {
        this.toastService.success('Successfully updated user\'s role!')
      }));
  }
}
