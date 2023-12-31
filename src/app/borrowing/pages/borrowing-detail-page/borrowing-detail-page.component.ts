import {Component, OnDestroy, OnInit} from '@angular/core';
import {Borrowing} from "../../../model/borrowing.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BorrowingService} from "../../../services/borrowing.service";
import {BooksService} from "../../../services/books.service";
import {CustomerService} from "../../../services/customer.service";
import {Book} from "../../../model/book.model";
import {Customer} from "../../../model/customer.model";
import {Subscription} from "rxjs";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-borrowing-page-detail',
  templateUrl: './borrowing-detail-page.component.html',
  styleUrls: ['./borrowing-detail-page.component.css']
})
export class BorrowingDetailPageComponent implements OnInit, OnDestroy {

  borrowing?: Borrowing;

  private borrowingId: number

  bookList: Book[] = [];
  customerList: Customer[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private borrowingService: BorrowingService,
    private router: Router,
    private bookService: BooksService,
    private customerService: CustomerService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.borrowingId = Number.parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getBorrowing();
    this.getBooks();
    this.getCustomers();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['borrowings'])
  }

  getBorrowing(): void {
    this.subscriptions.add(
      this.borrowingService.getBorrowing(this.borrowingId)
        .subscribe(borrowing => {
          this.borrowing = borrowing[0];
          this.toastService.success('Loaded borrowing!')
        }));
  }

  getCustomers(): void {
    this.subscriptions.add(
      this.customerService.getCustomersGet()
        .subscribe(customers => this.customerList = customers));
  }

  getBooks(): void {
    this.subscriptions.add(
      this.bookService.getBooksGet()
        .subscribe(books => this.bookList = books));
  }

  routeCustomer(id: number) {
    this.router.navigate(['customers', 'detail', id])
  }

  routeBook(id: number): void {
    this.router.navigate(['books', 'detail', id])
  }

}

