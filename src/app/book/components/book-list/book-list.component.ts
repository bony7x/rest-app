import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pageable, Sortable} from "../../../model/extended-request.model";
import {BookResponse} from "../../../responses/BookResponse";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  @Input()
  bookResponse?: BookResponse;

  sortable: Sortable
  pageable: Pageable
  column: string = 'id';
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  isAdmin: boolean = false;

  @Output()
  sortingChange = new EventEmitter<Sortable>();

  @Output()
  listingChange = new EventEmitter<Pageable>();

  @Output()
  editBook = new EventEmitter<number>();

  @Output()
  deleteBook = new EventEmitter<number>();

  @Output()
  bookDetail = new EventEmitter<number>();

  constructor(
    private authService: AuthenticationService,) {
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
