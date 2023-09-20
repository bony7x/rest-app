import {Injectable} from '@angular/core';
import {Book, BookCreate} from "../model/book.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ExtendedRequest} from "../model/extended-request";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private booksUrl = 'http://localhost:8080/api/books';

  httpOptions = {};

  constructor(private http: HttpClient) {
  }

  getBooks(extendedRequest: ExtendedRequest): Observable<Book[]> {
    const url = `${this.booksUrl}/all`
    return this.http.post<Book[]>(url,extendedRequest)
  }

  getBooksGet():Observable<Book[]>{
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
  }

  addBook(book: BookCreate): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions)
  }

  searchBook(name: string): Observable<Book[]> {
    const url = `${this.booksUrl}/?name=${name}`;
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(url)
  }

  updateBook(bookId: number, book: BookCreate): Observable<Book> {
    const url = `${this.booksUrl}/${bookId}`;
    return this.http.put<Book>(url, book,this.httpOptions);
  }

  deleteBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions)
  }

  addCategoryToBook(bookId: number, categoryId: number[]): Observable<any> {
    const url = `${this.booksUrl}/${bookId}/bookCategory`;
    console.log(categoryId)
    return this.http.put<Book>(url, categoryId, this.httpOptions)
  }

  removeCategoryFromBook(bookId: number, categoryId: number[]): Observable<any> {
    const url = `${this.booksUrl}/${bookId}/bookCategory`;
    return this.http.delete<Book>(url, this.httpOptions)
  }

  updateBookCategories(bookId: number, categoryIds: number[]): Observable<any>{
    const url = `${this.booksUrl}/${bookId}/bookCategory`;
    return this.http.put<Book>(url, categoryIds,this.httpOptions)
  }
}
