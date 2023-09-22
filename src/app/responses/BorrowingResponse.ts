import {Borrowing} from "../model/borrowing.model";

export class BorrowingResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  borrowings: Borrowing[];


  constructor(pageNumber: number, pageSize: number, totalCount: number, books: Borrowing[]) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.borrowings = books;
  }
}
