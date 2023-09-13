import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Customer, CustomerCreate} from "../../model/customer.model";
import {CustomerService} from "../../services/customer.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getCustomers(): void {
    this.subscriptions.add(
      this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
        this.toastService.success('Loaded customers!')
      }));
  }

  openModal(addCustomerModal: TemplateRef<any>): void {
    this.modalService.open(addCustomerModal);
  }

  add(customer: CustomerCreate): void {
    this.subscriptions.add(
      this.customerService.addCustomer(customer)
      .subscribe(customer => {
        this.getCustomers();
        this.toastService.success('Successfully added new customer!');
      }));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editCustomer(id: number): void {
    this.router.navigate(['customers', 'detail', id]);
  }
}
