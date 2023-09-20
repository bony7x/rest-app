import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Borrowing, BorrowingCreate} from "../../model/borrowing.model";
import {BorrowingService} from "../../services/borrowing.service";
import {Book} from "../../model/book.model";
import {Customer} from "../../model/customer.model";
import {BooksService} from "../../services/books.service";
import {CustomerService} from "../../services/customer.service";
import {NgbModal, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";
import {Sortable} from "../../model/sort.model";
import {ExtendedRequest} from "../../model/extended-request";
import {PaginationComponent} from "../../model/page";

@Component({
  selector: 'app-borrowing-page',
  templateUrl: './borrowing-page.component.html',
  styleUrls: ['./borrowing-page.component.css']
})
export class BorrowingPageComponent implements OnInit, OnDestroy {

  borrowings: Borrowing[] = [];
  customerList: Customer[] = [];
  bookList: Book[] = [];

  private subscription: Subscription = new Subscription();
  sortable: Sortable = new Sortable('id',true);
  pageable: PaginationComponent = new PaginationComponent(1,5)
  extendedRequest: ExtendedRequest = new ExtendedRequest(this.sortable,this.pageable);

  constructor(
    private borrowingService: BorrowingService,
    private router: Router,
    private bookService: BooksService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastService:ToastService) {
  }


  ngOnInit() {
    this.getBorrowings();
    this.getBooks();
    this.getCustomers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  getBorrowings() {
    this.subscription.add(
    this.borrowingService.getBorrowings(this.extendedRequest)
      .subscribe(borrowings => {
        this.borrowings = borrowings;
        this.toastService.success('Loaded borrowings!')
      }));
  }

  getCustomers(): void {
    this.subscription.add(
    this.customerService.getCustomers(this.extendedRequest)
      .subscribe(customers => this.customerList = customers));
  }

  getBooks(): void {
    this.subscription.add(
    this.bookService.getBooks(this.extendedRequest)
      .subscribe(books => this.bookList = books));
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  add(borrowing: BorrowingCreate) {
    this.subscription.add(
    this.borrowingService.addBorrowing(borrowing)
      .subscribe(response => {
        this.getBorrowings();
        this.toastService.success('Successfully added new borrowing!')
      }));
  }

  openModal(addBorrowingModal: TemplateRef<any>): void {
    this.modalService.open(addBorrowingModal);
  }

  editBorrowing(id: number): void {
    this.router.navigate(['borrowings', 'detail', id]);
  }
}
