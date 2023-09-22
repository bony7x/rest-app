import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Sortable} from "../../model/sortable";
import {BooksService} from "../../services/books.service";
import {Extendedrequest} from "../../model/extendedrequest";
import {Pageable} from "../../model/pageable";
import {Subscription} from "rxjs";
import {BookResponse} from "../../responses/BookResponse";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnDestroy{

  @Input()
  bookResponse: BookResponse;

  @Output()
  editBook = new EventEmitter<number>();

  subscriptions: Subscription = new Subscription();
  sortable: Sortable
  pageable: Pageable
  extendedRequest: Extendedrequest;
  numbers: number[] = [5, 10, 15, 20, 25, 50, 100]
  pageNumber: number = 1;
  pageSize: number = 5;

  @Output()
  paginationChange = new EventEmitter<number>();

  onPageChange(pageNumber: number):void{
    this.paginationChange.emit(pageNumber);
  }

  constructor(private bookService: BooksService,) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sort(sortBy: any): void {
    this.sortable = new Sortable(sortBy.column, sortBy.ascending);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
    this.bookService.getBooks(this.extendedRequest).subscribe(response => {
      this.bookResponse = response;
    }));
  }

  changeListingCount(count: number): void {
    this.pageSize = count;
    this.sortable = new Sortable('id', true);
    this.pageable = new Pageable(this.pageNumber, this.pageSize);
    this.extendedRequest = new Extendedrequest(this.sortable, this.pageable);
    this.subscriptions.add(
    this.bookService.getBooks(this.extendedRequest).subscribe(response => {
      this.bookResponse = response;
    }));
  }

  protected readonly Number = Number;
}
