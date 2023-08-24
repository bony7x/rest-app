import {Borrowing} from "./borrowing.model";
import {BookCategory} from "./bookCategory";

export enum BookStatus {
  Available = 'Available',
  Not_available = 'Not available',
  Temporary_not_available = 'Temporary not available'
}

export class Book {
  id: number
  name: string
  count: number
  status: BookStatus
  isbn: string
  author: string
  categories: BookCategory[]
  borrowings: Borrowing[]


  constructor(id: number, name: string, count: number, status: BookStatus, isbn: string, author: string, bookCategories: BookCategory[], borrowings: Borrowing[]) {
    this.id = id;
    this.name = name;
    this.count = count;
    this.status = status;
    this.isbn = isbn;
    this.author = author;
    this.categories = bookCategories;
    this.borrowings = borrowings;
  }
}
