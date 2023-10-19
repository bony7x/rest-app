import {Borrowing} from "../model/borrowing.model";

export class BorrowingResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  borrowings: Borrowing[];
  borrowingCount: number;


  constructor(pageNumber: number, pageSize: number, totalCount: number, books: Borrowing[], borrowingCount: number) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.borrowings = books;
    this.borrowingCount = borrowingCount;
  }
}
