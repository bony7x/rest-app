import {Injectable} from '@angular/core';
import {Book, BookCreate} from "../model/book.model";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
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

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add(`BooksService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(_ => this.log('fetched book-page')),
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  addBook(book: BookCreate): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: Book) => this.log(`added Book with
       id = ${newBook.id}
      , name = ${newBook.name}
      , author = ${newBook.author}
      , count = ${newBook.count}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  searchBook(name: string): Observable<Book[]> {
    const url = `${this.booksUrl}/?name=${name}`;
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(url).pipe(
      tap(x => x.length ?
          this.log(`found books matching "${name}"`) :
          this.log(`no books matching "${name}"`),
        catchError(this.handleError<Book[]>('searchBooks', [])))
    );
  }

  searchBookById(id: number): Observable<Book[]> {
    return this.http.get<Array<Book>>(`${this.booksUrl}/${id}`);
  }

  updateBook(bookId: number, book: BookCreate): Observable<Book> {
    console.log('BOOKID', bookId);
    const url = `${this.booksUrl}/${bookId}`;
    return this.http.put<Book>(url, book,this.httpOptions);
  }

  deleteBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted book ID = ${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  addCategoryToBook(bookId: number, categoryId: number): Observable<any> {
    const url = `${this.booksUrl}/${bookId}/bookCategory/${categoryId}`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => this.log(`added book category ID = ${categoryId} to book ID = ${bookId}`)),
      catchError(this.handleError<any>('addCategoryToBook'))
    );
  }

  removeCategoryFromBook(bookId: number, categoryId: number): Observable<any> {
    const url = `${this.booksUrl}/${bookId}/bookCategory/${categoryId}`;
    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`removed book category ID = ${categoryId} from book ID = ${bookId}`)),
      catchError(this.handleError<any>('removeCategoryFromBook'))
    );
  }
}
