import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {Subscription} from "rxjs";
import {BookResponse} from "../../../responses/BookResponse";
import {AuthenticationService} from "../../../services/authentication.service";
import {Book} from "../../../model/book.model";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "angular-toastify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-page-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnDestroy, OnInit {

  @Input()
  bookResponse?: BookResponse;

  @Output()
  editBook = new EventEmitter<number>();

  @Output()
  bookDetail = new EventEmitter<number>();

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
  isAdmin: boolean = false;

  @Output()
  paginationChange = new EventEmitter<number>();

  onPageChange(pageNumber: number): void {
    this.pageable = new Pageable(pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.asc);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
    this.bookService.getBooks(this.extendedRequest).subscribe(response => this.bookResponse = response)
  }

  constructor(
    private bookService: BooksService,
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router) {
  }

  ngOnInit() {
    this.isAdminFn();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sort(sortBy: any): void {
    this.column = sortBy.column;
    this.asc = sortBy.ascending;
    if (sortBy.ascending === undefined) {
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

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  delete(book: Book): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent)
    modal.closed.subscribe(result => {
      if (result) {
        this.subscriptions.add(
          this.bookService.deleteBook(book.id).subscribe(() => {
            this.toastService.success('Book was successfully removed');
            this.sortable = new Sortable('id', true);
            this.pageable = new Pageable(1, this.pageSize);
            this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable);
            this.bookService.getBooks(this.extendedRequest).subscribe(response => {
              this.bookResponse=response
              this.pageNumber = response.pageNumber;
              this.pageSize = response.pageSize;
              this.totalCount = response.totalCount;
            });
          })
        )
      }
    })
  }

  protected readonly Number = Number;
}
