import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Sortable} from "../../model/sortable";
import {Extendedrequest} from "../../model/extendedrequest";
import {CustomerService} from "../../services/customer.service";
import {Pageable} from "../../model/pageable";
import {CustomerResponse} from "../../responses/CustomerResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnDestroy {

  @Input()
  customerResponse: CustomerResponse;

  @Output()
  editCustomer = new EventEmitter<number>();

  subscriptions: Subscription = new Subscription();
  sortable: Sortable
  pageable: Pageable
  extendedRequest: Extendedrequest;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;

  @Output()
  paginationChange = new EventEmitter<number>();


  constructor(private customerService: CustomerService) {
  }

  onPageChange(pageNumber: number): void {
    this.paginationChange.emit(pageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sort(sortBy: any) {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest).subscribe(response => this.customerResponse = response));
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest).subscribe(response => this.customerResponse = response));
  }


  protected readonly Number = Number;

}
