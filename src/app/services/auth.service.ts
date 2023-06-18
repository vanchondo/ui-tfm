import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { ICurrentUser } from '../login/current-user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  currentUser(): Observable<ICurrentUser> {
    return this.httpClient
      .get<ICurrentUser>(Constants.API_URL + 'currentUser');
  }

  setSession(jwt: string) {
    localStorage.setItem('id_token', jwt);
  }

  removeSession() {
    localStorage.removeItem('id_token');
  }
}
