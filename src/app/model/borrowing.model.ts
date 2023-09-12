import {Book} from "./book.model";
import {Customer} from "./customer.model";

export class Borrowing {

    id: number

    dateOfBorrowing: Date;

    book: Book;

    customer: Customer;

    constructor(id: number, dateOfBorrowing: Date, book: Book, customer: Customer) {
        this.id = id;
        this.dateOfBorrowing = dateOfBorrowing;
        this.book = book;
        this.customer = customer;
    }
}

export class BorrowingCreate {

  bookId: number

  customerId: number

  constructor(bookId: number, customerId: number) {
    this.bookId = bookId;
    this.customerId = customerId;
  }
}
