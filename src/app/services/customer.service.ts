import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Customer, CustomerCreate} from "../model/customer.model";
import {ExtendedRequestModel} from "../model/extended-request.model";
import {CustomerResponse} from "../responses/CustomerResponse";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersUrl = 'http://localhost:8080/api/customers';

  httpOptions = {};

  constructor(private http: HttpClient,) {
  }

  getCustomers(extendedRequest: ExtendedRequestModel): Observable<CustomerResponse> {
    const url = `${this.customersUrl}/all`
    return this.http.post<CustomerResponse>(url,extendedRequest)
  }

  getCustomersGet(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.customersUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`
    return this.http.get<Customer>(url, this.httpOptions);
  }

  addCustomer(customer: CustomerCreate): Observable<Customer>{
    return this.http.post<Customer>(this.customersUrl,customer,this.httpOptions);
  }

  deleteCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`
    return this.http.delete<Customer>(url, this.httpOptions);
  }

  updateCustomer(customerId: number, customer: CustomerCreate): Observable<any> {
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
}
