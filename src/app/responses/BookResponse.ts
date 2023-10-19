import {Book} from "../model/book.model";

export class BookResponse{
  pageNumber: number;
  pageSize: number;
  totalCount : number;
  borrowingCount: number;
  books: Book[];


  constructor(pageNumber: number, pageSize: number, totalCount: number, books: Book[], borrowingCount: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.books = books;
    this.borrowingCount = borrowingCount;
  }
}
