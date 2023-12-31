import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Borrowing, BorrowingCreate} from "../model/borrowing.model";
import {ExtendedRequestModel} from "../model/extended-request.model";
import {BorrowingResponse} from "../responses/BorrowingResponse";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  private borrowingsUrl = 'http://localhost:8080/api/borrowings'

  httpOptions = {};

  constructor(private http: HttpClient) {
  }

  getBorrowings(extendedRequest: ExtendedRequestModel): Observable<BorrowingResponse> {
    const url = `${this.borrowingsUrl}/all`;
    return this.http.post<BorrowingResponse>(url, extendedRequest);
  }

  getBorrowingsOfCustomer(customer: Customer): Observable<Borrowing[]> {
    const url = `${this.borrowingsUrl}/customer`;
    console.log("customer" + customer)
    return this.http.post<Borrowing[]>(url, customer, this.httpOptions);
  }

  addBorrowing(borrowing: BorrowingCreate): Observable<Borrowing> {
    return this.http.post<Borrowing>(this.borrowingsUrl, borrowing, this.httpOptions);
  }

  getBorrowing(id: number): Observable<Borrowing[]> {
    const url = `${this.borrowingsUrl}/${id}`;
    return this.http.get<Borrowing[]>(url, this.httpOptions);
  }

  deleteBorrowing(id: number): Observable<Borrowing> {
    const url = `${this.borrowingsUrl}/${id}`;
    return this.http.delete<Borrowing>(url, this.httpOptions);
  }

  updateBorrowing(id: number, borrowing: BorrowingCreate): Observable<Borrowing> {
    const url = `${this.borrowingsUrl}/${id}`;
    return this.http.put<Borrowing>(url, borrowing, this.httpOptions);
  }

  searchByBookId(id: number): Observable<Borrowing[]> {
    const url = `${this.borrowingsUrl}/?bookId=${id}`
    return this.http.get<Borrowing[]>(url);
  }

  searchByCustomerId(id: number): Observable<Borrowing[]> {
    const url = `${this.borrowingsUrl}/?customerId=${id}`;
    return this.http.get<Borrowing[]>(url);
  }

  searchByBorrowingId(id: number): Observable<Borrowing[]> {
    const url = `${this.borrowingsUrl}/${id}`;
    return this.http.get<Borrowing[]>(url);
  }
}
