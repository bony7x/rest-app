import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, Observable, of, tap} from "rxjs";
import {Borrowing, BorrowingCreate} from "../model/borrowing.model";

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  private borrowingsUrl = 'http://localhost:8080/api/borrowings'

  httpOptions = {};

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string): void {
    this.messageService.add(`CustomerService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getBorrowings(): Observable<Borrowing[]>{
    return this.http.get<Borrowing[]>(this.borrowingsUrl).pipe(
        tap(_=> this.log('fetched borrowings')),
        catchError(this.handleError<Borrowing[]>('getCustomers', []))
    );
  }

  addBorrowing(borrowing: BorrowingCreate): Observable<Borrowing>{
    return this.http.post<Borrowing>(this.borrowingsUrl,borrowing,this.httpOptions);
  }

  getBorrowing(id: number): Observable<Borrowing>{
    const url = `${this.borrowingsUrl}/${id}`;
    return this.http.get<Borrowing>(url,this.httpOptions);
  }

  deleteBorrowing(id: number): Observable<Borrowing>{
    const url =  `${this.borrowingsUrl}/${id}`;
    return this.http.delete<Borrowing>(url,this.httpOptions);
  }

  updateBorrowing(id: number, borrowing: BorrowingCreate): Observable<Borrowing>{
    const url = `${this.borrowingsUrl}/${id}`;
    return this.http.put<Borrowing>(url,borrowing,this.httpOptions);
  }

  searchByBookId(id : number):Observable<Borrowing[]>{
    const url = `${this.borrowingsUrl}/?bookId=${id}`
    return this.http.get<Borrowing[]>(url);
  }

  searchByCustomerId(id: number): Observable<Borrowing[]> {
    const url =`${this.borrowingsUrl}/?customerId=${id}`;
    return this.http.get<Borrowing[]>(url);
  }
}
