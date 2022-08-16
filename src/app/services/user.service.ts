import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { IRegister } from '../register/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  register(user: IRegister) {
    return fetch(Constants.API_URL + "register", {
      method: 'post',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    });
  }
}
