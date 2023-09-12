import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Customer} from "../../model/customer.model";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  @Input()
  customers: Customer[] = [];

  @Output()
  editCustomer = new EventEmitter<number>();
}
