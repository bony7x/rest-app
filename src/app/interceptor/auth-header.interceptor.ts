import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const exclude = 'api/token';
    if(request.url.search(exclude) === -1){
      const token = this.auth.getToken();
      if(token !== null) {
        request = request.clone({
          headers: request.headers.append('Authorization', token)
        });
      }
    }
    return next.handle(request);
  }
}
