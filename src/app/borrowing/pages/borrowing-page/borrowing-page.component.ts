import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {BorrowingCreate} from "../../../model/borrowing.model";
import {BorrowingService} from "../../../services/borrowing.service";
import {Book} from "../../../model/book.model";
import {Customer} from "../../../model/customer.model";
import {BooksService} from "../../../services/books.service";
import {CustomerService} from "../../../services/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {ExtendedRequestModel, Pageable, Sortable} from "../../../model/extended-request.model";
import {BorrowingResponse} from "../../../responses/BorrowingResponse";
import {AuthenticationService} from "../../../services/authentication.service";
import {ConfirmDeletionModalComponent} from "../../../confirm-deletion-modal/confirm-deletion-modal.component";

@Component({
  selector: 'app-borrowing-page',
  templateUrl: './borrowing-page.component.html',
  styleUrls: ['./borrowing-page.component.css']
})
export class BorrowingPageComponent implements OnInit, OnDestroy {

  borrowingResponse: BorrowingResponse;
  customerList: Customer[] = [];
  bookList: Book[] = [];
  private subscriptions: Subscription = new Subscription();
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  column: string = 'id';
  ascending: boolean = true;
  sortable: Sortable = new Sortable('id', true);
  pageable: Pageable
  extendedRequest: ExtendedRequestModel
  map: Map<string, string> = new Map<string, string>()
    .set('name', '')
    .set('email', '')
    .set('date', '');
  isAdmin: boolean;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private borrowingService: BorrowingService,
    private router: Router,
    private bookService: BooksService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.getBorrowings();
    this.getBooks();
    this.getCustomers();
    this.isAdminFn();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getBorrowings() {
    this.pageable = new Pageable(this.pageNumber, this.pageSize)
    this.sortable = new Sortable(this.column, this.ascending);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.extendedRequest.filter = Object.fromEntries(this.map);
    this.subscriptions.add(
      this.borrowingService.getBorrowings(this.extendedRequest)
        .subscribe(response => {
          this.borrowingResponse = response;
          this.pageSize = response.pageSize;
          this.pageNumber = response.pageNumber;
          this.totalCount = response.totalCount;
        }));
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.getBorrowings();
  }

  onSortChange(sortable: Sortable): void {
    this.column = sortable.column;
    this.ascending = sortable.ascending
    this.pageNumber = 1;
    this.getBorrowings();
  }

  onListingChange(pageable: Pageable): void {
    this.pageNumber = pageable.pageNumber;
    this.pageSize = pageable.pageSize
    this.getBorrowings();
  }

  getCustomers(): void {
    this.subscriptions.add(
      this.customerService.getCustomersGet()
        .subscribe(response => this.customerList = response));
  }

  getBooks(): void {
    this.subscriptions.add(
      this.bookService.getBooksGet()
        .subscribe(response => this.bookList = response));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  add(borrowing: BorrowingCreate) {
    this.subscriptions.add(
      this.borrowingService.addBorrowing(borrowing)
        .subscribe(response => {
          this.getBorrowings();
          this.toastService.success('Successfully added new borrowing!')
        }));
  }

  openModal(addBorrowingModal: TemplateRef<any>): void {
    this.modalService.open(addBorrowingModal, {size: 'xl'});
  }

  editBorrowing(id: number): void {
    this.router.navigate(['borrowings', 'edit', id]);
  }

  showBorrowingDetail(id: number) {
    this.router.navigate(['borrowings', 'detail', id]);
  }

  isAdminFn() {
    if (this.authService.getUserRole() === 'USER') {
      this.isAdmin = false;
    }
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isAdmin = true;
    }
  }

  deleteBorrowing(id: number): void {
    const modal = this.modalService.open(ConfirmDeletionModalComponent);
    modal.closed.subscribe(result => {
      if (result) {
        this.subscriptions.add(
          this.borrowingService.deleteBorrowing(id).subscribe(() => {
            this.toastService.success('Borrowing was successfully removed');
            this.getBorrowings();
          }))
      }
    })
  }

  filterBorrowings(map: Map<string, string>): void {
    this.map = map;
    this.getBorrowings()
  }
}
