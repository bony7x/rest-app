import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastService} from "angular-toastify";

@Injectable()
export class ErrorinterceptorInterceptor implements HttpInterceptor {

  constructor(private _toastService: ToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this._toastService.error(error.error);
        return throwError(error)
      })
    )
  }
}
