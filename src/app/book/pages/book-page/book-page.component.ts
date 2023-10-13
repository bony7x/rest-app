import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {Book, BookCreate} from "../../../model/book.model";
import {BooksService} from "../../../services/books.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {BookResponse} from "../../../responses/BookResponse";
import {AuthenticationService} from "../../../services/authentication.service";
import {BookCategory} from "../../../model/bookCategory";
import {BookCategoriesService} from "../../../services/book-categories.service";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit, OnDestroy {

  bookResponse: BookResponse;
  book: Book;
  bookCategory: BookCategory[];
  subscriptions: Subscription = new Subscription();
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  column: string = 'id';
  ascending: boolean = true;
  sortable: Sortable;
  pageable: Pageable;
  map = new Map<string, string>()
    .set('name', '')
    .set('author', '')
    .set('category', '');
  extendedRequest: ExtendedRequestModel;
  isAdmin = false;

  constructor(
    private bookService: BooksService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private categoryService: BookCategoriesService) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.isAdminFn();
    this.categoryService.getBookCategoriesGET().subscribe(response => {
      this.bookCategory = response
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBooks(): void {
    this.pageable = new Pageable(this.pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.ascending);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.extendedRequest.filter = Object.fromEntries(this.map);
    this.subscriptions.add(
      this.bookService.getBooks(this.extendedRequest)
        .subscribe(response => {
          this.bookResponse = response;
          this.pageSize = response.pageSize;
          this.pageNumber = response.pageNumber;
          this.totalCount = response.totalCount;
        }));
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getBooks();
  }

  onSortChange(sortable: Sortable): void {
    this.column = sortable.column;
    this.ascending = sortable.ascending
    this.pageNumber = 1;
    this.getBooks();
  }

  onListingChange(pageable: Pageable): void {
    this.pageNumber = pageable.pageNumber;
    this.pageSize = pageable.pageSize
    this.getBooks();
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(() => {
        this.getBooks();
        this.toastService.success('Successfully added new book!')
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    this.router.navigate(['books', 'edit', id]);
  }

  showBookDetail(id: number): void {
    this.router.navigate(['books', 'detail', id]);
  }

  deleteBook(id: number): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent)
    modal.closed.subscribe(result => {
      if (result) {
        this.subscriptions.add(
          this.bookService.deleteBook(id).subscribe(() => {
            this.toastService.success('Book was successfully removed');
            this.getBooks()
          })
        )
      }
    })
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  filterBooks(map: Map<string, string>): void {
    this.map = map;
    this.getBooks()
  }

  protected readonly Number = Number;
}
