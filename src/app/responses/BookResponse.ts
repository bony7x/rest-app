import {Book} from "../model/book.model";

export class BookResponse{
  pageNumber: number;
  pageSize: number;
  totalCount : number;
  books: Book[];


  constructor(pageNumber: number, pageSize: number, totalCount: number, books: Book[]) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.books = books;
  }
}
