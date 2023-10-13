import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer, CustomerCreate} from "../../../model/customer.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-customer-edit-page',
  templateUrl: './customer-edit-page.component.html',
  styleUrls: ['./customer-edit-page.component.css']
})
export class CustomerEditPageComponent implements OnInit, OnDestroy {

  customer?: Customer;

  private customerId: number;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.customerId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getCustomer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  goBack(): void {
    this.router.navigate(['customers'])
  }

  getCustomer() {
    this.subscription.add(
      this.customerService.getCustomer(this.customerId)
        .subscribe(customer => {
          this.customer = customer[0];
        }));
  }

  updateCustomer(customer: CustomerCreate): void {
    if (this.customer) {
      this.subscription.add(
        this.customerService.updateCustomer(this.customerId, customer)
          .subscribe(response => {
            this.getCustomer();
            this.toastService.success('Successfully updated the customer!')
          }));
    }
  }

  routeBorrowingAdmin(id: number) {
    this.router.navigate(['borrowings', 'edit', id]);
  }

  routeBookAdmin(id: number) {
    this.router.navigate(['books', 'edit', id]);
  }
}
