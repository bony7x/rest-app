import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Borrowing} from "../../model/borrowing.model";
import {Sortable} from "../../model/sortable";
import {Extendedrequest} from "../../model/extendedrequest";
import {BorrowingService} from "../../services/borrowing.service";
import {Pageable} from "../../model/pageable";
import {BorrowingResponse} from "../../responses/BorrowingResponse";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-borrowing-page-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.css']
})
export class BorrowingListComponent implements OnDestroy {

  @Input()
  borrowingResponse: BorrowingResponse;

  @Output()
  editBorrowing = new EventEmitter<number>();

  subscriptions: Subscription = new Subscription();
  sortable: Sortable
  pageable: Pageable = new Pageable(1, 5)
  extendedRequest: Extendedrequest;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(private borrowingService: BorrowingService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPageChange(pageNumber: number): void {
    this.paginationChange.emit(pageNumber);
  }

  sort(sortBy: any): void {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
      this.borrowingService.getBorrowings(this.extendedRequest).subscribe(response => this.borrowingResponse = response));
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
      this.borrowingService.getBorrowings(this.extendedRequest).subscribe(response => this.borrowingResponse = response))
  }

  protected readonly Number = Number;
}
