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
  sortable: Sortable = new Sortable(this.column, this.ascending);
  pageable: Pageable = new Pageable(this.pageNumber, this.pageSize);
  map = new Map<string, string>()
    .set('name','')
    .set('author','')
    .set('category','');
  extendedRequest: ExtendedRequestModel = new ExtendedRequestModel(this.sortable, this.pageable);
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
    this.getBooks(this.extendedRequest);
    this.isAdminFn();
    this.categoryService.getBookCategoriesGET().subscribe(response => {
      this.bookCategory = response
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBooks(request: ExtendedRequestModel): void {
    this.pageable = new Pageable(request.pageable.pageNumber, request.pageable.pageSize)
    this.sortable = new Sortable(request.sortable.column, request.sortable.ascending);
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

  onPageChange(pageable: Pageable): void {
    this.extendedRequest.pageable = pageable;
    this.getBooks(this.extendedRequest);
  }

  onSortChange(sortable: Sortable): void {
    this.extendedRequest.sortable = sortable;
    this.getBooks(this.extendedRequest);
  }

  onListingChange(request: ExtendedRequestModel): void {
    this.extendedRequest.pageable = request.pageable
    this.getBooks(this.extendedRequest);
  }

  openModal(addBookModal: TemplateRef<any>): void {
    this.modalService.open(addBookModal);
  }

  add(book: BookCreate): void {
    this.bookService.addBook(book)
      .subscribe(() => {
        this.getBooks(this.extendedRequest);
        this.toastService.success('Successfully added new book!')
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  editBook(id: number): void {
    console.log("edit book")
    this.router.navigate(['books', 'edit', id]);
  }

  showBookDetail(id: number): void {
    this.router.navigate(['books', 'detail', id]);
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
    this.extendedRequest.filter = Object.fromEntries(this.map);
    this.map = map;
    this.getBooks(this.extendedRequest)
  }

  protected readonly Number = Number;
}
