import {Injectable} from '@angular/core';
import {Book, BookCreate} from "../model/book.model";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private booksUrl = 'http://localhost:8080/api/books';

  httpOptions = {
    // headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
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
}
