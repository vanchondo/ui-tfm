import { Injectable } from '@angular/core';
import { ILogin } from '../login/login';
import { Constants } from '../app.constants';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user: ILogin) {
    return fetch(Constants.API_URL + 'login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  setSession(jwt : string) {
    localStorage.setItem('id_token', jwt);
  }
}
