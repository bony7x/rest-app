import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registerUrl = 'http://localhost:8080/api/register'
  private loginUrl = 'http://localhost:8080/api/login'
  private logoutUrl = 'http://localhost:8080/api/logout'

  httpOptions = {};
  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(this.registerUrl,user,this.httpOptions)
  }

  login(user: User): Observable<User>{
    return this.http.put<User>(this.loginUrl, user, this.httpOptions)
  }

  logout(user: User):Observable<User>{
    return this.http.put<User>(this.logoutUrl, user, this.httpOptions)
  }
}
