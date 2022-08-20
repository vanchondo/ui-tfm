import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../app.constants';
import { IRegister } from '../register/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USERS_URL: string = Constants.API_URL + "users/"

  constructor(private httpClient: HttpClient) { }

  register(user: IRegister) : Observable<any> {
    return this.httpClient.post(Constants.API_URL + "register", user);
  }

  checkEmailAvailability(email: string) : Observable<any> {
    return this.httpClient.get(this.USERS_URL + "available?email=" + email);
  }

  checkUsernameAvailability(username: string) : Observable<any> {
    return this.httpClient.get(this.USERS_URL + "available?username=" + username);
  }
}
