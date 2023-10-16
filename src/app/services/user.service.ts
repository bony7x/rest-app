import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UserUpdate} from "../model/user";
import {RegisterCustomer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  httpOptions = {};

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  updateUserRole(user: UserUpdate): Observable<User> {
    return this.http.put<User>(this.url, user, this.httpOptions);
  }

  registerCustomer(registerCustomer: RegisterCustomer): any {
    const url = 'http://localhost:8080/api/registerCustomer';
    return this.http.post<RegisterCustomer>(url,registerCustomer,this.httpOptions);
  }
}
