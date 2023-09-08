import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Borrowing, BorrowingCreate} from "../../model/borrowing.model";
import {BorrowingService} from "../../services/borrowing.service";
import {MessageService} from "../../services/message.service";
import {Book} from "../../model/book.model";
import {Customer} from "../../model/customer.model";
import {BooksService} from "../../services/books.service";
import {CustomerService} from "../../services/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

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

    constructor(
        private borrowingService: BorrowingService,
        private messageService: MessageService,
        private router: Router,
        private bookService: BooksService,
        private customerService: CustomerService,
        private modalService: NgbModal) {
    }

    private log(message: string): void {
        this.messageService.add(`CustomerService: ${message}`);
    }

    ngOnInit() {
        this.getBorrowings();
        this.getBooks();
        this.getCustomers();
    }

    ngOnDestroy() {
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

    add(borrowing: BorrowingCreate) {
/*        if (borrowingCreate.bookId === undefined || borrowingCreate.customerId === undefined) {
            this.log('IDs cannot be empty');
            return;
        }
      this.borrowingService.addBorrowing(borrowingCreate)
        .subscribe(response => this.borrowings.push(response));*/

      if (borrowing.bookId === undefined || borrowing.customerId === undefined) {
        this.log('IDs cannot be empty');
        return;
      }
      this.borrowingService.addBorrowing(borrowing)
        .subscribe(response => this.borrowings.push(response));
      /*this.bookService.getBook(bookId).subscribe(book => {
        this.book = book;
        this.customerService.getCustomer(customerId).subscribe(customer => {
          this.customer = customer;
          const borrowing-page: BorrowingCreate = {
            bookId,
            customerId,
          };
          this.borrowingService.addBorrowing(borrowing-page)
            .subscribe(response => this.borrowings.push(response));
        });
      });*/
        //this.borrowingService.addBorrowing({bookId, customerId} as Borrowing).subscribe(borrowing-page => this.borrowings.push(borrowing-page));
    }

  openModal(addBorrowingModal: TemplateRef<any>): void {
    this.modalService.open(addBorrowingModal);
  }

  editBorrowing(id: number): void {
      this.router.navigate(['borrowings','detail',id]);
  }

    protected readonly Number = Number;
}
