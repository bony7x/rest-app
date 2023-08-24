import {Book} from "./book.model";

export class Borrowing {
  id: number

  dateOfBorrowing: Date;

  book: Book;

  constructor(id: number, dateOfBorrowing: Date, book: Book) {
    this.id = id;
    this.dateOfBorrowing = dateOfBorrowing;
    this.book = book;
  }
}
