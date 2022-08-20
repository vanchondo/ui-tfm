import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Constants } from '../app.constants';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let _this = this;
    var jwt = localStorage.getItem('id_token');
    request = request.clone({
      setHeaders: {
        'Authorization': Constants.BEARER_TOKEN + ' ' + jwt?.toString()
      }
    });
    return next.handle(request).pipe(
      catchError((requestError : HttpErrorResponse) => {
        if (requestError && requestError.status === 401) {
          _this.router.navigate(['/login']);
          
        }
        return throwError(() => new Error(requestError.message));
      })
    );
  }
}

