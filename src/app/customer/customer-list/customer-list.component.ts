import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ExtendedRequestModel, Pageable, Sortable} from "../../model/extended-request.model";
import {CustomerService} from "../../services/customer.service";
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
  column: string;
  asc: boolean;
  extendedRequest: ExtendedRequestModel;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number;

  @Output()
  paginationChange = new EventEmitter<number>();


  constructor(private customerService: CustomerService) {
  }

  onPageChange(pageNumber: number): void {
    this.pageable = new Pageable(pageNumber,this.pageSize)
    this.sortable = new Sortable(this.column,this.asc);
    this.extendedRequest = new ExtendedRequestModel(this.sortable,this.pageable);
    this.customerService.getCustomers(this.extendedRequest).subscribe(response => this.customerResponse = response)
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sort(sortBy: any) {
    this.column = sortBy.column;
    this.asc = sortBy.ascending;
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.pageable = new Pageable(1, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest).subscribe(response => {
        this.customerResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.pageNumber = 1;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.customerService.getCustomers(this.extendedRequest).subscribe(response => {
        this.customerResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }


  protected readonly Number = Number;

}
