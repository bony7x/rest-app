import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Customer, CustomerCreate} from "../../model/customer.model";
import {CustomerService} from "../../services/customer.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  customer: Customer;

  private customerSubscriber: Subscription;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy(): void {
    if (this.customerSubscriber) {
      this.customerSubscriber.unsubscribe();
    }
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  openModal(addCustomerModal: TemplateRef<any>): void {
    this.modalService.open(addCustomerModal);
  }

  add(customer: CustomerCreate): void {
    this.customerService.addCustomer(customer)
      .subscribe(customer => {
        this.customers.push(customer)
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCustomer(id: number): void {
    this.router.navigate(['customers', 'detail', id]);
  }
}
