import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pageable, Sortable} from "../../../model/extended-request.model";
import {BorrowingResponse} from "../../../responses/BorrowingResponse";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-borrowing-page-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.css']
})
export class BorrowingListComponent implements OnInit {

  @Input()
  borrowingResponse: BorrowingResponse;

  sortable: Sortable
  pageable: Pageable
  column: string = 'id';
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  isAdmin: boolean;

  @Output()
  editBorrowing = new EventEmitter<number>();

  @Output()
  borrowingDetail = new EventEmitter<number>();

  @Output()
  deleteBorrowing = new EventEmitter<number>();

  @Output()
  sortingChange = new EventEmitter<Sortable>();

  @Output()
  listingChange = new EventEmitter<Pageable>();

  constructor(
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.isAdminFn();
  }

  sort(sortBy: any): void {
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
