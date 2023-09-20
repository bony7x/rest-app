import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {Sortable} from "../../model/sort.model";
import {BooksService} from "../../services/books.service";
import {ExtendedRequest} from "../../model/extended-request";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {PaginationComponent} from "../../model/page";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  @Input()
  books: Book[] = [];

  @Output()
  editBook = new EventEmitter<number>();

  sortable: Sortable
  pageable: PaginationComponent
  extendedRequest: ExtendedRequest;
  numbers: number[] = [5,10,15,20,25,50,100]
  page: number = 1;
  pageSize: number = 5;

  constructor(private bookService: BooksService) {
  }

  sort(sortBy: any): void {
    this.sortable = new Sortable(sortBy.column,sortBy.ascending);
    this.extendedRequest = new ExtendedRequest(this.sortable,this.pageable);
    this.bookService.getBooks(this.extendedRequest).subscribe(book => this.books = book)
  }

  changeListingCount(count: number):void {
    this.pageSize = count;
    this.sortable = new Sortable('id',true);
    this.pageable = new PaginationComponent(this.page,this.pageSize);
    this.extendedRequest = new ExtendedRequest(this.sortable,this.pageable);
    this.bookService.getBooks(this.extendedRequest).subscribe(book => this.books = book)
  }

  protected readonly Number = Number;
}
