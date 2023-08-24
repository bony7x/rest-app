import {Book, BookStatus} from "./model/book.model";

export const BOOKS: Book[] = [
  {
    id: 1,
    name: 'HP',
    count: 4,
    status: BookStatus.Available,
    isbn: 'isbn',
    author: 'Rowling',
    categories: [],
    borrowings: [],
  },
  {
    id: 2,
    name: 'HP',
    count: 4,
    status: BookStatus.Not_available,
    isbn: 'isbn',
    author: 'Rowling',
    categories: [],
    borrowings: [],
  },
  {
    id: 3,
    name: 'HP',
    count: 4,
    status: BookStatus.Temporary_not_available,
    isbn: 'isbn',
    author: 'Rowling',
    categories: [],
    borrowings: [],
  }
]
