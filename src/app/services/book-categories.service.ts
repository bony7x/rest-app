import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {BookCategory} from "./model/bookCategory";
import {Book} from "./model/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookCategoriesService {

  private booksCategoriesUrl = 'http://localhost:8080/api/bookCategories';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private log(message: string) {
    this.messageService.add(`BookCategoriesService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.http.get<BookCategory[]>(this.booksCategoriesUrl)
      .pipe(
        tap(_ => this.log('fetched book categories')),
        catchError(this.handleError<BookCategory[]>('getBookCategories', []))
      );
  }

  getBookCategory(id: number): Observable<BookCategory> {
    const url = `${this.booksCategoriesUrl}/${id}`;
    return this.http.get<BookCategory>(url).pipe(
      tap(_ => this.log(`fetched book category ID = ${id}`)),
      catchError(this.handleError<BookCategory>(`getBookCategory ID = ${id}`))
    );
  }

  getBookCategoryByName(name: string): Observable<BookCategory> {
    const url = `${this.booksCategoriesUrl}/?name=${name}`;
    return this.http.get<BookCategory>(url).pipe(
      tap(_ => this.log(`fetched book category name = ${name}`)),
      catchError(this.handleError<BookCategory>(`getBookCategoryByName name=${name}`))
    );
  }

  deleteBookCategory(id: number): Observable<BookCategory> {
    const url = `${this.booksCategoriesUrl}/${id}`;

    return this.http.delete<BookCategory>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted book category ID = ${id}`)),
      catchError(this.handleError<BookCategory>('deleteBookCategory'))
    );
  }

  searchBookCategory(name: string): Observable<BookCategory[]> {
    console.log(name);
    const url = `${this.booksCategoriesUrl}/?name=${name}`;
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<BookCategory[]>(url).pipe(
      tap(x => x.length ?
          this.log(`found book category matching "${name}"`) :
          this.log(`no book categories marching "${name}"`),
        catchError(this.handleError<BookCategory[]>('searchBookCategory'),))
    );
  }

  addBookCategory(bookCategory: BookCategory): Observable<BookCategory> {
    return this.http.post<BookCategory>(this.booksCategoriesUrl, bookCategory, this.httpOptions).pipe(
      tap((newBookCategory: BookCategory) =>
        this.log(`added book category with id = ${newBookCategory.id}, name = ${newBookCategory.name}`)),
      catchError(this.handleError<BookCategory>('addBookCategory'))
  );
  }

  updateBookCategory(bookCategory: BookCategory): Observable<any>{
    const number = bookCategory.id;
    const url = `${this.booksCategoriesUrl}/${number}`;
    return this.http.put(url, bookCategory, this.httpOptions).pipe(
      tap(_ => this.log(`updated book category ID = ${number}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }
}
