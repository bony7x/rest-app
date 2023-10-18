import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserUpdateNameEmail} from "../../../model/user";
import {Customer} from "../../../model/customer.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {CustomerService} from "../../../services/customer.service";
import {Borrowing} from "../../../model/borrowing.model";
import {BorrowingService} from "../../../services/borrowing.service";

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css']
})
export class UserEditPageComponent implements OnInit, OnDestroy {

  user: User;

  customers: Customer[] = [];

  borrowings: Borrowing[] = [];

  private userId: number;

  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private customerService: CustomerService,
    private router: Router,
    private borrowingService: BorrowingService,
  ) {
  }

  ngOnInit() {
    this.userId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getUser();
    /*    this.getCustomers();
        this.getBorrowings();*/
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getUser(): void {
    this.subscriptions.add(
      this.userService.getUser(this.userId)
        .subscribe(user => this.user = user[0])
    );
  }

  /*  getCustomers(): void {
      if (this.user) {
        this.subscriptions.add(
          this.customerService.getCustomer(this.user.customer.id)
            .subscribe(customer => this.customers = customer)
        );
      }
    }

    getBorrowings(): void {
      if (this.customers) {
        console.log(this.customers[0])
        this.subscriptions.add(
          this.borrowingService.getBorrowingsOfCustomer(this.customers[0]).subscribe(
            response => { this.borrowings = response
            console.log(this.borrowings)}
          )
        )
      }
    }*/

  updateUser(user: UserUpdateNameEmail): void {
    if (this.user) {
      this.subscriptions.add(
        this.userService.updateUser(this.userId, user)
          .subscribe(response => {
            this.user = response;
          })
      )
    }
  }

  routeCustomerAdmin(id: number): void {
    this.router.navigate(['customers', 'edit', id]);
  }

  routeBorrowingAdmin(id: number): void {
    this.router.navigate(['borrowings', 'edit', id]);
  }

  goBack(): void {
    this.router.navigate(['users'])
  }
}
