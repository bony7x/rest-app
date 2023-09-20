import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Borrowing} from "../../model/borrowing.model";
import {Sortable} from "../../model/sort.model";
import {ExtendedRequest} from "../../model/extended-request";
import {BorrowingService} from "../../services/borrowing.service";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {PaginationComponent} from "../../model/page";

@Component({
  selector: 'app-borrowing-page-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.css']
})
export class BorrowingListComponent {

  @Input()
  borrowings: Borrowing[] = [];

  @Output()
  editBorrowing = new EventEmitter<number>();

  sortable: Sortable
  pageable: PaginationComponent = new PaginationComponent(1, 5)
  extendedRequest: ExtendedRequest;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  page: number = 1;
  pageSize: number = 5;

  constructor(private borrowingService: BorrowingService) {
  }

  sort(sortBy: any): void {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.extendedRequest = new ExtendedRequest(this.sortable, this.pageable);
    this.borrowingService.getBorrowings(this.extendedRequest).subscribe(borrowings => this.borrowings = borrowings)
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new PaginationComponent(this.page, this.pageSize);
    this.extendedRequest = new ExtendedRequest(this.sortable, this.pageable);
    this.borrowingService.getBorrowings(this.extendedRequest).subscribe(borrowings => this.borrowings = borrowings)
  }

  protected readonly Number = Number;
}
