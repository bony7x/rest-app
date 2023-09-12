import {Component, Input, OnInit} from '@angular/core';
import {Customer} from "../../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-page-detail',
  templateUrl: './customer-detail-page.component.html',
  styleUrls: ['./customer-detail-page.component.css']
})
export class CustomerDetailPageComponent implements OnInit {

  @Input() customer?: Customer;

  private customerId: number;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.customerId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getCustomer();
  }

  goBack(): void {
    this.router.navigate(['customers'])
  }

  getCustomer() {
    this.customerService.getCustomer(this.customerId)
      .subscribe(customer => this.customer = customer);
  }

  delete(customer: Customer): void {
    this.customerService.deleteCustomer(customer.id).subscribe(() => this.goBack());
  }

  updateCustomer(firstName: string, lastName: string, email: string): void {
    if (this.customer) {
      this.customer = {
        ...this.customer,
        firstName,
        lastName,
        email
      }
      this.customerService.updateCustomer(this.customerId, this.customer)
        .subscribe(() => this.goBack());
    }
  }
}
