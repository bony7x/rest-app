import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registerUrl = 'http://localhost:8080/api/register'
  private loginUrl = 'http://localhost:8080/api/login'
  private logoutUrl = 'http://localhost:8080/api/logout'

  httpOptions = {};

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user, this.httpOptions)
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post(this.loginUrl, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(user.name + ':' + user.password)
      }
    }).pipe(tap((response: any) => {
        this.setToken(response.token)
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): Observable<User>{
    return this.http.post<User>('http://localhost:8080/api/users/current', this.getToken(), this.httpOptions);
  }

  logout(): Observable<any> {
    return this.http.delete<any>(this.logoutUrl, {})
  }

  isLogged(): boolean {
    this.getUserRole()
    return this.getToken() !== null;
  }

  getUserRole(): string | null {
    let token = this.getToken();
    let tokenSplit = token?.split('[');
    if (tokenSplit) {
      let role = tokenSplit[1];
      const roleSubstring = role.substring(0, role.length - 1)
      return atob(roleSubstring);
    }
    return null;
  }

  getUserName(): string | null {
    let token = this.getToken();
    let tokenSplit = token?.split('[');
    if (tokenSplit) {
      let tkn = tokenSplit[0];
      let decoded = atob(tkn);
      let decodedName = decoded.split(':');
      return decodedName[0]
    }
    return null;
  }
}
