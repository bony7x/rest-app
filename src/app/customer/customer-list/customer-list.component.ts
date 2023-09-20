import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Customer} from "../../model/customer.model";
import {Sortable} from "../../model/sort.model";
import {ExtendedRequest} from "../../model/extended-request";
import {CustomerService} from "../../services/customer.service";
import {PaginationComponent} from "../../model/page";

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

  sortable: Sortable
  pageable: PaginationComponent
  extendedRequest: ExtendedRequest
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  page: number = 1;
  pageSize: number = 5;

  constructor(private customerService: CustomerService) {
  }

  sort(sortBy: any) {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.extendedRequest = new ExtendedRequest(this.sortable, this.pageable);
    this.customerService.getCustomers(this.extendedRequest).subscribe(customers => this.customers = customers)
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new PaginationComponent(this.page, this.pageSize);
    this.extendedRequest = new ExtendedRequest(this.sortable, this.pageable);
    this.customerService.getCustomers(this.extendedRequest).subscribe(customers => this.customers = customers)
  }

  protected readonly Number = Number;
}
