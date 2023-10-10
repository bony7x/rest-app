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

@Component({
  selector: 'app-borrowing-page',
  templateUrl: './borrowing-page.component.html',
  styleUrls: ['./borrowing-page.component.css']
})
export class BorrowingPageComponent implements OnInit, OnDestroy {

  borrowingResponse: BorrowingResponse;
  customerList: Customer[] = [];
  bookList: Book[] = [];
  private subscription: Subscription = new Subscription();
  pageNumber: number
  pageSize: number
  totalCount: number;
  sortable: Sortable = new Sortable('id', true);
  pageable: Pageable
  extendedRequest: ExtendedRequestModel
  isAdmin: boolean;

  @Output()
  paginationChange = new EventEmitter<number>();

  constructor(
    private borrowingService: BorrowingService,
    private router: Router,
    private bookService: BooksService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastService:ToastService,
    private authService: AuthenticationService) {
  }


  ngOnInit() {
    this.getBorrowings(this.pageNumber);
    this.getBooks();
    this.getCustomers();
    this.isAdminFn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getBorrowings(pageNumber: number) {
    if (this.pageNumber === undefined || this.pageSize === undefined || Number.isNaN(pageNumber)) {
      this.pageable = new Pageable(1, 5)
    } else {
      this.pageable = new Pageable(pageNumber, this.pageSize)
    }
    this.sortable = new Sortable('id', true);
    this.extendedRequest = new ExtendedRequestModel(this.sortable, this.pageable)
    this.subscription.add(
    this.borrowingService.getBorrowings(this.extendedRequest)
      .subscribe(response => {
        this.borrowingResponse = response;
        this.pageSize = response.pageSize;
        this.pageNumber = response.pageNumber;
        this.totalCount = response.totalCount;
        this.toastService.success('Loaded borrowings!')
      }));
  }

  onPageChange(pageNumber: number):void{
    this.getBorrowings(pageNumber)
  }

  getCustomers(): void {
    this.subscription.add(
    this.customerService.getCustomersGet()
      .subscribe(response => this.customerList = response));
  }

  getBooks(): void {
    this.subscription.add(
    this.bookService.getBooksGet()
      .subscribe(response => this.bookList = response));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  add(borrowing: BorrowingCreate) {
    this.subscription.add(
    this.borrowingService.addBorrowing(borrowing)
      .subscribe(response => {
        this.getBorrowings(this.pageNumber);
        this.toastService.success('Successfully added new borrowing!')
      }));
  }

  openModal(addBorrowingModal: TemplateRef<any>): void {
    this.modalService.open(addBorrowingModal,{size:'xl'});
  }

  editBorrowing(id: number): void {
    this.router.navigate(['borrowings', 'edit', id]);
  }

  showBorrowingDetail(id: number){
    this.router.navigate(['borrowings', 'detail', id]);
  }

  isAdminFn(){
    if(this.authService.getUserRole() === 'USER'){
      this.isAdmin = false;
    }
    if(this.authService.getUserRole() === 'ADMINISTRATOR'){
      this.isAdmin = true;
    }
  }
}
