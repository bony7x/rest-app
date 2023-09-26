import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {ExtendedRequestModel, Pageable, Sortable} from "../../model/extended-request.model";
import {Subscription} from "rxjs";
import {BookResponse} from "../../responses/BookResponse";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnDestroy {

  @Input()
  bookResponse?: BookResponse;

  @Output()
  editBook = new EventEmitter<number>();

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

  onPageChange(pageNumber: number): void {
    this.pageable = new Pageable(pageNumber,this.pageSize)
    this.sortable = new Sortable(this.column,this.asc);
    this.extendedRequest = new ExtendedRequestModel(this.sortable,this.pageable);
    this.bookService.getBooks(this.extendedRequest).subscribe(response => this.bookResponse = response)
  }

  constructor(private bookService: BooksService,) {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
      this.bookService.getBooks(this.extendedRequest).subscribe(response => {
        this.bookResponse = response;
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
      this.bookService.getBooks(this.extendedRequest).subscribe(response => {
        this.bookResponse = response;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
        this.totalCount = response.totalCount;
      }));
  }

  protected readonly Number = Number;
}
