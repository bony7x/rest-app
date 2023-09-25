import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../model/book.model";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../model/extended-request.model";
import {BookResponse} from "../../responses/BookResponse";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit, OnDestroy {

  bookResponse: BookResponse;
  book: Book;
  subscriptions: Subscription = new Subscription();
  pageNumber: number
  pageSize: number
  totalCount: number;
  sortable: Sortable = new Sortable('id', true);
  pageable: Pageable
  extendedRequest: ExtendedRequestModel

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private bookService: BooksService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getBooks(this.pageNumber);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBooks(pageNumber: number): void {
    if (this.pageNumber === undefined || this.pageSize === undefined || Number.isNaN(pageNumber)) {
      this.pageable = new Pageable(1, 5)
    } else {
      this.pageable = new Pageable(pageNumber, this.pageSize)
    }
    this.sortable = new Sortable('id', true);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.subscriptions.add(
      this.bookService.getBooks(this.extendedRequest)
        .subscribe(response => {
          this.bookResponse = response;
          this.pageSize = response.pageSize;
          this.pageNumber = response.pageNumber;
          this.totalCount = response.totalCount;
          this.toastService.success('Loaded all books!')
        }));
  }

  onPageChange(pageNumber: number): void {
    this.getBooks(pageNumber);
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(() => {
        this.getBooks(this.pageNumber);
        this.toastService.success('Successfully added new book!')
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }

  protected readonly Number = Number;
}
