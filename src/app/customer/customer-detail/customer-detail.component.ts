import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../model/book.model";
import {Observable} from "rxjs";
import {CustomerComponent} from "../customer/customer.component";
import {Customer} from "../../model/customer.model";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../customer.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit{

  @Input() customer?: Customer;

  private customerId: number;

  constructor(
      private route: ActivatedRoute,
      private customerService: CustomerService,
      private location: Location
  ) {
  }

  ngOnInit() {
    this.customerId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getCustomer();
  }

  goBack(): void {
    this.location.back();
  }

  getCustomer(){
    this.customerService.getCustomer(this.customerId)
        .subscribe(customer => this.customer = customer);
  }

  delete(customer: Customer): void {
    this.customerService.deleteCustomer(customer.id).subscribe(() => this.goBack());
  }

 updateCustomer(firstName: string,lastName:string,email:string): void {
    if(this.customer){
      this.customer = {
        ...this.customer,
        firstName,
        lastName,
        email
      }
      this.customerService.updateCustomer(this.customerId,this.customer)
          .subscribe(()=>this.goBack());
    }
 }
}
