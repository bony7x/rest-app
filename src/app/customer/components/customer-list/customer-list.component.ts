import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pageable, Sortable} from "../../../model/extended-request.model";
import {CustomerResponse} from "../../../responses/CustomerResponse";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @Input()
  customerResponse: CustomerResponse;

  sortable: Sortable
  pageable: Pageable
  column: string = 'id'
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  isAdmin: boolean;

  @Output()
  sortingChange = new EventEmitter<Sortable>();

  @Output()
  listingChange = new EventEmitter<Pageable>();

  @Output()
  editCustomer = new EventEmitter<number>();

  @Output()
  customerDetail = new EventEmitter<number>();

  @Output()
  deleteCustomer = new EventEmitter<number>();


  constructor(
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.isAdminFn()
  }

  sort(sortBy: any) {
    this.column = sortBy.column;
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.sortingChange.emit(this.sortable);
  }

  changeListingCount(count: number): void {
    this.pageable = new Pageable(1, count);
    this.listingChange.emit(this.pageable);
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  protected readonly Number = Number;
}
