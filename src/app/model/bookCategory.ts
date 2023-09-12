import {Book} from "./book.model";

export class BookCategory {
  id:number
  name:string
  books: Book[]


  constructor(id: number, name: string, books: Book[]) {
    this.id = id;
    this.name = name;
    this.books = books;
  }
}

export class BookCategoryCreate{
  name: string


  constructor(name: string) {
    this.name = name;
  }
}
