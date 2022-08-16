import { Injectable } from '@angular/core';
import { ILogin } from '../login/login';
import { Constants } from '../app.constants';
import * as moment from "moment";
import { ICurrentUser } from '../login/current-user';
import { JsonPipe } from '@angular/common';


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
    }).then(response => response.json());
  }

  currentUser() : Promise<ICurrentUser>{
    var jwt = localStorage.getItem('id_token');
    return fetch(Constants.API_URL + 'currentUser', {
      method: 'get',
      headers: { 'Authorization': Constants.BEARER_TOKEN + ' ' + jwt?.toString() }
    }).then(response => response.json());
  }

  setSession(jwt : string) {
    localStorage.setItem('id_token', jwt);
  }

  removeSession(){
    localStorage.removeItem('id_token');
  }
}
