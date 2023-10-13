import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Borrowing} from "../../../model/borrowing.model";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";

@Component({
  selector: 'app-borrowing-list-dashboard',
  templateUrl: './borrowing-list-dashboard.component.html',
  styleUrls: ['./borrowing-list-dashboard.component.css']
})
export class BorrowingListDashboardComponent implements OnInit {

  @Input()
  borrowings: Borrowing[];
  sortable: Sortable = new Sortable('dateOfBorrowing', false);
  pageable: Pageable = new Pageable(1, 5);
  request: ExtendedRequestModel = new ExtendedRequestModel(this.sortable, this.pageable);

  @Output()
  displayBorrowings = new EventEmitter<ExtendedRequestModel>();

  constructor() {
  }

  ngOnInit() {
    this.getLatestBorrowings()
  }

  getLatestBorrowings(): void {
    this.displayBorrowings.emit(this.request);
  }
}
