import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  User,
  UserUpdate,
  UserUpdateAddress,
  UserUpdateEmail,
  UserUpdateNameEmail,
  UserUpdateUsername
} from "../model/user";
import {RegisterCustomer} from "../model/customer.model";
import {ExtendedRequestModel} from "../model/extended-request.model";
import {UserResponse} from "../responses/UserResponse";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  authService: AuthenticationService = new AuthenticationService(this.http)

  httpOptions = {};

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUsersRequest(extendedRequest: ExtendedRequestModel): Observable<UserResponse> {
    const url = `${this.url}/all`
    return this.http.post<UserResponse>(url, extendedRequest);
  }

  updateUserRole(user: UserUpdate): Observable<User> {
    return this.http.put<User>(this.url, user, this.httpOptions);
  }

  registerCustomer(registerCustomer: RegisterCustomer): Observable<{ token: string }> {
    const url = 'http://localhost:8080/api/registerCustomer';
    return this.http.post<{ token: string }>(url, registerCustomer, this.httpOptions);
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

  getUser(id: number): Observable<User[]> {
    const url = `${this.url}/${id}`;
    return this.http.get<User[]>(url);
  }

  updateUser(userId: number, user: UserUpdateNameEmail): Observable<User> {
    const url = `${this.url}/${userId}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }

  updateUserName(user: UserUpdateUsername): Observable<{ token: string }> {
    const url = 'http://localhost:8080/api/users/name';
    user.token = this.authService.getToken();
    return this.http.put<{ token: string }>(url, user, this.httpOptions);
  }

  updateUserEmail(user: UserUpdateEmail): Observable<{ token: string }> {
    const url = 'http://localhost:8080/api/users/email';
    user.token = this.authService.getToken();
    return this.http.put<{ token: string }>(url, user, this.httpOptions);
  }

  updateUserAddress(user: UserUpdateAddress): Observable<{ token: string }> {
    const url = 'http://localhost:8080/api/users/address';
    user.token = this.authService.getToken();
    return this.http.put<{ token: string }>(url, user, this.httpOptions);
  }
}
