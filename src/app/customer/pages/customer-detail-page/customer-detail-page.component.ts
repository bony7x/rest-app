import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer, CustomerCreate} from "../../../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";

@Component({
  selector: 'app-customer-page-detail',
  templateUrl: './customer-detail-page.component.html',
  styleUrls: ['./customer-detail-page.component.css']
})
export class CustomerDetailPageComponent implements OnInit, OnDestroy {

  customer?: Customer;

  private customerId: number;

  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private toastService: ToastService,
    private modalService: NgbModal
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
          this.toastService.success('Loaded the customer!')
        }));
  }
}
