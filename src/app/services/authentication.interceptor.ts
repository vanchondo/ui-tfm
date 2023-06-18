import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Constants } from '../app.constants';
import { Observable, throwError } from 'rxjs';
import { catchError, map, skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router : Router, private route: ActivatedRoute) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let _this = this;

    var jwt = localStorage.getItem('id_token');

    if (jwt){
      request = request.clone({
        setHeaders: {
          'Authorization': Constants.BEARER_TOKEN + ' ' + jwt?.toString()
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err && err.status === 401) {
          window.location.href = Constants.SSO_URL + "?origin=" + window.location;
        }
        return throwError(() => err);
      })
    );
  }
}

