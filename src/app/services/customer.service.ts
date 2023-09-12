import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, Observable, of, tap} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersUrl = 'http://localhost:8080/api/customers';

  httpOptions = {};

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

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

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl).pipe(
      tap(_ => this.log('fetched customers')),
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`
    return this.http.get<Customer>(url, this.httpOptions);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions);
  }

  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`

    return this.http.delete<Customer>(url, this.httpOptions);
  }

  updateCustomer(customerId: number, customer: Customer): Observable<any> {
    const url = `${this.customersUrl}/${customerId}`;
    return this.http.put(url, customer);
  }

  searchByFirstName(name: string): Observable<Customer[]> {
    const url = `${this.customersUrl}/?firstName=${name}`;
    if (name === '') {
      return of([])
    }
    return this.http.get<Customer[]>(url);
  }

  searchByLastName(name: string): Observable<Customer[]> {
    const url = `${this.customersUrl}/?lastName=${name}`;
    if (name === '') {
      return of([])
    }
    return this.http.get<Customer[]>(url);
  }

  searchByFullName(name: string): Observable<Customer[]> {
    const [first, last] = name.split(' ');
    const url = `${this.customersUrl}/?firstName=${first}&lastName=${last}`
    if (first === '' && last === undefined) {
      return of([])
    }
    if (last === undefined) {
      return this.searchByFirstName(first);
    }
    return this.http.get<Customer[]>(url);
  }

  searchById(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url);
  }
}
