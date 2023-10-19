import {Book} from "./book.model";

export class BookCategory {
  id:number
  name:string
  books: Book[]
  bookCount: number


  constructor(id: number, name: string, books: Book[], bookCount: number) {
    this.id = id;
    this.name = name;
    this.books = books;
    this.bookCount = bookCount;
  }
}

export class BookCategoryCreate{
  name: string


  constructor(name: string) {
    this.name = name;
  }
}
