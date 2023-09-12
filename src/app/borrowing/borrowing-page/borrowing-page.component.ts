import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Borrowing, BorrowingCreate} from "../../model/borrowing.model";
import {BorrowingService} from "../../services/borrowing.service";
import {Book} from "../../model/book.model";
import {Customer} from "../../model/customer.model";
import {BooksService} from "../../services/books.service";
import {CustomerService} from "../../services/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-borrowing-page',
  templateUrl: './borrowing-page.component.html',
  styleUrls: ['./borrowing-page.component.css']
})
export class BorrowingPageComponent implements OnInit, OnDestroy {

  borrowings: Borrowing[] = [];
  customerList: Customer[] = [];
  bookList: Book[] = [];

  book: Book;
  customer: Customer;

  private borrowingSubscriber: Subscription

  constructor(
    private borrowingService: BorrowingService,
    private router: Router,
    private bookService: BooksService,
    private customerService: CustomerService,
    private modalService: NgbModal) {
  }


  ngOnInit() {
    this.getBorrowings();
    this.getBooks();
    this.getCustomers();
  }

  ngOnDestroy() {
    if(this.borrowingSubscriber){
      this.borrowingSubscriber.unsubscribe();
    }
  }

  getBorrowings() {
    this.borrowingService.getBorrowings()
      .subscribe(borrowings => this.borrowings = borrowings);
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customerList = customers);
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.bookList = books);
  }

  goBack(): void {
    this.router.navigate(['dashboard'])
  }

  add(borrowing: BorrowingCreate) {
    if (borrowing.bookId === undefined || borrowing.customerId === undefined) {
      return;
    }
    this.borrowingService.addBorrowing(borrowing)
      .subscribe(response => this.borrowings.push(response));
  }

  openModal(addBorrowingModal: TemplateRef<any>): void {
    this.modalService.open(addBorrowingModal);
  }

  editBorrowing(id: number): void {
    this.router.navigate(['borrowings', 'detail', id]);
  }
}
