import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {BorrowingService} from "../../../services/borrowing.service";
import {BorrowingResponse} from "../../../responses/BorrowingResponse";
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
  pageable: Pageable
  column: string = 'id';
  asc: boolean = true;
  extendedRequest: ExtendedRequestModel;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(private borrowingService: BorrowingService) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPageChange(pageNumber: number): void {
    this.pageable = new Pageable(pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.asc);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.borrowingService.getBorrowings(this.extendedRequest).subscribe(response => this.borrowingResponse = response)
  }


  sort(sortBy: any): void {
    this.column = sortBy.column;
    this.asc = sortBy.ascending;
    if(sortBy.ascending === undefined){
      this.sortable = new Sortable('id', true);
    } else {
      this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    }
    this.pageable = new Pageable(1, this.pageSize);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.subscriptions.add(
      this.borrowingService.getBorrowings(this.extendedRequest).subscribe(response => {
        this.borrowingResponse = response;
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
      this.borrowingService.getBorrowings(this.extendedRequest).subscribe(response => {
        this.borrowingResponse = response
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount
      }));
  }

  protected readonly Number = Number;
}
