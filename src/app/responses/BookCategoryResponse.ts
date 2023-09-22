import {Book} from "../model/book.model";
import {BookCategory} from "../model/bookCategory";

export class BookCategoryResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  categories: BookCategory[];


  constructor(pageNumber: number, pageSize: number, totalCount: number, bookCategories: BookCategory[]) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.categories = bookCategories;
  }
}
