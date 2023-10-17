import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UserUpdate} from "../model/user";
import {RegisterCustomer} from "../model/customer.model";
import {ExtendedRequestModel} from "../model/extended-request.model";
import {UserResponse} from "../responses/UserResponse";

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

  getUsersRequest(extendedRequest: ExtendedRequestModel): Observable<UserResponse>{
    return this.http.post<UserResponse>(this.url,extendedRequest);
  }

  updateUserRole(user: UserUpdate): Observable<User> {
    return this.http.put<User>(this.url, user, this.httpOptions);
  }

  registerCustomer(registerCustomer: RegisterCustomer): Observable<{ token: string }> {
    const url = 'http://localhost:8080/api/registerCustomer';
    return this.http.post<{ token: string }>(url,registerCustomer,this.httpOptions);
  }
}
